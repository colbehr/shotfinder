import './assets/App.css';
import Navbar from './components/Navbar';
import Search from './pages/Search'
import Upload from './pages/Upload'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Search/>}/>
        <Route path='/Search' element={<Search/>}/>
        <Route path='/Upload' element={<Upload/>}/>
      </Routes>
    </div>
  );
}

export default App;
