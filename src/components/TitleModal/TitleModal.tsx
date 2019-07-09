import React from 'react'
import * as INT from '../../helpers/interfaces'
import { filterNoImg, reverseMe } from '../../helpers/helperFunctions'
import logo from '../../media/img/logo.png'
import YouTube from 'react-youtube';
import get from 'lodash.get'
import internet from '../../media/img/internet.png'
import popcorn from '../../media/img/popcorn.png'

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

const TitleModal: React.FC<INT.ITitleModalProps> = ({ movieInfo, isMovieModalOpen }): JSX.Element => {

  let { backdrop_path, homepage, original_language, overview, release_date, runtime, tagline, title, videos, vote_average, created_by, first_air_date, episode_run_time, genres, name, number_of_seasons } = movieInfo

  const movieVid: string = get(videos, 'results[0].key', '')

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
          <p>{overview}</p>
          {genres.map(({ id, name }) => <span key={id} className="title-genres">{name}, </span>)}
          <ul>
            {runtime
              ? <li>Runtime: <span>{runtime}</span></li>
              : <li>Episode Runtime: <span>{episode_run_time.map((ep: number) => ep + ', ')}</span>mins.</li>
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
            {created_by && created_by > 0
              ? <li>Created By: <span>{created_by.map(({ name }: IProducer) => name + ', ')}</span></li>
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

