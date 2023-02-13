import Image from 'next/image'
import { Inter } from '@next/font/google'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })

export default function Upload() {


  
  return (
    <main>
      <div className="container">
        <h1>Upload!</h1>
        <div className="row">
          <div className="col-6 text-center">
            <Link href="/">Back to Home</Link>
          </div>
          <div className="col-6 text-center">
            <Link href="/search">Search</Link>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-6 offset-md-3">
            <form action="http://localhost:3001/frames" method="post"> 
              <label class="form-label">Frame Name*</label>
              <input type="text" class="form-control" required name='name' id='name'></input>

              <label class="form-label">Movie Name*</label>
              <input type="text" class="form-control" required name='filmName' id='filmName'></input>

              <label class="form-label">Frame URL*</label>
              <input type="text" class="form-control" required name='frameURL' id='frameURL'></input>

              <button type="submit" class="btn btn-primary mt-3">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
