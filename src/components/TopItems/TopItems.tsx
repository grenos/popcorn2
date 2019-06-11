import React, { useState } from 'react'
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
  getSeries
}): JSX.Element => {

  const [movieCounter, setMovieCounter] = useState<number>(1)
  const [serieCounter, setSerieCounter] = useState<number>(1)

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
      setMovieCounter(movieCounter => movieCounter + 1)
      getMovies(movieCounter)
    } else {
      setSerieCounter(serieCounter => serieCounter + 1)
      getSeries(serieCounter)
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

