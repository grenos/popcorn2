import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import { Link, withRouter } from "react-router-dom"
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'
import { RouteComponentProps } from "react-router";

const URL = 'https://image.tmdb.org/t/p/w500/'

export const UnconnectedTopItems: React.FC<INT.ITopResultsProps & RouteComponentProps> = ({
  isMovieCatSelected,
  movies,
  series,
  getMovies,
  getSeries,
  match,
  userHasTyped
}): JSX.Element => {

  const [movieCounter, setMovieCounter] = useState<number>(1)
  const [serieCounter, setSerieCounter] = useState<number>(1)

  const [InputmovieCounter, setInputMovieCounter] = useState<number>(1)
  const [InputserieCounter, setInputSerieCounter] = useState<number>(1)

  useEffect(() => {
    return () => {
      if (match.url === '/') {
        sessionStorage.setItem('top_movies', JSON.stringify(movieCounter))
        sessionStorage.setItem('top_series', JSON.stringify(serieCounter))
      } else if (match.url === '/results') {
        sessionStorage.setItem('search_movies', JSON.stringify(InputmovieCounter))
        sessionStorage.setItem('search_series', JSON.stringify(InputserieCounter))
      }
    }
  }, [movieCounter, serieCounter, match.url, InputmovieCounter, InputserieCounter])

  useEffect(() => {
    if (match.url === '/') {
      setMovieCounter(parseInt(sessionStorage.getItem('top_movies') || `1`))
      setSerieCounter(parseInt(sessionStorage.getItem('top_series') || `1`))
    } else if (match.url === '/results') {
      setInputMovieCounter(parseInt(sessionStorage.getItem('search_movies') || `1`))
      setInputSerieCounter(parseInt(sessionStorage.getItem('search_series') || `1`))
    }
  }, [])


  const renderMovies = (): JSX.Element[] => {
    return (
      movies.map(({ id, poster_path, title, vote_average }) => {
        return (
          <div key={id} className="locandina-outer" data-test="locandina-movie" >
            <Link to={`/title/${id}`}>
              <img src={filterNoImg(URL, poster_path, popcorn)} alt={`${title}`} />
              <div className="overlay-gallery">
                <h3>{title}</h3>
                <div className="ratings">
                  <p>{vote_average}</p>
                  <img src={popcorn} alt="logo" />
                </div>
              </div>
            </Link>
          </div>
        )
      })
    )
  }

  const renderSeries = (): JSX.Element[] => {
    return (
      series.map(({ id, poster_path, name, vote_average }) => {
        return (
          <div key={id} className="locandina-outer" data-test="locandina-serie" >
            <Link to={`/title/${id}`}>
              <img src={filterNoImg(URL, poster_path, popcorn)} alt={`${name}`} />
              <div className="overlay-gallery">
                <h3>{name}</h3>
                <div className="ratings">
                  <p>{vote_average}</p>
                  <img src={popcorn} alt="logo" />
                </div>
              </div>
            </Link>
          </div>
        )
      })
    )
  }


  const handlePagination = (): void => {
    if (isMovieCatSelected) {
      if (match.url === '/') {
        setMovieCounter(movieCounter => movieCounter + 1)
        getMovies(movieCounter)
      } else if (match.url === '/results') {
        setInputMovieCounter(InputmovieCounter => InputmovieCounter + 1)
        getMovies(userHasTyped, movieCounter) // here add change from store
      }
    } else {
      if (match.url === '/') {
        setSerieCounter(serieCounter => serieCounter + 1)
        getSeries(serieCounter)
      } else if (match.url === '/results') {
        setInputSerieCounter(InputserieCounter => InputserieCounter + 1)
        getMovies(userHasTyped, movieCounter) // here add change from store
      }
    }
  }

  const renderTitles = isMovieCatSelected ? renderMovies() : renderSeries()

  return (
    <div className="locandine-wrapper" data-test="component-locandine">
      {renderTitles}
      <Waypoint onEnter={handlePagination} fireOnRapidScroll={true} />
    </div>
  )
}

export default withRouter(UnconnectedTopItems)

