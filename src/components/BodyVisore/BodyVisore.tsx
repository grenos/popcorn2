import React, { useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import popcorn from '../../media/img/popcorn.png'
import { filterNoImg } from '../../helpers/helperFunctions'

const URLBG = 'https://image.tmdb.org/t/p/original'

interface props {
  id: number
  backdrop_path: string
  title: string
  overview: string
}

const BodyVisore = ({ id, backdrop_path, title, overview }: props) => {

  useEffect(() => {

  }, [])

  return (
    <div className="last-item-wrapper" key={id}
      style={{ backgroundImage: `url(${filterNoImg(URLBG, backdrop_path, popcorn)})` }}>
      <h1 className="last-item__title">{title}</h1>
      <p className="last-item__overview">{overview}</p>
    </div>
  )
}

export default BodyVisore
