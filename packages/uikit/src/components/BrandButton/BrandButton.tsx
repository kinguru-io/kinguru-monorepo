import { Button, ButtonProps } from "@kuma-ui/core";
import React, { FC } from "react";

export const BrandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return <Button {...props}>{children}</Button>;
};
