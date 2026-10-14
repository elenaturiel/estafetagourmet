"use client";

import NextLink from "next/link";
import type { ComponentProps } from "react";
import { useLocale } from "@/lib/i18n/client";
import { localePath } from "@/lib/i18n/config";

/** Como next/link, pero las direcciones internas llevan el prefijo del idioma actual. */
export function Link({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale();
  return <NextLink href={typeof href === "string" ? localePath(locale, href) : href} {...props} />;
}
