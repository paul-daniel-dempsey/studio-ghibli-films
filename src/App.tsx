import React, { useEffect, useState } from 'react';
import './App.css';
import { filmObj } from './components/film';
import Films from './components/films';
import Header from './components/header';
import axios from 'axios';

function App() {

  const [currentPage] = useState<number>(1);
  const [films, setFilms] = useState<Array<filmObj>>([]);

  useEffect(() => {
    getFilms(currentPage);
  }, [currentPage])

  const getFilms = async (pageNumber: number) => {
    const apiResponse = await axios.get(`https://ghibliapi.herokuapp.com/films?page=${pageNumber}`);
    setFilms(apiResponse.data);
  };

  return (
    <div className="app">
      <Header filmPage={currentPage} />
      <Films films={films} />
      <footer />
  </div>
  );
}

export default App;
