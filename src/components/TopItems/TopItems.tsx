import React, { useState } from 'react'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'
import * as INT from '../../helpers/interfaces'
import { Trail } from 'react-spring/renderprops.cjs';
import { Waypoint } from 'react-waypoint';
import popcorn from '../../media/img/popcorn.png'

const URL = 'https://image.tmdb.org/t/p/w500/'

const TopItems: React.FC<INT.ITopResultsProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getToggleMoviesRequest,
  getToggleSeriesRequest
}): JSX.Element => {

  const [movieCounter, setMovieCounter] = useState(1)
  const [serieCounter, setSerieCounter] = useState(1)

  const renderMovies = () => {
    return (
      // <Trail
      //   items={topMovies}
      //   keys={topMovies => topMovies.id}
      //   config={{ tension: 215, mass: .4, friction: 14 }}
      //   from={{ opacity: 0, transform: 'scale(0.8)' }}
      //   to={{ opacity: 1, transform: 'scale(1)' }}
      // >
      //   {({ id, title, poster_path, vote_average }) => ({ opacity, transform }) =>
      //     <div key={id}
      //       className="locandina-outer"
      //       style={{ opacity, transform }}>
      //       <img src={URL + poster_path} alt="img" />
      //       <div className="overlay-gallery">
      //         <h3 style={{ color: 'white' }}>{title}</h3>
      //         <div className="ratings">
      //           <p>{vote_average}</p>
      //           <img src={popcorn} alt="logo" />
      //         </div>
      //       </div>
      //     </div>
      //   }
      // </Trail>

      topMovies.map(movie => {
        return (
          <div key={movie.id}
            className="locandina-outer"
          >
            <img src={URL + movie.poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3 style={{ color: 'white' }}>{movie.title}</h3>
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

  const renderSeries = () => {
    return (
      // <Trail
      //   items={topSeries}
      //   keys={topSeries => topSeries.id}
      //   config={{ tension: 215, mass: .4, friction: 14 }}
      //   from={{ opacity: 0, transform: 'scale(0.8)' }}
      //   to={{ opacity: 1, transform: 'scale(1)' }}
      // >
      //   {({ id, name, poster_path, vote_average }) => ({ opacity, transform }) =>
      //     <div key={id}
      //       className="locandina-outer"
      //       style={{ opacity, transform }}>
      //       <img src={URL + poster_path} alt="img" />
      //       <div className="overlay-gallery">
      //         <h3>{name}</h3>
      //         <div className="ratings">
      //           <p>{vote_average}</p>
      //           <img src={popcorn} alt="logo" />
      //         </div>
      //       </div>
      //     </div>
      //   }
      // </Trail>
      topSeries.map(serie => {
        return (
          <div key={serie.id}
            className="locandina-outer"
          >
            <img src={URL + serie.poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3 style={{ color: 'white' }}>{serie.name}</h3>
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

  const handlePagination = () => {
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
    <div className="locandine-wrapper">
      {renderTitles}
      <Waypoint onEnter={handlePagination} />
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
})(TopItems)

