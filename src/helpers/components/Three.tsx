"use client";

import { ReactNode } from "react";

import { r3f } from "@/helpers/global";

interface Props {
  children: ReactNode;
}

export const Three: React.FC<Props> = ({ children }) => (
  <r3f.In>
    {children}
  </r3f.In>
);
