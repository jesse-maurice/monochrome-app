import './globals.css';

import React from 'react';

import type { Metadata } from 'next';
import {
  DM_Sans,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import High_Tide from 'next/font/local';

import Provider from '@components/Provider';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const high = High_Tide({
  src: '../../public/assets/fonts/HighTide.otf',
  weight: '400',
  variable: '--font-high',
});

const sans = DM_Sans({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  variable: '--font-sans',
});

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Monochrome App',
  description: 'Site and store where you can buy and sell your monochrome art',
};

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${sans.variable} ${high.variable}`}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default RootLayout;