import React, { useEffect } from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getMoviesByGenreRequest, getSeriesByGenreRequest } from '../../redux/actions/apiActions'
import { genreItemsActive } from '../../redux/actions/uiActions'
import * as INT from '../../helpers/interfaces'

const GenreItemsPage: React.FC<INT.IGenreResultsPage> = ({
  isMovieCatSelected,
  moviesByGenre,
  seriesByGenre,
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  movieCategoryId,
  serieCategoryId,
  genreItemsActive
}) => {

  useEffect(() => {
    genreItemsActive(true)
    return () => {
      genreItemsActive(false)
    }
  })


  return (
    <div>
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={moviesByGenre}
        series={seriesByGenre}
        getMovies={getMoviesByGenreRequest}
        getSeries={getSeriesByGenreRequest}
        moviesId={movieCategoryId}
        seriesId={serieCategoryId}
      />
    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    moviesByGenre: state.moviesReducer.moviesByGenre,
    seriesByGenre: state.seriesReducer.seriesByGenre,
    movieCategoryId: state.moviesReducer.movieCategoryId,
    serieCategoryId: state.seriesReducer.serieCategoryId
  }
}

export default connect(mapStateToProps, {
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  genreItemsActive
})(GenreItemsPage)

