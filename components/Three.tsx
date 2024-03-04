'use client';

import { r3f } from './global.ts';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}


export const Three: React.FC<Props> = ({ children }) => {
  return <r3f.In>{children}</r3f.In>;
};
