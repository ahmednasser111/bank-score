import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body className="bg-background text-foreground transition-colors duration-200">
        {children}
      </body>
    </html>
  )
}
