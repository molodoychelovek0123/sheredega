import type { Collection } from "tinacms";
import { getBlocksSchema } from "../../global/schemas/blocks";


const Page: Collection = {
  label: "Страницы",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      if (document._sys.filename === "about") {
        return `/about`;
      }
      return undefined;
    }
  },
  fields: [
    {
      type: "string",
      label: "Заголовок",
      name: "title",
      isTitle: true,
      required: true
    },
    getBlocksSchema()
  ]
};

export default Page;
