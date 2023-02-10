import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
       <h1>Upload Page!</h1>
      <Link  href="/">Back to home page</Link> <br></br>
      <Link  href="/search">search page</Link>
    </main>
  )
}
