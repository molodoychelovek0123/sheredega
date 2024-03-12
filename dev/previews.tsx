import React from "react";
import {  Previews } from "@react-buddy/ide-toolbox-next";
import { ExampleLoaderComponent, PaletteTree } from "./palette";

const ComponentPreviews = () => {
  return (
    <Previews palette={<PaletteTree />}>
      <ExampleLoaderComponent />
    </Previews>
  );
};

export default ComponentPreviews;