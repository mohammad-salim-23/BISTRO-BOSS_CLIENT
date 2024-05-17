import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { useEffect, useState } from "react";
// React rating
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
const Testimonial = () => {
    const [reviews,setReviews] = useState([]);
    useEffect(()=>{
        fetch(`reviews.json`)
        .then(res=>res.json())
        .then(data=>setReviews(data))
    },[])
    return (
        <div className="my-20">
            <SectionTitle
              heading={"Testimonials"}
              subHeading={"What's Our Client Say"}
            >
            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>Slide 1</SwiperSlide>
       {
        reviews.map(review=><SwiperSlide
        key = {review._id}
        >
             <Rating
      style={{ maxWidth: 180 }}
      value={3}
      readOnly
    />
           <div className="m-24">
            <p>{review.details}</p>
            <p className="text-2xl text-orange-500">{review.name}</p>
           </div>
        </SwiperSlide>)
       }
      </Swiper>
        </div>
    );
};

export default Testimonial;