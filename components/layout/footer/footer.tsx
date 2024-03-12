import React from "react";
import { Container } from "../../../shared_components/components/Container/container";

export const Footer = () => {


  return (
    <footer className="bg-[#111111] text-white text-wrap-balance">
      <Container uniquePath={"desktop-footer"} className="relative pt-[68px] pb-[29px] hidden md:block">
        <div className="grid grid-cols-10  relative pb-[60px] border-b-[#2c2c2c] border-b border-solid">
          <div className="col-start-1 col-end-5 flex-col justify-start items-start gap-[42px] inline-flex">
            <div>
              <a className="block text-white text-3xl lg:text-[40px] font-medium lowercase leading-[44px]"
                 href={"mailto:hello@sheredega.ru"}>hello@sheredega.ru
              </a>
              <a className="block text-white text-3xl lg:text-[40px] font-medium lowercase leading-[44px]"
                 href={"tel:+79258880220"}> +7
                925
                888 02 20</a>
            </div>
            <div className="text-white text-xl font-normal  leading-normal text-wrap-balance">ООО «Шередега Консалтинг»,
              г. Москва
            </div>
          </div>
          <div className="col-start-5 col-end-7 flex-col justify-start items-start gap-5 inline-flex">
            <a href={"/"} className="text-white text-xl font-normal leading-normal">Главная</a>
            <a href={"/projects"} className="text-white text-xl font-normal leading-normal">Проекты</a>
            <a href={"/about"} className="text-white text-xl font-normal leading-normal">О
              бюро</a>
            <a href={"/contacts"} className="text-white text-xl font-normal leading-normal">Контакты</a>
          </div>
          <div className="col-start-7 col-end-9 flex-col justify-start items-start gap-5 inline-flex">
            <a href={"/about#partners"} className="text-white text-xl font-normal leading-normal">Партнеры</a>
            <a href={"/about#rewards"} className="text-white text-xl font-normal leading-normal">Награды</a>
            <a href={"/contacts#geography"} className="text-white text-xl font-normal leading-normal">География
              проектов</a>
            {/*<a href={"/about#partners"}  className="text-white text-xl font-normal leading-normal">Блог в телеграм</a>*/}
            <img src={"/assets/logo-white.png"} alt={"Шередега ко"} className="absolute right-0 top-0" />
          </div>
        </div>
        <div className="w-full h-4 justify-between items-start inline-flex pt-[26px]">
          <div className="opacity-30 text-white text-lg font-normal leading-none">Политика конфиденциальности</div>
          <div className="opacity-30 text-right text-white text-lg font-normal leading-none">Создано в ИСКРЕ,
            иллюстрации: Анна Леонова
          </div>
          <div className="opacity-30 text-white text-lg font-normal leading-none">© 2019 – 2024</div>
        </div>
      </Container>
      <Container uniquePath={"mobile-footer"} className={"block md:hidden"}>

        <div
          className="w-full  px-[15px] py-[23px] bg-neutral-900 border-t border-black border-opacity-20 justify-start items-start gap-2.5 inline-flex">
          <div className="flex-col w-full justify-start items-start gap-[30px] inline-flex">
            <div className="flex-col w-full justify-start items-start gap-[55px] flex">
              <div className="justify-start items-start gap-[69px] inline-flex relative w-full">
                <div className="text-white text-[26px] font-medium lowercase leading-7">hello@sheredega.ru<br />+7 925
                  888 02 20
                </div>
                <img src={"/assets/logo-white.png"} alt={"Шередега ко"}
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
