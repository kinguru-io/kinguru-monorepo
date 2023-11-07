"use client";

import { extendVariants, Input as NextUIInput } from "@nextui-org/react";

export const Input = extendVariants(NextUIInput, {
  variants: {
    isCapitalized: {
      true: {
        label:
          "font-bold uppercase tracking-wider group-data-[filled-within=true]:font-bold group-data-[filled-within=true]:text-xs",
      },
    },
  },
  defaultVariants: {
    isCapitalized: true,
    className: "group-data-[focus-visible=true]:outline-transparent",
  },
});
