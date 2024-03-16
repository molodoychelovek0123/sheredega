import React from "react";
import { Container } from "../../../shared_components/components/Container/container";

export const Footer = () => {


  return (
    <footer className="bg-[#111111] text-white text-wrap-balance mt-[100px] sm:mt-[120px]">
      <Container uniquePath={"desktop-footer"} className="relative pt-[68px] pb-[49px] hidden md:block">
        <div
          className="grid grid-cols-10  gap-x-5 gap-y-10  relative pb-[60px] border-b-[#2c2c2c] border-b border-solid">
          <div className="col-start-1 col-end-5 flex-col justify-start items-start gap-[42px] inline-flex">
            <div>
              <a
                className="block text-white text-[28px] lg:text-[40px] font-medium lowercase leading-[44px] hover:opacity-100  hover-underline-animation"
                href={"mailto:hello@sheredega.ru"}>hello@sheredega.ru
              </a>
              <a
                className="block text-white text-[28px] lg:text-[40px] font-medium lowercase leading-[44px]  hover:opacity-100  hover-underline-animation"
                href={"tel:+79258880220"}> +7
                925
                888 02 20</a>
            </div>
            <div className="text-white text-xl font-normal  leading-normal text-wrap-balance">ООО «Шередега Консалтинг»,
              г. Москва
            </div>
          </div>
          <div className="col-start-5 col-end-7 flex-col justify-start items-start gap-5 inline-flex">
            <a href={"/"} className="text-white text-xl font-normal leading-normal  hover:opacity-40">Главная</a>
            <a href={"/projects"} className="text-white text-xl font-normal leading-normal hover:opacity-40">Проекты</a>
            <a href={"/about"} className="text-white text-xl font-normal leading-normal hover:opacity-40">О
              бюро</a>
            <a href={"/contacts"}
               className="text-white text-xl font-normal leading-normal hover:opacity-40">Контакты</a>
          </div>
          <div className="col-start-7 col-end-9 flex-col justify-start items-start gap-5 inline-flex">
            <a href={"/about#partners"}
               className="text-white text-xl font-normal leading-normal hover:opacity-40">Партнеры</a>
            <a href={"/about#rewards"}
               className="text-white text-xl font-normal leading-normal hover:opacity-40">Награды</a>
            <a href={"/contacts#geography"} className="text-white text-xl font-normal leading-normal hover:opacity-40">География
              проектов</a>

            <a href={"https://t.me/SheredegaConsulting"}
               className="text-white text-xl font-normal leading-normal inline-flex gap-4 flex-nowrap items-center justify-start  hover:opacity-40">
              <span>Блог в телеграм</span>
              <img className={"h-[18px] md:h-[24px] "} src="/assets/tg-white.svg"
                   alt="Телеграм" />
            </a>

            {/*<a href={"/about#partners"}  className="text-white text-xl font-normal leading-normal">Блог в телеграм</a>*/}
            <img src={"/assets/logo-white.svg"} alt={"Шередега ко"} className="absolute right-0 top-0" />
          </div>
        </div>
        <div className="w-full h-4 justify-between items-start grid grid-cols-10 pt-[26px]  gap-x-5 gap-y-10">
          <a className="opacity-30 text-white text-lg font-normal leading-none col-start-1 col-end-5"
             href="/privacy-policy"> <span className="hover:opacity-40 transition-all duration-500"> Политика конфиденциальности </span></a>
          <div
            className="opacity-30 text-left text-white text-lg font-normal leading-none col-start-5 col-end-9">Создано
            в <a href="https://iskra.studio/">ИСКРЕ</a>,
            иллюстрации: Анна Леонова
          </div>
          <div className="opacity-30 text-white text-lg font-normal leading-none col-start-9 col-end-11 text-right">©
            2019 – 2024
          </div>
        </div>
      </Container>
      <Container uniquePath={"mobile-footer"} className={"block md:hidden"}>

        <div
          className="w-full  px-[15px] py-[23px] bg-neutral-900 border-t border-black border-opacity-20 justify-start items-start gap-2.5 inline-flex">
          <div className="flex-col w-full justify-start items-start gap-[30px] inline-flex">
            <div className="flex-col w-full justify-start items-start gap-[55px] flex">
              <div className="justify-start items-start gap-[69px] inline-flex relative w-full">
                <div className="text-white text-[26px] font-medium lowercase leading-7">
                  <a href={"mailto:hello@sheredega.ru"}>hello@sheredega.ru</a><br />
                  <a href={"tel:+79258880220"}>+7 925 888 02 20</a>
                </div>
                <img src={"/assets/logo-white.svg"} alt={"Шередега ко"}
                     className="absolute right-0 top-0 w-[47px] h-[68px] " />
              </div>
              <div className="justify-start items-start gap-[68px] inline-flex">
                <div className="flex-col justify-start items-start gap-5 inline-flex">
                  <a href={"/"} className="text-white text-lg font-normal leading-snug">Главная</a>
                  <a href={"/projects"} className="text-white text-lg font-normal leading-snug">Проекты</a>
                  <a href={"/about"} className="text-white text-lg font-normal leading-snug">О бюро</a>
                  <a href={"/contacts"} className="text-white text-lg font-normal leading-snug">Контакты</a>
                </div>
                <div className="flex-col justify-start items-start gap-5 inline-flex">
                  <a href={"/about#partners"} className="text-white text-lg font-normal leading-snug">Партнеры</a>
                  <a href={"/about#rewards"} className="text-white text-lg font-normal leading-snug">Награды</a>
                  <a href={"/contacts#geography"} className="text-white text-lg font-normal leading-snug">География
                    проектов</a>
                </div>
              </div>
              <div className="text-white text-base font-normal leading-tight">ООО «Шередега Консалтинг», г. Москва</div>
            </div>
            <div className="flex-col justify-start items-start gap-[17px] flex w-full">
              <div className="h-[0px] w-full opacity-20 border border-white"></div>
              <div className="opacity-20 text-white text-base font-normal leading-tight">Политика конфиденциальности
              </div>
              <div className="opacity-20 text-white text-base font-normal leading-tight">Создано в ИСКРЕ<br />Иллюстрации:
                Анна Леонова
              </div>
              <div className="opacity-20"><span className="text-white text-base font-light  leading-tight">©</span><span
                className="text-white text-base font-normal leading-tight"> 2019 – 2024</span></div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};
