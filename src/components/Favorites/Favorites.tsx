import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import * as INT from '../../helpers/interfaces'
// import { movieGenresMock } from '../../helpers/mockData/movie-genres'
// import { serieGenresMock } from '../../helpers/mockData/serie-genres'
import { compareArrValues, } from '../../helpers/helperFunctions'
import { categorizeArrays } from '../../redux/actions/apiActions'

// const URL = 'https://image.tmdb.org/t/p/w300'

const Favorites: React.FC<INT.IFavorites & RouteComponentProps> = ({
  favMovies,
  favSeries,
  categorizeArrays,
  // favReducer
}): JSX.Element => {

  useEffect(() => {
    categorizeArrays(favMovies, favSeries)
  }, [favMovies, favSeries, categorizeArrays])

  return (
    <div style={{ color: 'white', fontSize: 50, margin: 30 }}>

    </div>
  )
}


const mapStateToProps = (state: any) => {
  return {
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    // favReducer: state.favReducer
  }
}

export default withRouter(connect(mapStateToProps, { categorizeArrays })(Favorites))



