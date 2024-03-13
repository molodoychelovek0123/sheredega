import React, { useEffect, useRef, useState } from "react";
import { InferGetStaticPropsType } from "next";
import { BlockRenderer } from "../components/blocks-renderer";
import { tinaField, useTina } from "tinacms/dist/react";
import { Layout } from "../components/layout";
import { client } from "../tina/__generated__/client";
import { Page } from "@/tina/__generated__/types";
import { Player } from "@lottiefiles/react-lottie-player";

import dynamic from "next/dynamic";

// ПИЗДА ЭТОТ КОРАБЛЬ ТОНЕТ. БЕЗ ТСИГНОР НИКТО НИКУДА НЕ ПОЕДЕТ
// НАХУЙ ЭТОТ ТАЙПСКРИПТ
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { CountUpProps } from "react-countup";
import { useCookies } from "react-cookie";
import { AboutPersonStatic } from "@/shared_components/blocks/Sheredega/AboutPersonStatic/AboutPersonStatic";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const CountUp: React.FunctionComponent<CountUpProps> = dynamic(() => import("react-countup"), {
  ssr: false
});
export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function(block, i) {
          if (block) {
            return (
              <div key={i} data-tina-field={tinaField(block)} className="w-full">
                <BlockRenderer block={block} customKey={i} />
              </div>
            );
          }
          return null;
        })
        : null}
    </>
  );
};

const Preloader = () => {


  const [startNumber, setStartNumber] = React.useState(0);
  const [number, setNumber] = React.useState(95);
  const [duration, setDuration] = React.useState(12);
  const [hide, setHide] = React.useState(false);
  const ref = useRef<any>(null);


  const close = (time: number) => {
    setTimeout(() => {
      setHide(true);
    }, time);
  };
  if (CountUp) {
    return (
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 transition-all duration-700 ${hide && "opacity-0 pointer-events-none"}`}
        style={{ background: "#ffffff", zIndex: 999 }}>
        <Player
          ref={ref}
          autoplay
          src="/lottie/fp.json"
          className={"preloader"}
          keepLastFrame={true}
          onEvent={event => {
            if (event === "complete") {
              setStartNumber(95);
              setNumber(100);
              setDuration(3);
              close(3000);
            }
          }}
          onStateChange={state => console.log(state)}
          style={{
            width: "47vw",
            position: "absolute",
            right: 0,
            bottom: 0,
            transform: " translate(18%, 15%)"
          }}
        >
        </Player>
        <div
          className="text-black text-4.5xl sm:text-6xl font-medium  leading-[100%] absolute left-[21px] bottom-[31px] md:left-[60px] md:bottom-[60px] z-40">Sheredega
          Consulting...

          <CountUp start={startNumber} end={number} duration={duration} />%
        </div>


      </div>
    );
  }
  return <div className="fixed top-0 left-0 right-0 bottom-0" style={{ background: "#ffffff", zIndex: 999 }}></div>;
};

export default function HomePage(
  props: InferGetStaticPropsType<typeof getStaticProps>
) {
  const { data } = useTina(props);
  const [cookie, setCookie] = useCookies(["isLoaded"]);
  const [isAlreadyLoaded, setIsAlreadyLoaded] = useState(false);
  const [clientLoaded, setClientLoaded] = useState(false);
  useEffect(() => {
    setIsAlreadyLoaded(!!cookie.isLoaded);
    setClientLoaded(true);
    if (!cookie.isLoaded) {
      const tomorrow = new Date();
      // expires tomorrow
      tomorrow.setDate(tomorrow.getDate() + 1);
      setCookie("isLoaded", true, { path: "/", expires: tomorrow });

      setIsAlreadyLoaded(false);
    }
  }, []);


  return (
    <Layout rawData={data} data={data.global}>
      {clientLoaded ?
        <>
          {!isAlreadyLoaded &&
            <Preloader />
          }
        </>
        : <div
          className={`fixed top-0 left-0 right-0 bottom-0 transition-all duration-700 `}
          style={{ background: "#ffffff", zIndex: 944 }}>
        </div>
      }
      <Blocks {...data.page} />
    </Layout>
  );
}

export const getStaticProps = async ({ params }: { params: { filename: string; [key: string]: string } }) => {
  const tinaProps = await client.queries.contentQuery({
    relativePath: `${params.filename}.md`
  });
  const props = {
    ...tinaProps,
    enableVisualEditing: process.env.VERCEL_ENV === "preview"
  };
  return {
    props: JSON.parse(JSON.stringify(props)) as typeof props
  };
};

export const getStaticPaths = async () => {
  const pagesListData = await client.queries.pageConnection();
  return {
    paths: pagesListData.data.pageConnection?.edges?.map((page) => ({
      params: { filename: page?.node?._sys.filename }
    })),
    fallback: false
  };
};
