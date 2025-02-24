import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import "./globals.css";
import { ThemeProvider } from "next-themes"

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial']
})

export const metadata: Metadata = {
  title: "Justin Silbiger | Software Engineer",
  description: "Justin Silbiger is a software engineer specializing in web development and full-stack applications.",
  keywords: ['Justin Silbiger', 'Software Engineer', 'Web Developer', 'Full Stack Developer', 'React', 'Node.js', 'Python'],
  authors: [{ name: 'Justin Silbiger' }],
  creator: 'Justin Silbiger',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.justinsilbiger.com',
    siteName: 'Justin Silbiger',
    title: 'Justin Silbiger | Software Engineer',
    description: 'Justin Silbiger is a software engineer specializing in web development and full-stack applications.',
    images: [
      {
        url: 'https://www.justinsilbiger.com/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'Justin Silbiger',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Justin Silbiger | Software Engineer',
    description: 'Justin Silbiger is a software engineer specializing in web development and full-stack applications.',
    images: ['https://www.justinsilbiger.com/opengraph-image.png'],
    creator: '@justinsilbiger',
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, new URL('/favicon.ico', 'https://www.justinsilbiger.com')],
    apple: [{ url: '/apple-icon.png' }, { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👨🏻‍💻</text></svg>" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        <link rel="preconnect" href="https://formspree.io" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
