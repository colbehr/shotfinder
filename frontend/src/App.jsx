// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/App.css';
import Search from './pages/Search'
import Upload from './pages/Upload'
import Frame from './pages/Frame'
import { Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/search/:id' element={<Frame/>}/>
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </div>
  );
}

export default App;
