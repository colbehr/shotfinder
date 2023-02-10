import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <h1>Home Page!</h1>
      <Link  href="/upload">upload page</Link> <br></br>
      <Link  href="/search">search page</Link>
    </main>
  )
}
