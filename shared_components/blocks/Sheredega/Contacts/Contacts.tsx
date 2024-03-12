import { Container } from "@/shared_components/components/Container/container";
import { ContactsProps } from "@/shared_components/blocks/Sheredega/Contacts/props";
import Grid from "@/shared_components/components/Grid/Grid";
import { defaultTextContent } from "@/shared_components/blocks/Sheredega/Contacts/schema";
import cn from "@/global/utils/classnames";
import { useRef } from "react";
import { useAnimations } from "@/global/useAnimations";
import { tinaField } from "tinacms/dist/react";

export const Contacts = ({
                           block,
                           textContent,
                           baseEmail,
                           phone,
                           companyName,
                           secondaryEmail,
                           secondaryEmailTitle,
                           tgLink,
                           tgLinkText,
                           uniquePath,
                           customCss,
                           indent,
                           animation
                         }: ContactsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { animationClass } = useAnimations(
    ref,
    animation?.type,
    animation?.speed,
    animation?.isScroll,
    animation?.showOnce
  );

  const className = cn("text-black text-[18px] sm:text-2xl md:text-[28px] font-normal leading-[120%]", animationClass);

  return (
    <Container indent={indent} uniquePath={uniquePath} customCss={customCss} className={className}>
      <Grid mobileColumns={1} tabletColumns={2} desktopColumns={3} ref={ref}>
        <div className={cn(className, "mb-4 md:mb-0")}>
          {textContent ?? defaultTextContent}
        </div>
        {baseEmail || phone || companyName ?
          <div className=" flex-col justify-start items-start gap-[30px] md:gap-10 inline-flex">
            {baseEmail || phone ? <div className={className}>
                {baseEmail &&
                  <><a href={`mailto:${baseEmail}`}
                       data-tina-field={tinaField(block, "baseEmail")}>{baseEmail} </a><br /></>
                }
                {phone &&
                  <><a href={`tel:${phone.replaceAll(" ", "")}`}
                       data-tina-field={tinaField(block, "phone")}>{phone} </a></>
                }
              </div>
              : null}
            {companyName &&
              <div className={cn(className, "leading-[100%] mb-[30px] md:mb-0")}
                   data-tina-field={tinaField(block, "companyName")}>
                {companyName}
              </div>
            }
          </div> : null}
        {secondaryEmail || tgLink || secondaryEmailTitle ?
          <div className=" flex-col justify-start items-start gap-[30px] md:gap-10 inline-flex">
            {secondaryEmail || secondaryEmailTitle ? <div className={className}>
                {secondaryEmailTitle && <><p  data-tina-field={tinaField(block, "secondaryEmailTitle")}> {secondaryEmailTitle} </p> <br /></>}
                {secondaryEmail &&
                  <><a href={`mailto:${secondaryEmail}`}  data-tina-field={tinaField(block, "secondaryEmail")}>{secondaryEmail} </a><br /></>
                }
              </div>
              : null}
            {tgLink && <a href={tgLink}
                          data-tina-field={tinaField(block, "tgLink")}
                          className={`${cn(className, "leading-[100%]")} inline-flex gap-4 flex-nowrap items-center justify-start`}>{tgLinkText ?? "Блог в телеграм"}
              <img
              className={"h-[18px] md:h-[24px] "} src="/uploads/something-logos/tg.svg" alt="Телеграм" /></a>}
          </div> : null}
      </Grid>
    </Container>
  );
};