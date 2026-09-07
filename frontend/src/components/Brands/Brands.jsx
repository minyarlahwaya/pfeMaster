import "./Brands.css";

import michelin from "../../assets/images/Michelin.png"
import continental from "../../assets/images/continental.png";
import bridgestone from "../../assets/images/bridgestone.png";
import goodyear from "../../assets/images/goodyear.png";
import pirelli from "../../assets/images/pirelli.png";
import hankook from "../../assets/images/hankook.png";


function Brands() {

  const brands = [
    michelin,
    continental,
    bridgestone,
    goodyear,
    pirelli,
    hankook
  ];


  return (
    <section className="brands">

      <h1>
        Les meilleures marques aux meilleurs prix
      </h1>


      <div className="brands-container">

        {brands.map((brand, index) => (
          <div className="brand-card" key={index}>
            <img 
              src={brand} 
              alt="Marque pneu"
            />
          </div>
        ))}

      </div>

    </section>
  );
}


export default Brands;