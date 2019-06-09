import { Pagination, Navigation } from 'swiper/dist/js/swiper.esm'

export const params = {
  modules: [Pagination, Navigation],
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}