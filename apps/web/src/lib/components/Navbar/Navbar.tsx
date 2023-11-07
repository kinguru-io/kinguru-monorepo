import { Navbar as NextUINavbar, NavbarBrand } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { auth } from "@/auth";
import { MainMenu, ToggleMenu, UserSpace } from "@/lib/components/Navbar";
import logoHeader from "~/images/logo_header.png";

export const Navbar: FC = async () => {
  const user = await auth();
  return (
    <NextUINavbar>
      <ToggleMenu />
      <NavbarBrand>
        <Link href={"/"}>
          <Image src={logoHeader} alt={"KINGURU"} height={42} priority={true} />
        </Link>
      </NavbarBrand>
      <MainMenu />
      <UserSpace user={user} />
    </NextUINavbar>
  );
};
