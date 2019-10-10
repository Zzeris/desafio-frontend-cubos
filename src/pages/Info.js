import React, { useState, useEffect } from 'react';

import api from '../services/api';

import './Info.css';

export default function Info({ match }){
    const [movie, setMovie] = useState({});

    useEffect(()=>{
        async function loadMovie() {
            const response = await api.get(`movie/${match.params.id}?api_key=8812f46d36cdbfdb2b0367796e98c9cb&language=pt-BR&append_to_response=videos`)
            setMovie(response.data);
            console.log(response.data)
        }
        loadMovie();
    },[match.params.id]);

    function formatDate(date) {
        if (date) {
            const [year, month, day] = date.split('-');
            const result = `${day}/${month}/${year}`;
            return result
        }
    }
    
    return (
        <div className="info-container">
            <section>
                <header>
                    <h1>{movie.title}</h1>
                    <span>{formatDate(movie.release_date)}</span>
                </header>
                <article>
                    <div className="info-content">
                        <div className="synopsis">
                            <h2>Sinopse</h2>
                            <span>
                                {movie.overview}
                            </span>
                        </div>
                        <div className="information">
                            <h2>Informações</h2>
                            <ul>
                                <li>
                                    <h2>Situação</h2>
                                    <span>{(movie.status === 'Released') ? 'Lançado' : 'Em breve'}</span>
                                </li>
                                <li>
                                    <h2>Idioma</h2>
                                    <span>{(typeof(movie.spoken_languages) == 'object') ?
                                        movie.spoken_languages.map(language => (<div>{language.name}</div>))
                                        : 'Português'
                                    }</span>
                                </li>
                                <li>
                                    <h2>Duração</h2>
                                    <span>{movie.runtime}min</span>
                                </li>
                                <li>
                                    <h2>Orçamento</h2>
                                    <span>${movie.budget}</span>
                                </li>
                                <li>
                                    <h2>Receita</h2>
                                    <span>${movie.revenue}</span>
                                </li>
                                <li>
                                    <h2>Lucro</h2>
                                    <span>${movie.revenue - movie.budget}</span>
                                </li>
                            </ul>
                        </div>
                        <footer>
                            <div className="info-genres">
                                {(typeof(movie.genres) == 'object') ?
                                    movie.genres.map(genre => (<span>{genre.name}</span>)) : <span>Sem gênero</span>}
                            </div>
                            <div className="popularity">
                                <span>{Math.floor(movie.popularity)}%</span>
                            </div>
                        </footer>
                    </div>
                    {!movie.poster_path ? <img
                        src={'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg'}
                        alt="poster"
                        /> : <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt="poster" />}
                </article>
                <div className="trailer"></div>
            </section>
        </div>
    );
}