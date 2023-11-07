"use client";

import { extendVariants, Button as NextUIButton } from "@nextui-org/react";

export const Button = extendVariants(NextUIButton, {
  variants: {
    primary: {
      true: "bg-primary",
    },
    isCapitalized: {
      true: "font-bold uppercase tracking-wider",
    },
    size: {
      xs: "px-unit-3 min-w-unit-12 h-unit-8 text-tiny font-black gap-unit-1 rounded-full",
      sm: "px-unit-4 min-w-unit-14 h-unit-10 text-small tracking-wide gap-unit-1 rounded-full",
      md: "px-unit-6 min-w-unit-20 h-unit-12 text-small tracking-wide font-bolder gap-unit-2 rounded-full",
      xl: "px-unit-10 min-w-unit-28 h-unit-14 text-large gap-unit-4 rounded-full",
    },
  },
  defaultVariants: {
    primary: true,
    isCapitalized: true,
    disableRipple: "true",
    size: "md",
  },
  compoundVariants: [
    {
      class: "data-[focus-visible=true]:outline-transparent",
    },
  ],
});
