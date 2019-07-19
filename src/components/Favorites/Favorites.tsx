import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from "react-router"
import { withRouter } from "react-router-dom"
import * as INT from '../../helpers/interfaces'
import { categorizeArrays } from '../../redux/actions/apiActions'
// import { movieGenresMock } from '../../helpers/mockData/movie-genres'
// import { serieGenresMock } from '../../helpers/mockData/serie-genres'
// import { compareArrValues } from '../../helpers/helperFunctions'


const URL = 'https://image.tmdb.org/t/p/w500'

export const UnconnectedFavorites: React.FC<INT.IFavorites & RouteComponentProps> = ({
  favMovies,
  favSeries,
  categorizeArrays,
  favArray
}): JSX.Element => {

  useEffect(() => {
    categorizeArrays(favMovies, favSeries)

  }, [favMovies, favSeries, categorizeArrays])


  const { action,
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
    news,
    reality,
    soap,
    talk } = favArray

  return (
    <div style={{ color: 'white', fontSize: 50, margin: 30 }}>

      <div className="row-fav">
        {action.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {adventure.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {animation.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {comedy.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {crime.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {documentary.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {drama.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {family.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {fantasy.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {history.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {horror.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {music.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {mystery.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {romance.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {science_fiction.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {tv_movie.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {thriller.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {war.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {western.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {news.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      <div className="row-fav">
        {reality.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

      {/* <div className="row-fav">
        {soap.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div> */}

      <div className="row-fav">
        {talk.map((item: any) => {
          return (
            <img key={item.id} src={URL + item.poster} alt="" />
          )
        })}
      </div>

    </div >
  )
}



const mapStateToProps = (state: any) => {
  return {
    favMovies: state.moviesReducer.favMovies,
    favSeries: state.seriesReducer.favSeries,
    favArray: state.favoritesReducer
  }
}

export default withRouter(connect(mapStateToProps, {
  categorizeArrays
})(UnconnectedFavorites))






