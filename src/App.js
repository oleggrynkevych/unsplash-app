
import './App.scss';
import { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { animateScroll as scroll } from 'react-scroll';
import { Route, Routes} from 'react-router-dom';
import MainPage from './pages/MainPage';
import ImagePage from './pages/ImagePage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';



function App() {
  const accessKey = process.env.REACT_APP_UNSPLASH_API_KEY;

  //We Need Page Order For Both Page Components

  const [page, setPage] = useState(1);

  const unsplash = createApi({
    accessKey: accessKey
  });

  useEffect(() => {
    scroll.scrollToTop();
  }, []);

  return (
    <div className="App">
      <Header/>

      <Routes>
        <Route path='/' element={
          <MainPage 
            unsplash={unsplash}
            page={page} 
            setPage={setPage}
          />}
        />

        <Route path='/:id' element={
          <ImagePage 
            unsplash={unsplash}
            setPage={setPage}
          />}
        />
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
