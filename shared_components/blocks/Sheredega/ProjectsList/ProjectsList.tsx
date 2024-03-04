import { ProjectsItem } from "./ProjectsItem/ProjectsItem";
import {  useMemo, useState } from "react";
import { Filters } from "@/shared_components/blocks/Sheredega/ProjectsList/Filters/Filters";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  projects: {
    title: string;
    heroImg?: string;
    type?: string[];
    filename?: string
  }[];
  showFilters?: boolean;
}

export const ProjectsList = ({ projects, showFilters = true }: Props) => {

  // const [projectsToShow, setProjectsToShow] = useState(projects);
  const uniqueTypes = projects
    .map((project) => project.type)
    .flat()
    .filter(Boolean)
    .reduce((uniqueTypes, type) => {
      const lowerCaseType = type.toLowerCase(); // Приводим к нижнему регистру для проверки уникальности
      if (!uniqueTypes.has(lowerCaseType)) {
        uniqueTypes.set(lowerCaseType, type); // Сохраняем в Map приведенное к нижнему регистру значение и оригинальное
      }
      return uniqueTypes;
    }, new Map())
    .values(); // Получаем только оригинальные значения из Map

  const types = Array.from(uniqueTypes); // Преобразуем Map обратно в массив


  const [activeTypes, setActiveTypes] = useState<typeof types>(null);
  // const [lastActiveTypesLength, setLastActiveTypesLength] = useState(0);

  // useEffect(() => {
  //   if (lastActiveTypesLength >= activeTypes?.length) {
  //     console.log("sort");
  //
  //     const newProjects = projectsToShow.map(project => {
  //       const isHide = (project.type ?? []).some(type => (activeTypes ?? []).includes(type));
  //       return { project, isHide };
  //     });
  //
  //     newProjects.sort((a, b) => (a.isHide === b.isHide ? 0 : a.isHide ? 1 : -1));
  //     setProjectsToShow(newProjects.map(item => item.project));
  //
  //   }
  //   setLastActiveTypesLength(activeTypes?.length ?? 0);
  // }, [activeTypes]);

  const filtered = useMemo(() => {
    return projects.filter((project) =>
      !project.type || (project.type ?? [])
        .some(type => !(activeTypes ?? []).length || (activeTypes ?? []).map(item => item.toLowerCase()).includes(type.toLowerCase())));
  }, [projects, activeTypes]);


  return (
    <div>
      {showFilters &&
        (
          <div className="pt-10 pb-15">
            <Filters options={types} value={activeTypes} onChange={setActiveTypes} />
          </div>
        )
      }
      {/*<Grid mobileColumns={2} tabletColumns={3} desktopColumns={4}*/}
      {/*      className="gap-y-10 gap-x-4 lg:gap-y-14 lg:gap-x-8 2xl:grid-cols-6">*/}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-y-10 gap-x-4 lg:gap-y-14 lg:gap-x-8">

        <AnimatePresence>
          {filtered.map((project) => (
            <ProjectsItem key={project.filename} {...project} />
          ))}
        </AnimatePresence>
      </motion.div>
      {/*</Grid>*/}
    </div>
  );
};