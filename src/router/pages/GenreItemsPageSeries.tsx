import React, { useEffect, useState } from 'react'
import TopItems from '../../components/TopItems/TopItems'
import { connect } from 'react-redux'
import { getSeriesByGenreRequest } from '../../redux/actions/apiActions'
import { genreItemsActive } from '../../redux/actions/uiActions'
import { RouteComponentProps } from "react-router";
import { makeDashesUrl } from '../../helpers/helperFunctions'
import useWindowSize from '@rehooks/window-size';


import * as INT from '../../helpers/interfaces'
interface RouteParams {
  id: string,
}

const GenreItemsPage: React.FC<INT.IGenreResultsPage & RouteComponentProps<RouteParams>> = ({
  isMovieCatSelected,
  action_adventure,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  family,
  kids,
  mystery,
  news,
  reality,
  scifi_fantasy,
  soap,
  talk,
  war_politics,
  western,
  getSeriesByGenreRequest,
  serieCategoryId,
  genreItemsActive,
  match
}) => {

  let ww = useWindowSize();

  const [genreCat, setGenreCat] = useState()

  useEffect(() => {
    genreItemsActive(true)
    return () => {
      genreItemsActive(false)
    }
  })


  useEffect(() => {
    switch (makeDashesUrl(match.params.id.toLowerCase())) {
      case 'action_&_adventure': setGenreCat(action_adventure)
        break
      case 'animation': setGenreCat(animation)
        break;
      case 'comedy': setGenreCat(comedy)
        break;
      case 'documentary': setGenreCat(documentary)
        break;
      case 'crime': setGenreCat(crime)
        break;
      case 'drama': setGenreCat(drama)
        break
      case 'family': setGenreCat(family)
        break;
      case 'kids': setGenreCat(kids)
        break;
      case 'mystery': setGenreCat(mystery)
        break;
      case 'news': setGenreCat(news)
        break
      case 'reality': setGenreCat(reality)
        break;
      case 'sci-fi_&_fantasy': setGenreCat(scifi_fantasy)
        break;
      case 'soap': setGenreCat(soap)
        break;
      case 'talk': setGenreCat(talk)
        break;
      case 'war_&_politics': setGenreCat(war_politics)
        break;
      case 'western': setGenreCat(western)
        break;
      default:
        break;
    }
  }, [
      action_adventure,
      animation,
      comedy,
      documentary,
      drama,
      family,
      kids,
      mystery,
      crime,
      news,
      reality,
      scifi_fantasy,
      soap,
      talk,
      war_politics,
      western,
      match.params.id])


  return (
    <div style={
      ww.innerWidth > 668
        ? { paddingTop: '0%' }
        : { paddingTop: '17%' }
    }>
      <TopItems
        isMovieCatSelected={isMovieCatSelected}
        series={genreCat}
        getSeries={getSeriesByGenreRequest}
        seriesId={serieCategoryId}
      />
    </div >
  )
}


const mapStateToProps = (state: any) => {
  return {
    isMovieCatSelected: state.uiReducer.isMovieCatSelected,
    serieCategoryId: state.serieGenresReducer.serieCategoryId,
    action_adventure: state.serieGenresReducer.action_adventure,
    animation: state.serieGenresReducer.animation,
    comedy: state.serieGenresReducer.comedy,
    crime: state.serieGenresReducer.crime,
    documentary: state.serieGenresReducer.documentary,
    drama: state.serieGenresReducer.drama,
    family: state.serieGenresReducer.family,
    kids: state.serieGenresReducer.kids,
    mystery: state.serieGenresReducer.mystery,
    news: state.serieGenresReducer.news,
    reality: state.serieGenresReducer.reality,
    scifi_fantasy: state.serieGenresReducer.scifi_fantasy,
    soap: state.serieGenresReducer.soap,
    talk: state.serieGenresReducer.talk,
    war_politics: state.serieGenresReducer.war_politics,
    western: state.serieGenresReducer.western
  }
}

export default connect(mapStateToProps, {
  getSeriesByGenreRequest,
  genreItemsActive
})(GenreItemsPage)

