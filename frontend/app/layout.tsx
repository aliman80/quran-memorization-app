import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Quran Memorization Tool',
    description: 'Memorize the Quran with spaced repetition and audio guidance',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" dir="ltr">
            <body className={inter.className}>{children}</body>
        </html>
    )
}
