import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MediaCard from './MediaCard'

import { Navigation} from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Container } from '@mui/material';

export default function MiniCarousel2() {
  return (
    <>
      <Container sx={{ marginTop: '50px', marginBottom: '50px' }}>
      <Swiper
        slidesPerView={3}
        spaceBetween={30}        
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
            <SwiperSlide><MediaCard title="Receta 1" description="Descripción de la receta 1" id="1" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
            <SwiperSlide><MediaCard title="Receta 2" description="Descripción de la receta 2" id="2" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
            <SwiperSlide><MediaCard title="Receta 3" description="Descripción de la receta 3" id="3" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
            <SwiperSlide><MediaCard title="Receta 4" description="Descripción de la receta 4" id="4" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
            <SwiperSlide><MediaCard title="Receta 5" description="Descripción de la receta 5" id="5" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
            <SwiperSlide><MediaCard title="Receta 6" description="Descripción de la receta 6" id="6" url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" /></SwiperSlide>
        </Swiper>
      </Container>      
    </>
  );
}

