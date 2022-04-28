import React, { useEffect, useState } from 'react';
import './App.css';
import { filmObj } from './components/film';
import Films from './components/films';
import Header from './components/header';
import axios, { AxiosError, AxiosResponse } from 'axios';

function App() {

  const [currentPage] = useState<number>(1);
  const [films, setFilms] = useState<Array<filmObj>>([]);

  useEffect(() => {
    getFilms(currentPage);
  }, [currentPage])

  const getFilms = async (pageNumber: number) => {

      //await axios.get(`https://ghibliapi.herokuapp.com/err500?page=${pageNumber}`)
      //await axios.get(`https://ghibliapi.herokuapp.com/err418?page=${pageNumber}`)
      await axios.get(`https://ghibliapi.herokuapp.com/films?page=${pageNumber}`)
      .then((apiResponse: AxiosResponse) => {
        setFilms(apiResponse.data);
      })
      .catch((reason: AxiosError) => {
        if(reason.response !== undefined) {
          // Will not display this message only Error 404 via 'npm start'
          // 'npm test' -> HTML contains correct error code, associated App.test.tsx passes
          // 'npm start' -> 'Fail to load resource' 404 when reading 'reason.response.status/statusTest'?
          console.log(`${reason.response.status} : ${reason.response.statusText}`);
          setFilms([{_id:1, title: reason.response.status.toString(), description: reason.response.statusText, image:'https://image.tmdb.org/t/p/w600_and_h900_bestv2/npOnzAbLh6VOIu3naU5QaEcTepo.jpg'}]);
        }
      })
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
