import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Home Page!</h1>
        <div className="row">
          <div className="col-6 text-center">
            <Link href="/upload">Upload</Link>
          </div>
          <div className="col-6 text-center">
            <Link href="/search">Search</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
