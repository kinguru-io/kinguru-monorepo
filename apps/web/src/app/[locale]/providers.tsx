"use client";

import { NextUIProvider } from "@nextui-org/react";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export async function Providers({
  children,
  params: { locale, messages },
}: {
  children: ReactNode;
  params: {
    locale: string;
    messages: any;
  };
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <NextUIProvider>{children}</NextUIProvider>
    </NextIntlClientProvider>
  );
}
