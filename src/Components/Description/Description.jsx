import React, { useEffect, useState } from 'react'
import './Description.css'
import moment from "moment";

export default function Description(props) {
    const id = props.movieId;
    console.log(id)
    const [movie, setMovie] = useState([]);
    useEffect(() => {
        async function getUsers() {
            const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTU4M2VmZGI0MTJlZjJmZjNkMTcxMzBhYWM0ODQ2YiIsInN1YiI6IjY0ZWRkMjJhMWZlYWMxMDBlMTZjMjQ5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XCDdxJgtCo-Q_TuPIzf7L7ijdnVp1eZ9V5Uv6X0Qd34',
                },
            });

            const finaldata = await response.json();
            
            setMovie(finaldata);
        }
        getUsers();
    }, []);
    console.log("details"+ JSON.stringify(movie))

    return (
        <>
        <header className='container-fluid shadow-sm pt-2 pb-2 bg-body rounded justify-content-between d-flex flex-row pt-1 pb-1'>
                <div className='w-50 justify-content-between d-flex flex-row'>
                    <h3>Movie details</h3>
                </div>
                <i className="fa-solid fa-house pt-2"></i>
            </header>
        <div className='container-fluid d-flex pt-2  movie-details'>       
                <div className='container-fluid d-flex pt-2 description'>
                <div className='h-175 image-container'>
                                <img alt=''></img>
                            </div>
                           <div className=' pb-3 movie-details'> 
                        <div className='d-flex'>
                            <h6 className='me-2'>{movie.title}</h6>
                            <p className='me-2'>({movie.vote_average ? (movie.vote_average).toFixed(2) : 0 })</p>
                        </div>
                        <div className='d-flex'>
                            <p className='me-2'>{movie.release_date ? moment(movie.release_date).format('YYYY') : null}</p><span className='me-2'>|</span>
                            <p className='me-2'>{movie.runtime? Math.floor(movie.runtime /60)+':'+movie.runtime % 60 : 'Length'}</p><span className='me-2'>|</span>
                            <p className='me-2'>Director </p>
                        </div>
                        <div className='d-flex'>
                            <p className='me-2'>Cast: </p>
                            <p className='me-2'>Actor 1,</p>
                            <p className='me-2'>Actor 2,</p>
                            <p>...</p>
                        </div>
                        <div className='d-flex'>
                            <p className='me-2'>Description: </p>
                            <p className='me-2'>{movie.overview}</p>
                        </div>
                        <p></p>
                    </div>
                </div>          
        </div>
        </>
    )
}
