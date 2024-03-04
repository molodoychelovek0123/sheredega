if (typeof document !== "undefined" && document.querySelector(".scroll-driven-animation")) {
  console.log(document.querySelector(".scroll-driven-animation"));
  document.querySelector(".scroll-driven-animation").animate(
    { transform: ["translateY(0)", "translateY(100px)"] },
    {
      fill: "both",
      timeline: new ScrollTimeline({
        source: document.documentElement
      }),
      rangeStart: new CSSUnitValue(0, "px"),
      rangeEnd: new CSSUnitValue(200, "px")
    });
}
