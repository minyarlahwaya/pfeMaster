import Hero from "../components/Hero/Hero";
import TireSearch from "../components/TireSearch/TireSearch";
import Features from "../components/Features/Feature";
import Brands from "../components/Brands/Brands";
import Products from "../components/Products/Products";
import Footer from "../components/Footer/Footer"

function Home() {
  return (
    <>
      <Hero />
      <TireSearch/>
       <Features />
        <Brands />
        <Products/>
        < Footer/>
       
    </>
  );
}

export default Home;