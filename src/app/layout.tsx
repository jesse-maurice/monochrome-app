import './globals.css';

import React from 'react';

import type { Metadata } from 'next';
import {
  DM_Sans,
  Plus_Jakarta_Sans,
} from 'next/font/google';
import High_Tide from 'next/font/local';

import SessionProviderWrapper from '../components/SessionProviderWrapper';

export const metadata: Metadata = {
  title: "Monochrome",
  description:
    "Discover and showcase breathtaking monochrome photography. Join a community of black and white photography enthusiasts, upload your images, and explore a curated collection of artistic visuals.",
  icons: {
    icon: "/favicon.png", // Path to your PNG file in the public folder
  },
};


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


const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} ${sans.variable} ${high.variable}`}>
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;