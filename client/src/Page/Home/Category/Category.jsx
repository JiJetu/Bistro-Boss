import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

import slide1 from "../../../../assets/home/slide1.jpg"
import slide2 from "../../../../assets/home/slide2.jpg"
import slide3 from "../../../../assets/home/slide3.jpg"
import slide4 from "../../../../assets/home/slide4.jpg"
import slide5 from "../../../../assets/home/slide5.jpg"
import SectionHeading from '../../../Components/SectionHeading/SectionHeading';

const Category = () => {
    return (
        <section className='max-w-screen-xl mx-auto'>
            <SectionHeading
            heading="ORDER ONLINE"
            subHeading = 'From 11:00am to 10:00pm'
            ></SectionHeading>
            <Swiper
                slidesPerView={4}
                spaceBetween={30}
                centeredSlides={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                modules={[Pagination, Autoplay]}
                className="mySwiper mb-16"
            >
                <SwiperSlide>
                    <img className='relative' src={slide1} alt="" />
                    <h3 className='text-4xl uppercase text-center text-gray-100 absolute bottom-10 left-1/4'>Salads</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src={slide2} alt="" />
                    <h3 className='text-4xl uppercase text-center text-gray-100 absolute bottom-10 left-1/4'>Pizza</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src={slide3} alt="" />
                    <h3 className='text-4xl uppercase text-center text-gray-100 absolute bottom-10 left-1/4'>Soups</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src={slide4} alt="" />
                    <h3 className='text-4xl uppercase text-center text-gray-100 absolute bottom-10 left-1/4'>Desserts</h3>
                </SwiperSlide>
                <SwiperSlide>
                    <img className='relative' src={slide5} alt="" />
                    <h3 className='text-4xl uppercase text-center text-gray-100 absolute bottom-10 left-1/4'>Salads</h3>
                </SwiperSlide>
            </Swiper>
        </section >
    );
};

export default Category;