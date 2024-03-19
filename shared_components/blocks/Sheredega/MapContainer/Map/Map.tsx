import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mapboxgl from "!mapbox-gl";

import React, { useRef, useEffect, useMemo, useState } from "react";
import
  ProjectList, {
  ProjectItem
} from "@/shared_components/blocks/Sheredega/MapContainer/Map/ProjectList/ProjectList";
import { v4 } from "uuid";
import { MAP_INLINE_STYLES } from "@/shared_components/blocks/Sheredega/MapContainer/Map/constants";
import { removeDuplicateCoordsData } from "@/shared_components/blocks/Sheredega/MapContainer/Map/utils";

import { useDebouncedCallback } from "use-debounce";

mapboxgl.accessToken = "pk.eyJ1IjoiYm94ZGV2ZWxvcGVyIiwiYSI6ImNsdDJhNDh5NzFtMjYycnBwbjlmeDhna3oifQ.SmuF-JFGwF0o1BKCSCdeHA";

type CameraBound = {
  _sw: { lng: number, lat: number },
  _ne: { lng: number, lat: number }
}


const filterPointsByBounds = (points: ProjectItem[], bounds: CameraBound) => {
    return points.filter(point =>
      (point?.lat ?? 9999) >= bounds._sw.lat &&
      (point?.lat ?? 9999) <= bounds._ne.lat &&
      (point?.lng ?? 9999) >= bounds._sw.lng &&
      (point?.lng ?? 9999) <= bounds._ne.lng
    );
  }
;
const isSsr = () => (typeof window === "undefined" || typeof document === "undefined");

type Props = {
  onClickAllProjects?: () => void;
  onClickWorldWide?: () => void;
  isWorldWide?: boolean
  points?: ProjectItem[] | null;
  worldWidePoints?: ProjectItem[] | null;
}
export const Map = ({
                      onClickAllProjects,
                      onClickWorldWide,
                      isWorldWide = false,
                      points: russianPoints,
                      worldWidePoints
                    }: Props) => {

  const memedRussianPoints = useMemo(() => (russianPoints ?? []), [russianPoints]);
  const memedWorldWidePoints = useMemo(() => (worldWidePoints ?? []), [worldWidePoints]);
  const [tooltipFilter, setTooltipFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [projectListOpen, setProjectListOpen] = useState(false);
  const [cameraBound, setCameraBound] = useState<CameraBound | null>(null);
  const toggleProjectListOpen = () => setProjectListOpen(prevState => !prevState);

  const russianPointsWoDup = removeDuplicateCoordsData((memedRussianPoints ?? []).filter(item => item.lng && item.lat && item.tooltip && item.region));


  const updateCameraBound = useDebouncedCallback(
    (bounds: CameraBound) => {
      setCameraBound(bounds);
    },
    700
  );

  const updateProjectListOpen = useDebouncedCallback(
    (isOpen: boolean) => {
      setProjectListOpen(isOpen);
    },
    1500
  );

  const geoJsonData = useMemo(() => ({
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": russianPointsWoDup.map(item => ({
      "type": "Feature",
      "properties": { "id": v4(), "title": item.tooltip },
      "geometry": { "type": "Point", "coordinates": [item.lng, item.lat] }
    }))
  }), [russianPointsWoDup]);

  const projectListFiltered = useMemo(() => {
    // console.log([tooltipFilter, regionFilter, cameraBound]);

    setTimeout(() => {
      if (tooltipFilter || regionFilter) setProjectListOpen(true);
    }, 400);
    if (tooltipFilter) {
      const tooltipResult = (memedRussianPoints ?? []).filter(item => item.tooltip?.toLowerCase().includes(tooltipFilter.toLowerCase()));
      if (tooltipResult.length > 0) {
        return tooltipResult;
      }
    }
    if (regionFilter && regionFilter.length > 0) {
      const regionResult = (memedRussianPoints ?? []).filter(item => {
        return item.region && (item.region ?? []).some(region =>
          region.toLowerCase().includes(regionFilter.toLowerCase())
        );
      });
      return regionResult;
    }
    // if (cameraBound) {
    //   return filterPointsByBounds(memedRussianPoints ?? [], cameraBound);
    // }
    return memedRussianPoints;
  }, [tooltipFilter, regionFilter]);


  const mapContainer = useRef(null);
  const map = useRef<any>(null);


  useEffect(() => {
    if (isSsr()) {
      return;
    }

    const layerExists = (str: string) => {
      if (map.current) {

        try {
          return map.current?.getLayer(str);
        } catch (e) {
          console.warn(e);
        }
      }
      return false;
    };
    const removeLayer = (str: string) => {
      if (map.current) {
        try {
          if (layerExists(str)) {
            map.current?.removeLayer(str);
          }
        } catch (e) {
          // nothing
          console.warn(e);
        }

      }
    };


    const width = isSsr() ? 1920 : window.innerWidth;
    const lng = width < 900 ? 38 : 94;
    const lat = width < 900 ? 55 : 58;
    const zoom = 3.1;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/boxdeveloper/cltrrmb7x00f001pjgqc35ls6",
      center: [lng, lat],
      zoom: zoom,
      // minZoom: 3.65,
      minZoom: 2.0,
      projection: "mercator"
    });


    map.current?.on("load", function() {

      map.current?.addSource("states", {
        "type": "vector",
        // "url": "mapbox://boxdeveloper.cbgbnbqx" Полный датасет

        "url": "mapbox://boxdeveloper.0ci7vxx0"
      });

      map.current?.addSource("points", {
        type: "geojson",
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });


      map.current?.loadImage(
        "http://localhost:3000/uploads/point.png",
        (error: any, image: any) => {
          console.log(error, image);
          if (error) throw error;
          map.current?.addImage("cat", image);
        }
      );

      const updatePointsLayer = () => {
        try {
          removeLayer("clusters");
          removeLayer("cluster-count");
          removeLayer("unclustered-point");
        } catch (e) {
          // nothing
        }

        // console.log("updatePointsLayer");
        if (!layerExists("clusters")) {
          map.current?.addLayer({
            id: "clusters",
            type: "circle",
            source: "points",
            filter: ["has", "point_count"],
            paint: {

              "circle-color": [
                "step",
                ["get", "point_count"],
                "#000000",
                100,
                "#000000",
                750,
                "#000000"
              ],
              "circle-radius": [
                "step",
                ["get", "point_count"],
                20,
                100,
                30,
                750,
                40
              ]
            }
          });
        }
        if (!layerExists("cluster-count")) {

          map.current?.addLayer({
            id: "cluster-count",
            type: "symbol",
            source: "points",
            filter: ["has", "point_count"],
            layout: {
              "text-field": ["get", "point_count_abbreviated"],
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 14
            },
            paint: {

              "text-color": "#ffffff"
            }
          });
        }


        if (!layerExists("unclustered-point")) {

          map.current?.addLayer({
            id: "unclustered-point",
            type: "symbol",
            source: "points",
            filter: ["!", ["has", "point_count"]],
            layout: {
              "icon-image": "point", // reference the image
              "icon-size": 1
              // "symbol-z-order": "viewport-y"
            }
          });
        }
      };

      let mutexClick = false;

      let activeMainLayerId: number | null = null;
      const updateMainLayer = (active: number | null) => {
        try {
          removeLayer("fill-states");
          removeLayer("state-borders");
        } catch (e) {
          // nothing
        }
        // console.log(active);
        if (active === activeMainLayerId) {
          activeMainLayerId = null;
          active = null;
        }
        activeMainLayerId = active;
        if (!layerExists("fill-states")) {
          map.current?.addLayer({
            "id": "fill-states",
            "type": "fill",
            "source": "states",
            "source-layer": "sheredega-15032024-6u6gb2",
            "layout": {},
            "paint": {
              // "fill-outline-color": "#ffffff",
              "fill-color": [
                "case",
                ["==", ["get", "id"], active],
                "#F6F7FA",
                "#ffffff"
              ],
              "fill-opacity": 1
            }
          });
        }

        if (!layerExists("state-borders")) {
          map.current?.addLayer({
            "id": "state-borders",
            "type": "line",
            "source": "states",
            "source-layer": "sheredega-15032024-6u6gb2",
            "layout": {},
            "paint": {
              "line-emissive-strength": 2,
              "line-color": [
                "case",
                ["==", ["get", "id"], active],
                "#000000",
                "#cdcdcd"
              ],
              "line-width": [
                "case",
                ["==", ["get", "id"], active],
                2,
                1
              ]
            }
          });
        }

        updatePointsLayer();
      };

      updateMainLayer(null);


      const getPolygonCenter = (coordinates: number[][]) => {
        let sumLat = 0;
        let sumLon = 0;

        coordinates.forEach(coord => {
          sumLon += coord[0]; // долгота
          sumLat += coord[1]; // широта
        });

        const avgLon = sumLon / coordinates.length;
        const avgLat = sumLat / coordinates.length;

        return [avgLon, avgLat];
      };

      map.current?.on("click", "fill-states", function(eventInitial: any) {
        const e = { ...eventInitial };
        setTimeout(() => {

          if (mutexClick) {
            console.log("no click on fill-states");
            return;
          }

          // const lat = Math.round((e?.lngLat?.lat ?? 0) * 100) / 100;
          // const lng = Math.round((e?.lngLat?.lng ?? 0) * 100) / 100;
          // const region = (memedRussianPoints ?? []).find(item =>
          //   item?.lat && item?.lng
          //   && Math.abs(Math.round((item?.lat ?? 0) * 100) / 100 - lat) < 0.9
          //   && Math.abs(Math.round((item?.lng ?? 0) * 100) / 100 - lng) < 0.9
          // )?.region?.[0];
          // if (region) {
          //   // Значит кликнули на unclustered-point
          //   setRegionFilter(null);
          //   updateMainLayer(null);
          //   return;
          // }
          mutexClick = true;
          // const coords = e.features[0].geometry.coordinates[0].length > 1 ? e.features[0].geometry.coordinates[0] : e.features[0].geometry.coordinates[0][0];

          const newRegionFilterValue = e.features[0].properties?.en_name ?? null;
          // setTooltipFilter(null);

          let mainLayerId = e.features[0].properties.id;

          setRegionFilter(prevState => {
            if (prevState === newRegionFilterValue) {
              mainLayerId = null;
              return null;
            } else {
              return newRegionFilterValue;
            }
          });
          updateMainLayer(mainLayerId);

          setTimeout(() => {
            try {
              // map.current?.easeTo({
              //   center: getPolygonCenter(coords)
              // });
              setTooltipFilter(null);
              setProjectListOpen(true);
            } catch (e) {
              // nothing
            }

          }, 100);

          setTimeout(() => {
            mutexClick = false;
          }, 300);

        }, 50);
      });


      map.current?.on("click", "clusters", (e: any) => {
        const features = map.current?.queryRenderedFeatures(e.point, {
          layers: ["clusters"]
        });
        const clusterId = features[0].properties.cluster_id;
        map.current?.getSource("points").getClusterExpansionZoom(
          clusterId,
          (err: any, zoom: any) => {
            if (err) return;

            map.current?.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom
            });
          }
        );
      });

      const showTooltip = (e: any) => {

        const coordinates = e.features[0].geometry.coordinates.slice();
        const title = e.features[0].properties.title;

        if (typeof document !== "undefined" && document)
          (document?.querySelectorAll(".mapboxgl-popup-anchor-bottom") ?? []).forEach(item => {
            item.remove();
          });

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML(
            `${title}`
          )
          .addTo(map.current);
      };
      // map.current.on("zoom", "unclustered-point", (e) => {
      //   showTooltip(e);
      // });
      map.current?.on("mouseover", "unclustered-point", (e: any) => {
        showTooltip(e);
      });
      map.current?.on("click", "unclustered-point", (e: any) => {
        // if (mutexClick) {
        //   console.log("no click on unclustered-point");
        //   return;
        // }
        e.preventDefault();
        // console.log("unclustered-point");
        // const coords = e.features[0].geometry.coordinates.length > 1 ? e.features[0].geometry.coordinates : e.features[0].geometry.coordinates[0];
        // // console.log(coords);
        // const lat = Math.round(coords[1] * 100) / 100;
        // const lng = Math.round(coords[0] * 100) / 100;
        // const region = (projectListFiltered ?? []).find(item => Math.round(
        //   (item?.lat ?? 0) * 100) / 100 - lat < 0.1 && Math.round((item?.lng ?? 0) * 100) / 100 - lng < 0.1
        // )?.region?.[0];
        // tooltipActiveRegion = region;
        mutexClick = true;
        const title = e.features[0].properties.title;


        updateMainLayer(null);

        const kostyulSetActivePoint = () => {

          updateMainLayer(null);
          setTooltipFilter(title);
          setProjectListOpen(true);
        };

        setTimeout(() => {
          kostyulSetActivePoint();
        }, 20);
        setTimeout(() => {
          kostyulSetActivePoint();
        }, 25);
        setTimeout(() => {
          kostyulSetActivePoint();
        }, 30);
        setTimeout(() => {
          kostyulSetActivePoint();
        }, 50);
        setTimeout(() => {
          kostyulSetActivePoint();
        }, 100);
        setTimeout(() => {
          mutexClick = false;
        }, 300);
      });


      // CAMERABOUND
      map.current?.on("zoom", () => {
        setTooltipFilter(null);
        // setProjectListOpen(false);
        // updateProjectListOpen(false);
        // updateCameraBound(map.current?.getBounds());
      });
      map.current?.on("move", () => {
        setTooltipFilter(null);
        // updateProjectListOpen(false);
        // setProjectListOpen(false);
        // updateCameraBound(map.current?.getBounds());
      });

      map.current?.addControl(new mapboxgl.NavigationControl(), "top-right");
      map.current?.scrollZoom.disable();


    });
    return () => {
      // console.log("unmount");
      map?.current?.remove();
      map.current = undefined;
    };
  }, [memedRussianPoints, memedWorldWidePoints]);

  const mapGoTo = (center: number[]) => {
    if (center[0] !== 0 && center[1] !== 0) {
      map.current?.easeTo({
        center: center
      });
      updateProjectListOpen(true);
      // setProjectListOpen(true);
    }
  };

  const openCenter = () => {
    const width = isSsr() ? 1920 : window.innerWidth;
    const lng = width < 900 ? 38 : 94;
    const lat = width < 900 ? 55 : 66;
    const zoom = 3.1;
    map.current?.easeTo({
      center: [lng, lat],
      zoom,
      curve: 1,
      bearing: 0,
      pitch: 0
    });
    setProjectListOpen(false);
    updateProjectListOpen(false);
  };


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MAP_INLINE_STYLES }} />

      <div className="relative bg-[#f6f7fa]">
        {!isWorldWide &&
          <>
            <div className="absolute md:hidden items-center left-4 bottom-24 gap-4 z-10 cursor-pointer"
                 onClick={openCenter}>
              <img src="/assets/mobile-map-center.svg"
                   alt="кнопка - международные - мобилка"
                   className="" />
            </div>
            <div className="hidden md:flex absolute items-center right-15 bottom-24 gap-4 z-10 cursor-pointer"
                 onClick={openCenter}>
              <img src="/assets/map-center.svg"
                   alt="кнопка - международные - мобилка"
                   className="" />
            </div>
          </>
        }
        {(memedWorldWidePoints ?? []).length > 0 &&
          <div className="absolute md:hidden items-center left-4 bottom-10 gap-4 z-10 cursor-pointer"
               onClick={onClickWorldWide}>
            <img src={isWorldWide ? "/assets/russia-mobile-button.svg" : "/assets/worldwide-button.svg"}
                 alt="кнопка - международные - мобилка"
                 className="" />
          </div>}

        {(memedWorldWidePoints ?? []).length > 0 &&
          <div className="absolute hidden items-center md:flex left-15 bottom-10 gap-4 z-10 cursor-pointer"
               onClick={onClickWorldWide}>
            <img src="/assets/eye.svg"
                 alt="кнопка - международные"
                 className="" />
            <span className="text-black text-[28px] font-medium leading-7 relative -top-[4px]">
            {isWorldWide ? "Россия" : "международные"}
          </span>
          </div>
        }
        <div className="absolute hidden items-center md:flex right-15 bottom-10 gap-4 z-10 cursor-pointer"
             onClick={onClickAllProjects}>

          <span className="text-black text-[28px] font-medium leading-7 relative -top-[4px]">
            все проекты
          </span>
          <img src="/assets/arrow-bottom-right.svg"
               alt="кнопка - все проекты"
               className="" />
        </div>
        {/* ${isWorldWide ? "max-w-full lg:w-full-30 max-h-full" : "max-w-[610px] max-h-[50vh] max-h-[50dvh] " */}
        <div
          // ref={projectListRef}
          className={`map-project-list absolute top-10 left-4 right-4 md:left-15 md:right-15 z-10 w-full-4 transition-all duration-500 bottom-[90px] h-fit  lg:max-h-none 
        max-w-[610px] max-h-[50vh] max-h-[50dvh] 
        `}>
          <ProjectList isOpen={projectListOpen || isWorldWide} toggleOpen={toggleProjectListOpen}
                       setOpen={setProjectListOpen}
                       projects={isWorldWide ? (memedWorldWidePoints ?? []) : (projectListFiltered ?? [])}
                       mapGoTo={mapGoTo}
          />
        </div>


        <div ref={mapContainer}
             className={`map-container min-h-screen min-h-[90dvh] transition-opacity duration-500 ${isWorldWide && "opacity-0 pointer-events-none"}`} />
      </div>
    </>

  );
};

