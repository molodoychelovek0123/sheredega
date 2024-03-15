import { Map } from "@/shared_components/blocks/Sheredega/MapContainer/Map/Map";
import { ProjectItem } from "@/shared_components/blocks/Sheredega/MapContainer/Map/ProjectList/ProjectList";
import { useEffect, useState } from "react";
import client from "@/tina/__generated__/client";
import { ProjectsConnectionQuery } from "@/tina/__generated__/types";
import { RegionsNames } from "@/global/constants/regions";


type DataProject = NonNullable<NonNullable<ProjectsConnectionQuery["projectsConnection"]["edges"]>[number]>["node"]
const convertProjectToPoint = (item: DataProject): ProjectItem => ({
  lat: item?.mapSettings?.lat ?? undefined,
  lng: item?.mapSettings?.lng ?? undefined,
  title: item?.title ?? undefined,
  region: item?.mapSettings?.region ? [item?.mapSettings?.region as RegionsNames] : undefined,
  city: item?.mapSettings?.city ?? undefined,
  image: item?.heroImg ? {
    src: item?.heroImg ?? undefined
  } : undefined,
  tooltip: item?.mapSettings?.tooltip ?? undefined,
  link: `/projects/${item?._sys?.filename}` ?? undefined
});

// Осторожно. Весь проект трижды переваренный кал. Никому не советую здесь разбираться
// Где проебали типизацию, там можете даже не искать
// Если что-то развалилось и вы попали сюда, значит вам очень плохо.
// Спасибо за понимание.
export const MapContainer = ({type}: {type?: ""}) => {
  const [hasWorldWide, setHasWorldWide] = useState(false);

  const [worldWide, setWorldWide] = useState(false);


  const [worldWideProjects, setWorldWideProjects] = useState<DataProject[] | null>(null);
  const [russianProjects, setRussianProjects] = useState<DataProject[] | null>(null);

  useEffect(() => {

    client.queries.projectsConnection().then(response => (response.data.projectsConnection.edges ?? [])
      .map(item => item?.node)
      .forEach(item => {
        if (item?.mapSettings?.globalProject) {
          setHasWorldWide(true);
          setWorldWideProjects(prev => [...(prev ?? []), item]);
        } else {
          setRussianProjects(prev => [...(prev ?? []), item]);
        }
      })
    );

    return () => {

      setWorldWideProjects([]);
      setRussianProjects([]);
    };
  }, [client]);

  // const [russianPoints, setRussianPoints] = useState<ProjectItem[] | null>(null);
  // const [wolrdWidePoints, setWorldWidePoints] = useState<ProjectItem[] | null>(null);
  //
  // useEffect(() => {
  //   const convertedRussian: ProjectItem[] = russianProjects?.map(convertProjectToPoint) ?? [];
  //   setRussianPoints(convertedRussian);
  //   const convertedWorldWide: ProjectItem[] = hasWorldWide ? worldWideProjects?.map(convertProjectToPoint) ?? [] : [];
  //   setWorldWidePoints(convertedWorldWide);
  // }, [russianProjects, worldWideProjects]);

  //
  // const pointsRussian: ProjectItem[] = [
  //   {
  //     lat: 60.092086,
  //     lng: 31.844507,
  //     title: "Суховское сельское поселение",
  //     region: ["Leningrad Oblast"],
  //     city: "Санкт-Петербург",
  //     image: {
  //       src: "/uploads/slider-image-0.jpg"
  //     },
  //     tooltip: "Суховское сельское поселение",
  //     link: "https://www.google.com/"
  //   },
  //   {
  //     lat: 59.9386,
  //     lng: 30.3141,
  //     title: "Создание Питера",
  //     region: ["Leningrad Oblast", "Saint Petersburg"],
  //     city: "Санкт-Петербург",
  //     image: {
  //       src: "https://via.placeholder.com/80x80"
  //     },
  //     tooltip: "Санкт-Петербург",
  //     link: "https://www.google.com/"
  //   },
  //   {
  //     lat: 54.6269,
  //     lng: 39.6916,
  //     title: "Рязань",
  //     region: ["Ryazan Oblast"],
  //     city: "Рязань",
  //     image: {
  //       src: "/uploads/slider-image-1.jpg"
  //     },
  //     tooltip: "Рязань",
  //     link: "https://www.google.com/"
  //   }
  // ];
  //
  // const pointsWorldWide: ProjectItem[] = [
  //   {
  //     title: "Суховское сельское поселение",
  //     region: ["Leningrad Oblast"],
  //     city: "Санкт-Петербург",
  //     image: {
  //       src: "/uploads/slider-image-0.jpg"
  //     },
  //     link: "https://www.google.com/"
  //   },
  //   {
  //     title: "Создание Питера",
  //     region: ["Leningrad Oblast", "Saint Petersburg"],
  //     city: "Санкт-Петербург",
  //     image: {
  //       src: "https://via.placeholder.com/80x80"
  //     },
  //     link: "https://www.google.com/"
  //   },
  //   {
  //     title: "Рязань",
  //     region: ["Ryazan Oblast"],
  //     city: "Рязань",
  //     image: {
  //       src: "/uploads/slider-image-1.jpg"
  //     },
  //     link: "https://www.google.com/"
  //   }
  // ];


  return (
    <div id="geography">
      <Map
        points={russianProjects?.map(convertProjectToPoint) ?? []}
        worldWidePoints={hasWorldWide ? worldWideProjects?.map(convertProjectToPoint) ?? [] : []}
        onClickAllProjects={typeof window !== "undefined" ? () => window.open("/projects", "_self") : undefined}
        onClickWorldWide={() => setWorldWide(prevState => !prevState)}
        isWorldWide={worldWide}
      />
    </div>
  );
};