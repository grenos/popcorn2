import React, { useEffect, useState } from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getMoviesByGenreRequest, getSeriesByGenreRequest } from '../../redux/actions/apiActions'
import { genreItemsActive } from '../../redux/actions/uiActions'
import { RouteComponentProps } from "react-router";
import { makeDashesUrl } from '../../helpers/helperFunctions'

import * as INT from '../../helpers/interfaces'
interface RouteParams {
  id: string,
}

const GenreItemsPage: React.FC<INT.IGenreResultsPage & RouteComponentProps<RouteParams>> = ({
  isMovieCatSelected,
  action,
  adventure,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  family,
  fantasy,
  history,
  horror,
  music,
  mystery,
  romance,
  science_fiction,
  tv_movie,
  thriller,
  war,
  western,
  getMoviesByGenreRequest,
  movieCategoryId,
  genreItemsActive,
  match,
}) => {

  const [genreCat, setGenreCat] = useState()

  useEffect(() => {
    genreItemsActive(true)
    return () => {
      genreItemsActive(false)
    }
  })

  useEffect(() => {
    switch (makeDashesUrl(match.params.id.toLowerCase())) {
      case 'action': setGenreCat(action)
        break
      case 'adventure': setGenreCat(adventure)
        break;
      case 'animation': setGenreCat(animation)
        break;
      case 'comedy': setGenreCat(comedy)
        break;
      case 'crime': setGenreCat(crime)
        break;
      case 'documentary': setGenreCat(documentary)
        break
      case 'drama': setGenreCat(drama)
        break;
      case 'family': setGenreCat(family)
        break;
      case 'fantasy': setGenreCat(fantasy)
        break;
      case 'history': setGenreCat(history)
        break;
      case 'horror': setGenreCat(horror)
        break
      case 'music': setGenreCat(music)
        break;
      case 'mystery': setGenreCat(mystery)
        break;
      case 'romance': setGenreCat(romance)
        break;
      case 'science_fiction': setGenreCat(science_fiction)
        break;
      case 'tv_movie': setGenreCat(tv_movie)
        break;
      case 'thriller': setGenreCat(thriller)
        break;
      case 'war': setGenreCat(war)
        break;
      case 'western': setGenreCat(western)
        break;
      default:
        break;
    }
  }, [action,
      adventure,
      animation,
      comedy,
      crime,
      documentary,
      drama,
      family,
      fantasy,
      history,
      horror,
      music,
      mystery,
      romance,
      science_fiction,
      tv_movie,
      thriller,
      war,
      western,
      match.params.id])


  return (
    <div style={{ paddingTop: '17%' }}>
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        movies={genreCat}
        getMovies={getMoviesByGenreRequest}
        moviesId={movieCategoryId}
      />
    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    movieCategoryId: state.movieGenresReducer.movieCategoryId,
    action: state.movieGenresReducer.action,
    adventure: state.movieGenresReducer.adventure,
    animation: state.movieGenresReducer.animation,
    comedy: state.movieGenresReducer.comedy,
    crime: state.movieGenresReducer.crime,
    documentary: state.movieGenresReducer.documentary,
    drama: state.movieGenresReducer.drama,
    family: state.movieGenresReducer.family,
    fantasy: state.movieGenresReducer.fantasy,
    history: state.movieGenresReducer.history,
    horror: state.movieGenresReducer.horror,
    music: state.movieGenresReducer.music,
    mystery: state.movieGenresReducer.mystery,
    romance: state.movieGenresReducer.romance,
    science_fiction: state.movieGenresReducer.science_fiction,
    tv_movie: state.movieGenresReducer.tv_movie,
    thriller: state.movieGenresReducer.thriller,
    war: state.movieGenresReducer.war,
    western: state.movieGenresReducer.western
  }
}

export default connect(mapStateToProps, {
  getMoviesByGenreRequest,
  getSeriesByGenreRequest,
  genreItemsActive
})(GenreItemsPage)

