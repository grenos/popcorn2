import React from 'react'
// import TopItems from '../../components/TopItems/TopItems'
import { ReuseTopItems } from '../../components/HOC/RenderLocandine'
import { connect } from 'react-redux'
import { getToggleMoviesRequest, getToggleSeriesRequest } from '../../redux/actions/apiActions'


const TopItemsPage: React.FC<any> = ({
  isMovieCatSelected,
  topMovies,
  topSeries,
  getToggleMoviesRequest,
  getToggleSeriesRequest }) => {
  return (
    <div style={{ color: 'white', fontSize: '40px' }} >
      {ReuseTopItems({ isMovieCatSelected, topMovies, topSeries, getToggleMoviesRequest, getToggleSeriesRequest })}
    </div >
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

export default connect(mapStateToProps, {
  getToggleMoviesRequest,
  getToggleSeriesRequest
})(TopItemsPage)

