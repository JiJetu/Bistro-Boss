import { Helmet } from "react-helmet-async";
import AboutBistro from "../AboutBistro/AboutBistro";
import Banner from "../Banner/Banner";
import CallUs from "../CallUs/CallUs";
import Category from "../Category/Category";
import Featured from "../Featured/Featured";
import PopularMenu from "../PopularMenu/PopularMenu";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      {/* set helmet for dynamic title */}
      <Helmet>
        <title>Bistro Boss</title>
      </Helmet>

      <Banner></Banner>
      <Category></Category>
      <AboutBistro></AboutBistro>
      <PopularMenu></PopularMenu>
      <CallUs></CallUs>
      <Featured></Featured>
      <Testimonials></Testimonials>
    </div>
  );
};

export default Home;