import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../../shared_components/components/Container/container";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";
import { useScrollDirection } from "@/global/hooks/useScrollDirection";
import AnimateHeight from "react-animate-height";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const [menuHeight, setMenuHeight] = React.useState(0);
  const router = useRouter();
  const currentPath = router.asPath;
  const pathWoAnchors = currentPath.split("#")[0];

  const { scrollDirection } = useScrollDirection();


  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  const onMenuLinkClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    const { href } = e.currentTarget;

    e.preventDefault();
    setMenuHeight(0);
    router.push(href);
    if (href.includes("#") && (href.indexOf("#") === 0 || href.indexOf("#") === 1) && typeof document !== "undefined") {
      const id = href.split("#")[1];
      const element = document.getElementById(id);
      if (element) {
        console.log(element);
        element.scrollIntoView();
      }
    } else {
      window.open(href, "_self");
    }
  };

  return (
    <>
      <AnimateHeight height={`${menuHeight}%`} className={"w-full h-full fixed top-0 left-0 bg-white z-50"}
                     disableDisplayNone={true}>
        <Container uniquePath={"header-menu"}
                   className={" pb-6 pt-[30px] sm:pt-10 sm:pb-10 h-[100vh] relative max-w-full"}>
          <div className={"relative"}>
            <div
              className="text-black text-xl sm:text-[22px] font-medium sm:font-normal  leading-[90%] cursor-pointer absolute top-0 right-0"
              onClick={() => setMenuHeight(0)}
            >
              закрыть
            </div>

            <div className=" pt-[59px] sm:pt-[49px]">
              <div className="grid grid-cols-1 md:grid-cols-6 ">
                {data.menu && data.menu.map((item, index) => (
                  <React.Fragment key={JSON.stringify(item ?? { data: index })}>
                    <div
                      className={`col-start-1 md:col-end-5 border-t-black border-t border-solid pb-4 opacity-15 ${index > 0}  mt-[30px] md:mt-10`}></div>
                    <div className="col-start-1 md:col-end-2 pb-[30px] md:pb-10">
                      {item?.href && item?.title ? <a href={item?.href}
                                                      className="text-black text-2xl md:text-3xl lg:text-[32px] font-medium leading-[110%]"

                                                      data-tina-field={tinaField(item)}>{item?.title}</a> : null}
                    </div>
                    <div className="md:col-start-4 md:col-end-6 flex flex-col gap-4">
                      {item?.items && item?.items.map((link, linkIndex) => (
                        <React.Fragment
                          key={JSON.stringify(link ?? { data: linkIndex })}
                        >
                          {link?.href && link?.label ?
                            <Link
                              data-tina-field={tinaField(link)}
                              href={link?.href.replaceAll(pathWoAnchors, "")}
                              className="text-black text-lg font-normal leading-[105%] md:text-xl inline-flex gap-4 flex-nowrap items-center justify-start"
                              onClick={onMenuLinkClick}>{link?.label}
                              {link?.label.toLowerCase().includes("телеграм") &&
                                <img className={"h-[18px] md:h-[24px] "} src="/uploads/something-logos/tg.svg"
                                     alt="Телеграм" />}
                            </Link>
                            : null}
                        </React.Fragment>
                      ))}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <div
            className={"absolute bottom-0 right-0 max-w-[50vw] sm:max-w-[42.153vw] w-full h-full pt-[89px] pointer-events-none"}>
            <div className={"relative w-full h-full menu-fingerprint"}>
              <img src={"/assets/menu-bg.svg"} alt="fingerprint"
                   className={"h-full w-full object-contain object-right-bottom"} />
            </div>
          </div>
        </Container>
      </AnimateHeight>


      <div
        className={`overflow-hidden sticky z-40 bg-white ${scrollDirection === "down" ? "-top-24" : "top-0"} transition-all duration-300`}
      >
        <Container uniquePath={"header"}>
          <div className=" py-6 justify-between items-center w-full inline-flex relative">
            <div className="justify-start items-center gap-2.5 xs:gap-[14px] flex">
              {data.logo && <img src={data.logo} alt="logo" className="h-[53px]" />}
              <div
                className="text-black text-base sm:text-xl max-w-[150px] xs:max-w-full font-medium sm:font-normal  leading-[90%]">{data.name}</div>
            </div>
            <div className="h-5 justify-center items-center gap-11 a-y-centered w-full h-full hidden lg:inline-flex">
              {data.nav &&
                data.nav.map((item, i) => {
                  if (!item) return null;
                  const activeItem =
                    (item.href === ""
                      ? router.asPath === "/"
                      : router.asPath.includes(item.href ?? "")) && isClient;
                  return (
                    <a data-tina-field={tinaField(item)} href={item?.href ?? "/"}
                       className="text-black text-[22px] font-normal font-['Grato Grotesk DEMO'] leading-tight">{item.label}</a>
                  );
                })}
            </div>
            <div
              className="text-black text-xl sm:text-[22px] font-medium sm:font-normal  leading-[90%] cursor-pointer"
              onClick={() => setMenuHeight(100)}
            >меню
            </div>


          </div>
        </Container>
      </div>
    </>
  );
};
