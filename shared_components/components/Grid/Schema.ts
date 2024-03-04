import { ObjectField } from "@tinacms/schema-tools";


const mobileColumnsOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" }
];
const tabletColumnsOptions = [
  ...mobileColumnsOptions,

  { label: "3", value: "3" },
  { label: "4", value: "4" },

  { label: "5", value: "5" },
  { label: "6", value: "6" }
];

const desktopColumnsOptions = [
  ...tabletColumnsOptions,
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
  { label: "11", value: "11" },
  { label: "12", value: "12" }
];
export const gridSchema: ObjectField = {
  type: "object",
  label: "Настройка грида",
  name: "grid",
  fields: [
    {
      type: "string",
      label: "Количество колонок на телефоне",
      name: "mobileColumns",
      options: mobileColumnsOptions
    },
    {
      type: "string",
      label: "Количество колонок на планшете",
      name: "tabletColumns",
      options: tabletColumnsOptions
    },
    {
      type: "string",
      label: "Количество колонок на десктопе",
      name: "desktopColumns",
      options: desktopColumnsOptions
    }
  ]
};

export const gridSchemaDefaultValues = {
  mobileColumns: "2",
  tabletColumns: "6",
  desktopColumns: "6"
};

export const gridSchemaThreeCols = {
  mobileColumns: "1",
  tabletColumns: "3",
  desktopColumns: "3"
};
