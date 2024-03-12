import { ProjectItem } from "@/shared_components/blocks/Sheredega/MapContainer/Map/ProjectList/ProjectList";

export const removeDuplicateCoordsData = (array: ProjectItem[]) => {
  const uniqueCoord: any = {};
  const uniqueArray: ProjectItem[] = []; // Результирующий массив без повторов

  // Проход по каждому объекту в исходном массиве
  array.forEach(obj => {
    // Если id этого объекта еще не встречался, добавляем его в результирующий массив
    const key = (obj?.lat ?? 0).toString() + (obj?.lng ?? 0).toString()
    if (!uniqueCoord[key]) {
      uniqueCoord[key] = true; // Отмечаем id как уже встреченный
      uniqueArray.push(obj); // Добавляем объект в результирующий массив
    }
  });

  return uniqueArray; // Возвращаем результирующий массив без повторов id
};