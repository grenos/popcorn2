import { Pagination, Navigation } from 'react-id-swiper/lib/ReactIdSwiper.full'

export const params = {
  modules: [Pagination, Navigation],
  spaceBetween: 30,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}