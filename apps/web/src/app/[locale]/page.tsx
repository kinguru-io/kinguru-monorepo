import React from "react";
import { Button, Input } from "@/lib/uikit";

export default async function Page() {
  return (
    <>
      <Button>Hello</Button>
      <Input type="email" label="Email" />
    </>
  );
}
