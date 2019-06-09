import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import popcorn from '../../media/img/popcorn.png'

const URL = 'https://image.tmdb.org/t/p/w500/'

export const UnconnectedTopItems: React.FC<INT.ITopResultsProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getToggleMoviesRequest,
  getToggleSeriesRequest
}): JSX.Element => {

  const [movieCounter, setMovieCounter] = useState<number>(1)
  const [serieCounter, setSerieCounter] = useState<number>(1)

  const renderMovies = (): JSX.Element[] => {
    return (
      topMovies.map(movie => {
        return (
          <div key={movie.id} className="locandina-outer" data-test="locandina-movie" >
            <img src={URL + movie.poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3>{movie.title}</h3>
              <div className="ratings">
                <p>{movie.vote_average}</p>
                <img src={popcorn} alt="logo" />
              </div>
            </div>
          </div>
        )
      })
    )
  }

  const renderSeries = (): JSX.Element[] => {
    return (
      topSeries.map(serie => {
        return (
          <div key={serie.id} className="locandina-outer" data-test="locandina-serie" >
            <img src={URL + serie.poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3>{serie.name}</h3>
              <div className="ratings">
                <p>{serie.vote_average}</p>
                <img src={popcorn} alt="logo" />
              </div>
            </div>
          </div>
        )
      })
    )
  }

  const handlePagination = (): void => {
    if (isMovieCatSelected) {
      setMovieCounter(movieCounter => movieCounter + 1)
      getToggleMoviesRequest(movieCounter)
    } else {
      setSerieCounter(serieCounter => serieCounter + 1)
      getToggleSeriesRequest(serieCounter)
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


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries
  }
}

export default connect(mapStateToProps, {
  getToggleMoviesRequest,
  getToggleSeriesRequest
})(UnconnectedTopItems)

