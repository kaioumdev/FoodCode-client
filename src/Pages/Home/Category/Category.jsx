import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../../assets/home/slide1.jpg";
import slide2 from "../../../assets/home/slide2.jpg";
import slide3 from "../../../assets/home/slide3.jpg";
import slide4 from "../../../assets/home/slide4.jpg";
import slide5 from "../../../assets/home/slide5.jpg";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Category = () => {
  return (
    <section className="px-4">
      <SectionTitle
        heading={"Order Online"}
        subHeading={"From 11:00am to 10:00pm"}
      />

      {/* Swiper component with responsive breakpoints */}
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper mb-24"
        breakpoints={{
          640: { slidesPerView: 2 },  // Small devices: 2 items per row
          768: { slidesPerView: 3 },  // Medium devices: 3 items per row
          1024: { slidesPerView: 4 }, // Large devices: 4 items per row
        }}
      >
        {/* Individual Slides */}
        {[{ img: slide1, title: "Salads" }, { img: slide2, title: "Pizzas" },
        { img: slide3, title: "Soups" }, { img: slide4, title: "Desserts" },
        { img: slide5, title: "Drinks" }].map((item, index) => (
          <SwiperSlide key={index} className="flex flex-col items-center">
            <img src={item.img} className="w-full h-80 object-cover rounded-lg" alt={item.title} />
            <h3 className="text-2xl md:text-3xl uppercase text-center -mt-10 text-white">
              {item?.title}
            </h3>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
