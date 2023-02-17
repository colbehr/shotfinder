import React from 'react'
import { useParams} from 'react-router-dom';
import SearchNavbar from '../components/SearchNavbar';

export default function Frame() {

  const params = useParams();
  return (<>
  <SearchNavbar/>
  <div>Frame {params.id}</div>
  
  
  </>
  )
}
