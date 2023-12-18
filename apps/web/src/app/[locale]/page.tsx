import { BrandButton } from "@kinguru/uikit";
import "@kinguru/uikit/lib/kuma.css";
import { Box } from "@kuma-ui/core";
import React from "react";

export default async function Page() {
  return (
    <Box p={8} bg="blue" color="white">
      <BrandButton>HEHE</BrandButton>
    </Box>
  );
}
