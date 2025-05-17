import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Section1 from './Components/Home/Left';
import Section2 from './Components/Home/Right';
import Main2Section1 from './Components/ListPage/List';
import "./App.css"
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main">
            <div>
              <Section1 />
            </div>
            <div className='section2'>
              <Section2 />
            </div>
          </div>
        }
      />
      <Route path="/GoToFavoriteList/:id" element={<Main2Section1 />} />
    </Routes>
  );
}

export default App;
