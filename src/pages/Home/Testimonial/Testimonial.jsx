import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";
// React rating
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
const Testimonial = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch(`reviews.json`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div className="my-20">
      <SectionTitle
        heading={"Testimonials"}
        subHeading={"What's Our Client Say"}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
       
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="my-16 mx-24 flex flex-col items-center space-y-4">
              <Rating
                style={{ maxWidth: 180 }}
                value={review.rating}
                readOnly
              />
              <p className="my-16">{review.details}</p>
              <p className="text-2xl text-orange-500 ">{review.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonial;
