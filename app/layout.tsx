import type { Metadata } from 'next'
import '../styles/globals.css' // Use the correct global CSS path

export const metadata: Metadata = {
  title: 'BankScore',
  description: 'BankScore - Your Banking Information and Credit Score',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
