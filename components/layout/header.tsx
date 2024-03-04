import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "../../shared_components/components/Container/container";
import { Icon } from "../../shared_components/components/Icon/icon";
import { tinaField } from "tinacms/dist/react";
import { GlobalHeader } from "../../tina/__generated__/types";

export const Header = ({ data }: { data: GlobalHeader }) => {
  const router = useRouter();

  const headerColor = {
    default:
      "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
    primary: {
      blue: "text-white from-blue-300 to-blue-500",
      teal: "text-white from-teal-400 to-teal-500",
      green: "text-white from-green-400 to-green-500",
      red: "text-white from-red-400 to-red-500",
      pink: "text-white from-pink-400 to-pink-500",
      purple: "text-white from-purple-400 to-purple-500",
      orange: "text-white from-orange-400 to-orange-500",
      yellow: "text-white from-yellow-400 to-yellow-500"
    }
  };

  const headerColorCss = headerColor.default;

  const [isClient, setIsClient] = React.useState(false);
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-b ${headerColorCss}`}
    >
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(data, "icon")}
                parentColor={data.color}
                data={{
                  name: data.icon.name,
                  color: data.icon.color,
                  style: data.icon.style
                }}
              />
              <span data-tina-field={tinaField(data, "name")}>{data.name}</span>
            </Link>
          </h4>
          <ul className="flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
            {data.nav &&
              data.nav.map((item, i) => {
                const activeItem =
                  (item.href === ""
                    ? router.asPath === "/"
                    : router.asPath.includes(item.href)) && isClient;
                return (
                  <li
                    key={`${item.label}-${i}`}
                    className={`${
                      activeItem ? " border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700" : ""
                    }`}
                  >
                    <Link
                      data-tina-field={tinaField(item, "label")}
                      href={`/${item.href}`}
                      className={`relative select-none	text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4 ${
                        activeItem ? `` : `opacity-70`
                      }`}
                    >
                      {item.label}
                      {activeItem && (
                        <svg
                          className={`absolute bottom-0 left-1/2 w-[180%] h-full -translate-x-1/2 -z-1 opacity-10 dark:opacity-15 text-blue-500`}
                          preserveAspectRatio="none"
                          viewBox="0 0 230 230"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="230"
                            y="230"
                            width="230"
                            height="230"
                            transform="rotate(-180 230 230)"
                            fill="url(#paint0_radial_1_33)"
                          />
                          <defs>
                            <radialGradient
                              id="paint0_radial_1_33"
                              cx="0"
                              cy="0"
                              r="1"
                              gradientUnits="userSpaceOnUse"
                              gradientTransform="translate(345 230) rotate(90) scale(230 115)"
                            >
                              <stop stopColor="currentColor" />
                              <stop
                                offset="1"
                                stopColor="currentColor"
                                stopOpacity="0"
                              />
                            </radialGradient>
                          </defs>
                        </svg>
                      )}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </div>
        <div
          className={`absolute h-1 bg-gradient-to-r from-transparent ${
            data.color === "primary" ? `via-white` : `via-black dark:via-white`
          } to-transparent bottom-0 left-4 right-4 -z-1 opacity-5`}
        />
      </Container>
    </div>
  );
};
