import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'
import { Waypoint } from 'react-waypoint';
import { Link, withRouter } from "react-router-dom"
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'

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
      topMovies.map(({ id, poster_path, title, vote_average }) => {
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
      topSeries.map(({ id, poster_path, name, vote_average }) => {
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


const mapStateToProps = (state: any, props: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries,
    // match: props.match
  }
}

export default withRouter(connect(mapStateToProps, {
  getToggleMoviesRequest,
  getToggleSeriesRequest
})(UnconnectedTopItems))

