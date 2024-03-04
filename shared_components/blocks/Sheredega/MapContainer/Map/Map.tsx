import "mapbox-gl/dist/mapbox-gl.css";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import mapboxgl from "!mapbox-gl";

import { useClickAway } from "@uidotdev/usehooks";
import React, { useRef, useEffect, useMemo, useState } from "react";
import
  ProjectList, {
  ProjectItem
} from "@/shared_components/blocks/Sheredega/MapContainer/Map/ProjectList/ProjectList";
import { v4 } from "uuid";
import { MAP_INLINE_STYLES } from "@/shared_components/blocks/Sheredega/MapContainer/Map/constants";

mapboxgl.accessToken = "pk.eyJ1IjoiYm94ZGV2ZWxvcGVyIiwiYSI6ImNsdDJhNDh5NzFtMjYycnBwbjlmeDhna3oifQ.SmuF-JFGwF0o1BKCSCdeHA";

type CameraBound = {
  _sw: { lng: number, lat: number },
  _ne: { lng: number, lat: number }
}

const removeDuplicateCoordsData = (array: ProjectItem[]) => {
  const uniqueCoord = {};
  const uniqueArray: ProjectItem[] = []; // Результирующий массив без повторов

  // Проход по каждому объекту в исходном массиве
  array.forEach(obj => {
    // Если id этого объекта еще не встречался, добавляем его в результирующий массив
    if (!uniqueCoord[obj.lat + obj.lng]) {
      uniqueCoord[obj.lat + obj.lng] = true; // Отмечаем id как уже встреченный
      uniqueArray.push(obj); // Добавляем объект в результирующий массив
    }
  });

  return uniqueArray; // Возвращаем результирующий массив без повторов id
};


const filterPointsByBounds = (points: ProjectItem[], bounds: CameraBound) => {
    return points.filter(point =>
      point.lat >= bounds._sw.lat &&
      point.lat <= bounds._ne.lat &&
      point.lng >= bounds._sw.lng &&
      point.lng <= bounds._ne.lng
    );
  }
;
const isSsr = () => (typeof window === "undefined" || typeof document === "undefined");

type Props = {
  onClickAllProjects?: () => void;
  onClickWorldWide?: () => void;
  isWorldWide?: boolean
  points?: ProjectItem[];
  worldWidePoints?: ProjectItem[];
}
export const Map = ({
                      onClickAllProjects,
                      onClickWorldWide,
                      isWorldWide,
                      points: projectsFromProps,
                      worldWidePoints: worldWideProjects
                    }: Props) => {
  const [tooltipFilter, setTooltipFilter] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [projectListOpen, setProjectListOpen] = useState(false);
  const [cameraBound, setCameraBound] = useState<CameraBound | null>(null);
  const toggleProjectListOpen = () => setProjectListOpen(prevState => !prevState);


  const points = removeDuplicateCoordsData((projectsFromProps ?? []).filter(item => item.lng && item.lat && item.tooltip && item.region));


  const geoJsonData = useMemo(() => ({
    "type": "FeatureCollection",
    "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
    "features": points.map(item => ({
      "type": "Feature",
      "properties": { "id": v4(), "title": item.tooltip },
      "geometry": { "type": "Point", "coordinates": [item.lng, item.lat] }
    }))
  }), [points]);

  const projectListFiltered = useMemo(() => {
    if (tooltipFilter) {
      const tooltipResult = projectsFromProps.filter(item => item.tooltip?.toLowerCase().includes(tooltipFilter.toLowerCase()));
      if (tooltipResult.length > 0) {
        return tooltipResult;
      }
    }
    if (regionFilter && regionFilter.length > 0) {
      const regionResult = projectsFromProps.filter(item => {
        return item.region && (item.region ?? []).some(region =>
          region.toLowerCase().includes(regionFilter.toLowerCase())
        );
      });
      if (regionResult.length > 0) {
        return regionResult;
      }
    }
    if (cameraBound) {
      return filterPointsByBounds(projectsFromProps, cameraBound);
    }
    return projectsFromProps;
  }, [tooltipFilter, regionFilter, cameraBound]);

  const projectListRef = useClickAway<HTMLDivElement>(() => {
    setProjectListOpen(false);
  });

  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (isSsr()) {
      return;
    }

    const width = isSsr() ? 1920 : window.innerWidth;
    const lng = width < 900 ? 38 : 94;
    const lat = width < 900 ? 55 : 66;
    const zoom = 3.8;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/boxdeveloper/clt2cx6x9007m01ra433404f1",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 3.65,
      projection: "globe"
    });


    map.current.on("load", function() {
      map.current.addSource("states", {
        "type": "vector",
        "url": "mapbox://boxdeveloper.cbgbnbqx"
      });

      map.current.addSource("points", {
        type: "geojson",
        data: geoJsonData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50
      });


      map.current.loadImage(
        "/uploads/point.png",
        (error, image) => {
          if (error) throw error;
          map.current.addImage("cat", image);
        }
      );

      const updatePointsLayer = () => {
        try {
          map.current.removeLayer("clusters");
          map.current.removeLayer("cluster-count");
          map.current.removeLayer("unclustered-point");
        } catch (e) {
          // nothing
        }

        map.current.addLayer({
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

        map.current.addLayer({
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


        map.current.addLayer({
          id: "unclustered-point",
          type: "symbol",
          source: "points",
          filter: ["!", ["has", "point_count"]],
          layout: {
            "icon-image": "cat", // reference the image
            "icon-size": 1
            // "symbol-z-order": "viewport-y"
          }
        });
      };

      let activeMainLayerId = null;
      const updateMainLayer = (active: number | null) => {
        try {
          map.current.removeLayer("fill-states");
          map.current.removeLayer("state-borders");
        } catch (e) {
          // nothing
        }
        if (active === activeMainLayerId) {
          activeMainLayerId = null;
          active = null;
        }
        activeMainLayerId = active;
        map.current.addLayer({
          "id": "fill-states",
          "type": "fill",
          "source": "states",
          "source-layer": "russia_geojson_wgs84_new_2-2bvzgs",
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

        map.current.addLayer({
          "id": "state-borders",
          "type": "line",
          "source": "states",
          "source-layer": "russia_geojson_wgs84_new_2-2bvzgs",
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

      map.current.on("click", "fill-states", function(e) {

        const coords = e.features[0].geometry.coordinates[0].length > 1 ? e.features[0].geometry.coordinates[0] : e.features[0].geometry.coordinates[0][0];

        const newRegionFilterValue = e.features[0].properties?.en_name ?? null;
        setTooltipFilter(null);
        setRegionFilter(prevState => prevState === newRegionFilterValue ? null : newRegionFilterValue);


        updateMainLayer(e.features[0].properties.id);

        setTimeout(() => {
          try {
            map.current.easeTo({
              center: getPolygonCenter(coords)
            });
            setProjectListOpen(true);
          } catch (e) {
            // nothing
          }

        }, 600);
      });


      map.current.on("click", "clusters", (e) => {
        const features = map.current.queryRenderedFeatures(e.point, {
          layers: ["clusters"]
        });
        const clusterId = features[0].properties.cluster_id;
        map.current.getSource("points").getClusterExpansionZoom(
          clusterId,
          (err, zoom) => {
            if (err) return;

            map.current.easeTo({
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
      map.current.on("mouseover", "unclustered-point", (e) => {
        showTooltip(e);
      });
      map.current.on("click", "unclustered-point", (e) => {
        const title = e.features[0].properties.title;
        setTooltipFilter(title);
        setTimeout(() => {
          try {
            setTooltipFilter(title);
            setProjectListOpen(true);
          } catch (e) {
            // nothing
          }
        }, 1500);
      });

      map.current.on("zoom", () => {
        setTooltipFilter(null);
        setCameraBound(map.current.getBounds());
      });
      map.current.on("move", () => {
        setTooltipFilter(null);
        setCameraBound(map.current.getBounds());
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");


    });
    return () => {
      console.log("unmount");
      map?.current?.remove();
      map.current = undefined;
    };
  }, []);

  const mapGoTo = (center: number[]) => {
    if(center[0] !== 0 && center[1] !== 0) {
      map.current?.easeTo({
        center: center
      });
    }
  };


  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MAP_INLINE_STYLES }} />

      <div className="relative bg-[#f6f7fa]">

        {(worldWideProjects ?? []).length > 0 &&
          <div className="absolute md:hidden items-center left-4 bottom-10 gap-4 z-10 cursor-pointer"
               onClick={onClickWorldWide}>
            <img src="/assets/worldwide-button.svg"
                 alt="кнопка - международные - мобилка"
                 className="" />
          </div>}

        {(worldWideProjects ?? []).length > 0 &&
          <div className="absolute hidden items-center md:flex left-15 bottom-10 gap-4 z-10 cursor-pointer"
               onClick={onClickWorldWide}>
            <img src="/assets/eye.svg"
                 alt="кнопка - международные"
                 className="" />
            <span className="text-black text-3xl font-medium leading-7 relative -top-[4px]">
            {isWorldWide ? "россия" : "международные"}
          </span>
          </div>
        }
        <div className="absolute hidden items-center md:flex right-15 bottom-10 gap-4 z-10 cursor-pointer"
             onClick={onClickAllProjects}>

          <span className="text-black text-3xl font-medium leading-7 relative -top-[4px]">
            все проекты
          </span>
          <img src="/assets/arrow-bottom-right.svg"
               alt="кнопка - все проекты"
               className="" />
        </div>
        <div ref={projectListRef} className={`absolute top-10 left-4 right-4 md:left-15 md:right-15 z-10 w-full-4 transition-all duration-500 bottom-[90px] h-fit  lg:max-h-none 
        ${isWorldWide ? "max-w-full lg:w-full-30 max-h-full" : "max-w-[610px] max-h-[50vh] max-h-[50dvh]"}
        `}>
          <ProjectList isOpen={projectListOpen || isWorldWide} toggleOpen={toggleProjectListOpen}
                       setOpen={setProjectListOpen}
                       projects={isWorldWide ? worldWideProjects : projectListFiltered}
                       mapGoTo={mapGoTo}
          />
        </div>


        <div ref={mapContainer}
             className={`map-container min-h-screen min-h-[90dvh] transition-opacity duration-500 ${isWorldWide && "opacity-0 pointer-events-none"}`} />
      </div>
    </>

  );
};

