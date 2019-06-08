import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import * as INT from '../../helpers/interfaces'

const URL = 'https://image.tmdb.org/t/p/w500/'

const TopItems: React.FC<INT.ITopResultsProps> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
}): JSX.Element => {

  useEffect(() => {
    console.log(topMovies);
  })

  const renderMovies = () => {
    return (
      topMovies.map(({ id, title, poster_path, vote_average }) => {
        return (
          <div key={id} className="locandina-outer">
            <img src={URL + poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3 style={{ color: 'white' }}>{title}</h3>
              <p>{vote_average}</p>
            </div>
          </div>
        )
      })
    )
  }


  const renderSeries = () => {
    return (
      topSeries.map(({ id, name, poster_path, vote_average }) => {
        return (
          <div key={id} className="locandina-outer">
            <img src={URL + poster_path} alt="img" />
            <div className="overlay-gallery">
              <h3 style={{ color: 'white' }}>{name}</h3>
              <p>{vote_average}</p>
            </div>
          </div>
        )
      })
    )
  }

  const renderTitles = isMovieCatSelected ? renderMovies() : renderSeries()

  return (
    <div className="locandine-wrapper">
      {renderTitles}
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

export default connect(mapStateToProps, null)(TopItems)

