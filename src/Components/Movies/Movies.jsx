import React, { useState, useEffect, useRef } from 'react';
import './Movies.css';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function Movies(props) {

    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [isSearch, setSearch] = useState(false);
    const [movieName, setMovieName] = useState('');
    const [searchMovie, setSearchMovie] = useState([]);
 
    useEffect(() => {
        fetchData();
      }, []);

    const Idname=(index) => {
        props.movieId(index)
    }
    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
      
        try {
          const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTU4M2VmZGI0MTJlZjJmZjNkMTcxMzBhYWM0ODQ2YiIsInN1YiI6IjY0ZWRkMjJhMWZlYWMxMDBlMTZjMjQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XCDdxJgtCo-Q_TuPIzf7L7ijdnVp1eZ9V5Uv6X0Qd34",
            },
        });
        const data = await response.json();
        console.log("data---"+data.page);

         setTimeout(() => {
          setItems(data.results);
        }, 500);

          setPage(data.page + 1);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      };
  
      const searchResult= async() => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTU4M2VmZGI0MTJlZjJmZjNkMTcxMzBhYWM0ODQ2YiIsInN1YiI6IjY0ZWRkMjJhMWZlYWMxMDBlMTZjMjQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XCDdxJgtCo-Q_TuPIzf7L7ijdnVp1eZ9V5Uv6X0Qd34",
            },
        });
        const finaldata = await response.json();
        setSearchMovie(finaldata);
        console.log(movieName)
        setSearch(!isSearch)
    }
    console.log(isSearch)
    console.log(searchMovie.results)
    return (
        <div className='movie-homepage'>
           <header className='container-fluid shadow-sm pt-2 pb-2 bg-body rounded justify-content-between d-flex flex-row pt-1 pb-1'>
                <div className='w-50 justify-content-between d-flex flex-row'>
                    <i className="fas fa-search search" onClick={searchResult}></i>
                    <input type='text' className='w-100 ms-3 rounded-3 border-0 search-here' placeholder='Search' onChange={(event) => setMovieName(event.target.value)}></input>
                </div>
                <i class="fa-solid fa-house pt-2"></i>
            </header>
           { isSearch ?
                        (                    
                            searchMovie.results?.map((item, index) =>
                            <div className='movies-details justify-content-evenly'>
                                <div className='cards' key={index} onClick={() => Idname(item.id)}>
                                    <div className='h-75 image-container'>
                                        <img alt=''></img>
                                    </div>
                                    <div className='h-25 details-container'>
                                        <div className='name'>
                                            <p className='name'>{item.title.length > 20 ? item.title.slice(0, 15) + '...' : item.title}</p>
                                            <p>{item.vote_average}</p>
                                        </div>
                                        <p className='descriptionList'>{item.overview.slice(0, 40) + '...'}</p>
                                    </div>
                                  </div>
                                </div>
                            )
                        ) :     
    <InfiniteScroll
      dataLength={items.length}
      next={fetchData}
      hasMore={true} // Replace with a condition based on your data source
      loader={<p>Loading...</p>}
      endMessage={<p>No more data to load.</p>}
    >
        <div className='movies-details justify-content-evenly d-flex flex-row mt-3'>
                {items?.map((item, index) =>
                    <div className='cards' key={index} onClick={() => Idname(item.id)}>
                        <Link to='/description' className='text-decoration-none text-dark'>
                            <div className='h-75 image-container'>
                                <img alt=''></img>
                            </div>
                            <div className='h-25 details-container'>
                                <div>
                                <p className='name'>{item.title.length > 20? item.title.slice(0,20)+'...' : item.title}</p>
                                    <p>{item.vote_average}</p>
                                </div>
                                <p className='descriptionList'>{item.overview.slice(0,40)+'...'}</p>
                            </div>
                        </Link>
                    </div>       
                )}
            </div>
    </InfiniteScroll>
}
    {error && <p>Error: {error.message}</p>}
        </div>
    )
}
