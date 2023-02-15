import React from 'react'
import { useParams} from 'react-router-dom';

export default function Frame() {

  const params = useParams();
  return (<>
  <div>Frame {params.id}</div>
  
  
  </>
  )
}
