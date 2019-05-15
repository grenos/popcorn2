import { css } from 'styled-components';

const sizes = {
  1920: 1920,
  1536: 1536,
  1366: 1366,
  1024: 1024,
  768: 768,
  668: 668,
  320: 320,
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  if (sizes[label] <= 1024) {
    //
    acc[label] = (...args) => css`
      @media (max-width: ${sizes[label] / 16}em) {
        ${css(...args)};
      }
    `;
    return acc;
    //
  } else {
    //
    acc[label] = (...args) => css`
      @media (min-width: ${sizes[label] / 16}em) {
        ${css(...args)};
      }
    `;
    return acc;
    //
  }
}, {});



// use case

// import { media } from '../../helpers/mediaQueries';

// import styled from 'styled-components';

// const BigTitle = styled.h1`
//   color: white;
//   font-size: 13vw;
//   line-height: 0.75em;
//   letter-spacing: 0;


//   ${media.768`
//     line-height: 1em;
//     text-align: center;
//   `};


// `;