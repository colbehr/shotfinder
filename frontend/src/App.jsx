import './assets/App.css';
import Navbar from './components/Navbar';
import FilterPanel from './components/FilterPanel';
import Search from './pages/Search'
import Upload from './pages/Upload'
import Frame from './pages/Frame'
import { Route, Routes } from 'react-router-dom'
// searchbar text passed to search element

function App() {
  return (
    <div className="App">
      <Navbar/>
      <FilterPanel/>
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
