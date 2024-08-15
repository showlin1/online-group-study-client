import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import slide1 from "../assets/group studyy.jpg"
import slide2 from "../assets/group study2.jpeg"
import slide3 from "../assets/group study 3.jpg"
import slide4 from "../assets/group study 4.jpeg"
import slide5 from "../assets/group study.jpg"

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const BannerSection = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >


                <SwiperSlide>
                    <div className="hero h-[40rem]">
                        <img className='h-[40rem] w-full object-cover object-center' src={slide1} alt="" />
                        <div className="hero-overlay bg-opacity-20"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="fade-right" data-aos-duration="3000" className="max-w-md ">
                                <h1 className="text-5xl font-bold text-white pb-5">Welcome Group Study</h1>
                                <p className="mb-5 text-xl">If you want to study concepts or practice coding together, message me. My feeling is we all learn at double the speed when working together.</p>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[40rem]">
                        <img className='h-[40rem] w-full object-cover object-center' src={slide2} alt="" />
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="fade-right" data-aos-duration="3000" className="max-w-md ">
                                <h1 className="text-5xl font-bold text-white pb-5">Welcome Group Study</h1>
                                <p className="mb-5 text-xl">If you want to study concepts or practice coding together, message me. My feeling is we all learn at double the speed when working together.</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[40rem]">
                        <img className='h-[40rem] w-full object-cover object-center' src={slide3} alt="" />
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="fade-right" data-aos-duration="3000" className="max-w-md ">
                                <h1 className="text-5xl font-bold text-white pb-5">Welcome Group Study</h1>
                                <p className="mb-5 text-xl">If you want to study concepts or practice coding together, message me. My feeling is we all learn at double the speed when working together.</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[40rem]">
                        <img className='h-[40rem] w-full object-cover object-center' src={slide4} alt="" />
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="fade-right" data-aos-duration="3000" className="max-w-md ">
                                <h1 className="text-5xl font-bold text-white pb-5">Welcome Group Study</h1>
                                <p className="mb-5 text-xl">If you want to study concepts or practice coding together, message me. My feeling is we all learn at double the speed when working together.</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="hero h-[40rem]">
                        <img className='h-[40rem] w-full object-cover object-center' src={slide5} alt="" />
                        <div className="hero-overlay bg-opacity-60"></div>
                        <div className="hero-content text-center text-neutral-content">
                            <div data-aos="fade-right" data-aos-duration="3000" className="max-w-md ">
                                <h1 className="text-5xl font-bold text-white pb-5">Welcome Group Study</h1>
                                <p className="mb-5 text-xl">If you want to study concepts or practice coding together, message me. My feeling is we all learn at double the speed when working together.</p>
                                
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BannerSection;