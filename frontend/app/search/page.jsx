import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Search!</h1>
        <div className="row">
          <div className="col-6 text-center">
            <Link href="/">Back to Home </Link>
          </div>
          <div className="col-6 text-center">
            <Link href="/upload">Upload</Link>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col col-6 offset-md-3">
            <label for="filter" className="form-label">Search:</label>
            <input type="text" name="filter" id="" data-role="tagsinput" className='form-control' />
          </div>
        </div>

        {/* show output */}
      </div>
    </main>
  )
}
