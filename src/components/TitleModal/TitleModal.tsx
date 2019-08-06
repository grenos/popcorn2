import React, { useState, useEffect } from 'react'
import * as INT from '../../helpers/interfaces'
import { filterNoImg, reverseMe } from '../../helpers/helperFunctions'
import logo from '../../media/img/logo.png'
import YouTube from 'react-youtube'
import Scrollbar from 'react-scrollbars-custom'
import get from 'lodash.get'
import internet from '../../media/img/internet.png'
import popcorn from '../../media/img/popcorn.png'
import useWindowSize from '@rehooks/window-size';

const URL = 'https://image.tmdb.org/t/p/original'

const Options = {
  // @ts-ignore
  height: '50vh',
  playerVars: {
    autoplay: 1,
    cc_load_policy: 0,
    disablekb: 1,
    origin: 'http://localhost:3000/',
    enablejsapi: 1,
    iv_load_policy: 3,
    loop: 1,
    modestbranding: 1,
    playsinline: 1,
    rel: 0,
    showinfo: 0,
  }
}

interface IProducer { name: string }
interface IGenres { id: number, name: string }

/**
 * Displays selected item page/modal
 * @function
 * @param {object} movieInfo Contains selected item info
 */
const TitleModal: React.FC<INT.ITitleModalProps> = ({ movieInfo, }): JSX.Element | null => {

  let ww = useWindowSize();
  const [_WW, set_WW] = useState<number>(0)
  const [bottomMargin, setbottomMargin] = useState<number>(0)

  useEffect(() => {
    if (ww.innerWidth > 1366) {
      set_WW(130)
      setbottomMargin(10)
    } else if (ww.innerWidth <= 1366) {
      set_WW(100)
      setbottomMargin(40)
    } else if (ww.innerWidth < 768) {
      // 2
      set_WW(145)
      setbottomMargin(45)
    }
  }, [ww.innerWidth])

  // get everything with lodash/get to avoid loading page 
  // before mounting component
  const backdrop_path: string = get(movieInfo, 'backdrop_path', '')
  const homepage: string = get(movieInfo, 'homepage', '')
  const original_language: string = get(movieInfo, 'original_language', '')
  const overview: string = get(movieInfo, 'overview', '')
  const release_date: string = get(movieInfo, 'release_date', '')
  const runtime: any = get(movieInfo, 'runtime', '')
  const tagline: string = get(movieInfo, 'tagline', '')
  const title: string = get(movieInfo, 'title', '')
  const movieVid: string = get(movieInfo, 'videos.results[0].key', '')
  const vote_average: any = get(movieInfo, 'vote_average', '')
  const created_by: [] = get(movieInfo, 'created_by', [])
  const first_air_date: string = get(movieInfo, 'first_air_date', '')
  const episode_run_time: [] = get(movieInfo, 'episode_run_time', [])
  const genres: IGenres[] = get(movieInfo, 'genres', [])
  const name: string = get(movieInfo, 'name', '')
  const number_of_seasons: string = get(movieInfo, 'number_of_seasons', '')


  return (
    <div className="title-modal__wrapper" style={{
      background: `
      linear-gradient(to right, 
        black 0%, rgba(0, 0, 0, 0.86) 47%, 
        rgba(0, 0, 0, 0.75) 64%, 
        rgba(0, 0, 0, 0.65) 79%, 
        rgba(0, 0, 0, 0) 100%), 
        url(${filterNoImg(URL, backdrop_path, popcorn)})`
    }}>
      <div className="title-modal__header">
        <div className="header__icons">
          <img src={logo} alt="popcorn logo" />
        </div>
        <div className="header__title">
          {title
            ? <h3>{title}</h3>
            : <h3>{name}</h3>
          }
          {tagline
            ? <h5><q>{tagline}</q></h5>
            : null
          }
        </div>
      </div>

      <div className="title-modal__main-window">
        <div className="main-window__video">
          <YouTube
            videoId={movieVid}
            className="video-title-page"
            containerClassName="video-container-title-page"
            // @ts-ignore
            opts={Options}
          />
        </div>
        <div className="main-window__info">
          <Scrollbar
            noDefaultStyles
            momentum={true}
            style={{ height: _WW, marginBottom: bottomMargin }}
          >
            {overview && <p>{overview}</p>}
          </Scrollbar>
          {genres && genres.map(({ id, name }) => <span key={id} className="title-genres">{name}{' '}</span>)}
          <ul>
            {runtime
              ? <li>Runtime: <span>{runtime}</span></li>
              : <li>Episode Runtime: <span>{episode_run_time.map((ep: number) => ep + ' ')}</span> mins.</li>
            }
            {release_date
              ? <li>Release Date: <span>{reverseMe(release_date)}</span></li>
              : <li>Release Date: <span>{reverseMe(first_air_date)}</span></li>
            }
            <li>Original Language: <span>{original_language && original_language.toUpperCase()}</span></li>
            <li>Vote Average: <span>{vote_average && vote_average}</span> pops</li>
            {number_of_seasons
              ? <li>Seasons: <span>{number_of_seasons}</span></li>
              : null
            }
            {created_by && created_by.length >= 1
              ? <li>Created By: <span>{created_by.map(({ name }: IProducer) => name + '  ')} </span></li>
              : null
            }
          </ul>
          <a href={homepage} target="_blank" rel="noopener noreferrer">
            <img src={internet} alt="internet" />
          </a>
        </div>
      </div>
    </div>
  )
}



export default TitleModal

