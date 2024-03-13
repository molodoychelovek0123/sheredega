export const AboutPersonStatic = () => {
  return (
    <>
      <div
        className="w-full bg-[#F6F7FA] flex-col justify-center items-start gap-2.5 flex-wrap-reverse lg:flex-nowrap overflow-hidden hidden sm:inline-flex">
        <div className="justify-center items-center gap-5 inline-flex flex-wrap-reverse mx-auto">
          <img className="w-[754px]" src="/assets/yuri-and-evgenia.png" alt={"Юрий Шередега"} />
          <div className="flex-col justify-start items-start gap-[60px] inline-flex">
            <div className="flex-col justify-start items-start gap-[30px] flex">
              <div className="w-[646px]"><span
                className="text-black text-[28px] font-medium   leading-[30.80px]">«Наша миссия </span><span
                className="text-black text-[28px] font-normal   leading-[30.80px]">- продюсировать позитивные городские изменения в синергии с бизнесом, жителями и администрацией»</span>
              </div>
              <div className="flex-col justify-start items-start gap-1.5 flex">
                <div className="text-black  text-lg md:text-xl lg:text-2xl font-medium  leading-snug lg:leading-loose
             ">
                  Юрий Шередега
                </div>
                <div
                  className="opacity-40 text-black text-base md:text-lg font-normal  leading-tight lg:leading-snug">
                  Руководитель бюро
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-[30px] flex">
              <div
                className="w-[646px] text-black text-[28px] font-normal   leading-[30.80px]">«Мы
                помогаем заказчику определиться с целеполаганием и задачами развития»
              </div>
              <div className="flex-col justify-start items-start gap-1.5 flex">
                <div className="text-black  text-lg md:text-xl lg:text-2xl font-medium  leading-snug lg:leading-loose
             ">
                  Евгения Шередега
                </div>
                <div
                  className="opacity-40 text-black text-base md:text-lg font-normal  leading-tight lg:leading-snug">
                  Руководитель бюро
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full  pt-10 bg-[#F6F7FA] justify-start items-start gap-2.5 inline-flex sm:hidden">
        <div className="grow shrink basis-0 self-stretch flex-col justify-start items-center gap-[15px] inline-flex">
          <div className="self-stretch px-[33.50px] flex-col justify-start items-start gap-[30px] flex">
            <div className="flex-col justify-start items-start gap-5 flex">
              <div className="w-full"><span
                className="text-black text-base font-normal  leading-tight">«</span><span
                className="text-black text-base font-medium  leading-tight">Наша миссия</span><span
                className="text-black text-base font-normal  leading-tight"> - продюсировать позитивные городские изменения в синергии с бизнесом, жителями и администрацией»</span>
              </div>
              <div className="flex-col justify-start items-start gap-[5px] flex">
                <div
                  className="w-full text-black text-base font-medium  leading-tight">Юрий
                  Шередега
                </div>
                <div
                  className="opacity-40 text-black text-[15px] font-normal  leading-[18px]">Руководитель
                  бюро
                </div>
              </div>
            </div>
            <div className="flex-col justify-start items-start gap-5 flex">
              <div className="w-full text-black text-base font-normal  leading-tight">«Мы
                помогаем заказчику определиться с целеполаганием и задачами развития»
              </div>
              <div className="flex-col justify-start items-start gap-[5px] flex">
                <div
                  className="w-full text-black text-base font-medium  leading-tight">Евгения
                  Шередега
                </div>
                <div
                  className="opacity-40 text-black text-[15px] font-normal  leading-[18px]">Руководитель
                  бюро
                </div>
              </div>
            </div>
          </div>
          <img className="w-full " src="/assets/yuri-and-evgenia.png" alt={"Юрий Шередега"} />
        </div>
      </div>
    </>
  );
};