// import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/App.css';
import Search from './pages/Search'
import Upload from './pages/Upload'
import Frame from './pages/Frame'
import Login from './pages/Login'
import Test from './pages/Test'
import Landing from './pages/Landing';
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/search/:id' element={<Frame/>}/>
        <Route path='/upload' element={<Upload/>}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </div>
  );
}

export default App;
