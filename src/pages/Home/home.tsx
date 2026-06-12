import style from './home.module.scss'
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css/free-mode";
import { useState } from 'react';
export const HomePage = () => {

    const [search ,setSearch] = useState('')

    // const 
    return (
        <div className={style.HomePage}>
            <div className={style.HomePage_Header}>
                <button><img width="45px" src="../../img/Menu.svg" alt="menu" /></button>
                <img width="100px" src="../../img/Logo.svg" alt="Logo" />
                <button className={style.HomePage_Header_CartBtn}><img width="18px" src="../../img/cart.svg" alt="cart"/></button>
            </div>
            
            <div className={style.HomePage_Input}>
               <img width="15px" src="../../img/Search.svg" alt="search" />
               <input type="search" placeholder='Search...'/>
            </div>

            <div className={style.HomePage_Categories}>
                <div className={style.HomePage_Categories_SeeAll}>
                    <h2>All Categories</h2>
                    <button>See All <img width="5px" src="../../img/Vector (1).svg" alt="vector" /> </button>
                </div>
                

                <Swiper
                   slidesPerView="auto"
                   spaceBetween={10}
                   freeMode={true}
                    modules={[FreeMode]}
                   >
                    <SwiperSlide className={style.chip}>
                       <button><img width="122x" src="https://static.vecteezy.com/system/resources/previews/029/464/377/large_2x/hot-dog-on-a-white-background-fast-food-promotional-commercial-photo.jpg" alt="" />
                       <div>
                          <h2>Hot Dog</h2>
                          <span>
                            <h4>Starting</h4>
                            <strong>$40</strong>
                          </span>
                       </div>
                       </button>
                    </SwiperSlide>
                    
                    <SwiperSlide className={style.chip}>
                       <button><img width="122px" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBrjMRtU7gQFdCbYZbS0S4pYWebgLtVw_A2apXi2hm5w&s=10" alt="" />
                       <div>
                          <h2>Burger</h2>
                          <span>
                            <h4>Starting</h4>
                            <strong>$50</strong>
                          </span>
                       </div>
                       </button>
                    </SwiperSlide>

                    <SwiperSlide className={style.chip}>
                       <button><img width="122px" src="https://img.magnific.com/free-photo/pizza-with-cheese-tomato-isolated-white-background-pizza-margarita-top-view-photo-menu_639032-289.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                       <div>
                          <h2>Pizza</h2>
                          <span>
                            <h4>Starting</h4>
                            <strong>$70</strong>
                          </span>
                       </div>
                       </button>
                    </SwiperSlide>
                    </Swiper>
            
            </div>

            <div className={style.HomePage_AllRestaurantBtn}>
                <h2>Open Restaurants</h2>
                <button>See All <img width="5px" src="../../img/Vector (1).svg" alt="vector" /> </button>
            </div>

            <div className={style.HomePage_Restaurant}>
                <div>
                    <img width="100%" src="https://d1w7312wesee68.cloudfront.net/HszMnjHL52PmBG0KLFUTdEI4g4owDIuqilcdMcmSfFE/resize:fit:720:720/plain/s3://toasttab/menu_service/restaurants/14ead106-b531-429f-87cf-83402fff212a/MenuItem/040d6434-c8ab-4f3f-8ad2-4840856f3dc8.jpg" alt="" />
                    <h2>Rose Garden Restaurant</h2>
                    <p>Burger - Chiken - Riche - Wings </p>
                    <div>
                        <span><img src="../../img/Icon.svg" alt="" /></span>
                        <span><img src="../../img/Icon (1).svg" alt="" /></span>
                        <span><img src="../../Review.svg" alt="" /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
