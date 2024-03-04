import { Map } from "@/shared_components/blocks/Sheredega/MapContainer/Map/Map";
import { ProjectItem } from "@/shared_components/blocks/Sheredega/MapContainer/Map/ProjectList/ProjectList";
import { useState } from "react";

export const MapContainer = () => {
  const [worldWide, setWorldWide] = useState(false);

  const pointsRussian: ProjectItem[] = [
    {
      lat: 60.092086,
      lng: 31.844507,
      title: "Суховское сельское поселение",
      region: ["Leningrad Oblast"],
      city: "Санкт-Петербург",
      image: {
        src: "/uploads/slider-image-0.jpg"
      },
      tooltip: "Суховское сельское поселение",
      link: "https://www.google.com/"
    },
    {
      lat: 59.9386,
      lng: 30.3141,
      title: "Создание Питера",
      region: ["Leningrad Oblast", "Saint Petersburg"],
      city: "Санкт-Петербург",
      image: {
        src: "https://via.placeholder.com/80x80"
      },
      tooltip: "Санкт-Петербург",
      link: "https://www.google.com/"
    },
    {
      lat: 54.6269,
      lng: 39.6916,
      title: "Рязань",
      region: ["Ryazan Oblast"],
      city: "Рязань",
      image: {
        src: "/uploads/slider-image-1.jpg"
      },
      tooltip: "Рязань",
      link: "https://www.google.com/"
    }
  ];

  const pointsWorldWide: ProjectItem[] = [
    {
      title: "Суховское сельское поселение",
      region: ["Leningrad Oblast"],
      city: "Санкт-Петербург",
      image: {
        src: "/uploads/slider-image-0.jpg"
      },
      link: "https://www.google.com/"
    },
    {
      title: "Создание Питера",
      region: ["Leningrad Oblast", "Saint Petersburg"],
      city: "Санкт-Петербург",
      image: {
        src: "https://via.placeholder.com/80x80"
      },
      link: "https://www.google.com/"
    },
    {
      title: "Рязань",
      region: ["Ryazan Oblast"],
      city: "Рязань",
      image: {
        src: "/uploads/slider-image-1.jpg"
      },
      link: "https://www.google.com/"
    }
  ];
  return (
    <Map
      points={pointsRussian}
      worldWidePoints={pointsWorldWide}
      onClickAllProjects={() => console.log("onClickAllProjects")}
      onClickWorldWide={() => setWorldWide(prevState => !prevState)}
      isWorldWide={worldWide}
    />
  );
};