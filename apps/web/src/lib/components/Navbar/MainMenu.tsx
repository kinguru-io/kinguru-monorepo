"use client";

import { Link, NavbarContent, NavbarItem } from "@nextui-org/react";
import NextLink from "next/link";
import { useTranslations } from "next-intl";
import { FC } from "react";

export const MainMenu: FC = () => {
  const t = useTranslations();
  const navigation = [
    { name: t("navbar.events"), href: "/events" },
    { name: t("navbar.speakers"), href: "/speakers" },
    { name: t("navbar.places"), href: "/places" },
  ];
  return (
    <NavbarContent className="hidden gap-10 sm:flex" justify="center">
      {navigation.map(({ name, href }) => (
        <NavbarItem key={name}>
          <Link as={NextLink} color="foreground" href={href}>
            {name}
          </Link>
        </NavbarItem>
      ))}
    </NavbarContent>
  );
};
