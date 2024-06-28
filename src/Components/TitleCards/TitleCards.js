import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({title , category}) => {

  const [apiData , setApiData] = useState([]);

  const cardsref = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzY2E4ZDI4ZTllZjRkYzg2YTMxMjZmYjdiMmFiYzYzYyIsIm5iZiI6MTcxOTQ3Mzg5Mi4wNzU2ODYsInN1YiI6IjY2N2QxMjk0ZmZlNjYzN2MwOTkzYmY4MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.i3fem2kgpMB8u7FkFT7ievKmOkvjnYiCxOWoll_-_lA'
    }
  };
  

const handleWheel = (event)=> {
  event.preventDefault();
  cardsref.current.scrollLeft += event.deltaY;
}

useEffect (() => {

  fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));

  cardsref.current.addEventListener('wheel' , handleWheel)
} , [])

  return (
    <div className='title-cards'>
        <h2>{title ? title : "Popular on Netflix"}</h2>
        <div className='card-list' ref= {cardsref}>
           {
            apiData.map((card , index) =>{
                return <Link to={`/player/${card.id}`} className='card' key={index}>
                   <img src = {`https://image.tmdb.org/t/p/w500/`+ card.backdrop_path } alt='' />
                   <p>{ card.original_title }</p>
                </Link>
            })
           }
        </div>
    </div>
  )
}

export default TitleCards