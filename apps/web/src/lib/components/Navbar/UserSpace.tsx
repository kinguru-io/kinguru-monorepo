"use client";

import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarContent,
} from "@nextui-org/react";
import Link from "next/link";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import { useTranslations } from "next-intl";
import { FC } from "react";
import { Button } from "@/lib/uikit";

export const UserSpace: FC<{ user: Session | null }> = ({ user }) => {
  const t = useTranslations();
  const userNavigation = [
    { name: t("navbar.your_profile"), href: "/dashboard" },
    { name: t("navbar.settings"), href: "#" },
    {
      name: t("navbar.sign_out"),
      onClick: signOut,
      href: "#",
      color: "danger",
    },
  ];
  return (
    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        {user ? (
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              size="sm"
              name={user?.user?.name || undefined}
              src={user?.user?.image || undefined}
            />
          </DropdownTrigger>
        ) : (
          <Button onClick={() => signIn()} size={"sm"}>
            {t("navbar.sign_in")}
          </Button>
        )}
        <DropdownMenu
          aria-label="Profile Actions"
          variant="flat"
          items={userNavigation}
        >
          {({ name, ...props }: any) => (
            <DropdownItem as={Link} key={name} {...props}>
              {name}
            </DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
};
