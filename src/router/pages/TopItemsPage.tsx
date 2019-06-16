import React from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'
import VisoreSlider from '../../components/VisoreSlider/VisoreSlider'
import * as INT from '../../helpers/interfaces'

const TopItemsPage: React.FC<INT.ITopResultsPage> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getToggleMoviesRequest,
  getToggleSeriesRequest }) => {

  return (
    <div>
      <VisoreSlider />
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={topMovies}
        series={topSeries}
        getMovies={getToggleMoviesRequest}
        getSeries={getToggleSeriesRequest}
      />
    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    topMovies: state.moviesReducer.topMovies,
    topSeries: state.seriesReducer.topSeries,
  }
}

export default connect(mapStateToProps, {
  getToggleMoviesRequest,
  getToggleSeriesRequest
})(TopItemsPage)

