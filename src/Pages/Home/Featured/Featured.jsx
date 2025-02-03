import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featuredImg from "../../../assets/home/featured.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <section className="featured-item bg-fixed text-white pt-8 my-20">
      <SectionTitle subHeading={"Check it out"} heading={"Featured Item"} />
      <div className="flex flex-col md:flex-row justify-center bg-slate-500 bg-opacity-60 items-center pb-20 pt-12 px-6 sm:px-12 md:px-36 text-center md:text-left">
        <div className="w-full md:w-1/2 flex justify-center">
          <img className="w-full max-w-md md:max-w-none" src={featuredImg} alt="Featured" />
        </div>
        <div className="w-full md:w-1/2 md:ml-10 mt-6 md:mt-0">
          <p className="text-sm sm:text-base">Jan 26, 2025</p>
          <p className="uppercase font-bold text-lg sm:text-xl">Where can we get some?</p>
          <p className="text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit perferendis optio iure autem dicta hic delectus, esse
            similique dignissimos alias consequatur, sint veritatis suscipit quibusdam tenetur dolores nesciunt, animi ipsum. Consectetur, a
            totam! Labore autem exercitationem maxime aliquam sapiente magnam.
          </p>
          <button className="btn btn-outline border-0 border-b-4 mt-4 px-4 py-2 text-sm sm:text-base">Order Now</button>
        </div>
      </div>
    </section>
  );
};

export default Featured;