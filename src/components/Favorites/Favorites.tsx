import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import * as INT from '../../helpers/interfaces'
// import { movieGenresMock } from '../../helpers/mockData/movie-genres'
// import { serieGenresMock } from '../../helpers/mockData/serie-genres'
import { compareArrValues, categorizeArrays } from '../../helpers/helperFunctions'

// const URL = 'https://image.tmdb.org/t/p/w300'

const Favorites: React.FC<INT.IFavorites & RouteComponentProps> = ({
  favMovies,
  favSeries
}): JSX.Element => {

  useEffect(() => {
    const arr = categorizeArrays(favMovies, favSeries)

  }, [favMovies, favSeries])


  return (
    <div style={{ color: 'white', fontSize: 50, margin: 30 }}>

    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries
  }
}

export default withRouter(connect(mapStateToProps, {})(Favorites))



