import { useState } from 'react'
import Movies from './Components/Movies/Movies';
import Description from './Components/Description/Description';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  const [movieId, setMovieid] = useState();
  const showMovie=(id) =>{
    setMovieid(id)
    console.log(id)
  }

  return (
    <>
      
      <Router>
        <Routes>
          <Route path='/' element={<Movies movieId={showMovie}></Movies>}></Route>
          <Route path='/description' element={<Description movieId={movieId}></Description>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;