import "./Products.css";
import ProductCard from "./ProductCard";
import pneu1 from "../../assets/images/pneu1.png";


function Products() {

  const products = [
    {
      id: 1,
      name: "Michelin Primacy 4",
      dimension: "205/55 R16",
      price: 250,
      image: pneu1
    },

    {
      id: 2,
      name: "Continental PremiumContact",
      dimension: "195/65 R15",
      price: 220,
      image: pneu1
    },

    {
      id: 3,
      name: "Bridgestone Turanza",
      dimension: "225/45 R17",
      price: 300,
      image: pneu1
    }
  ];


  return (

    <section className="products">

      <h2>
        Nos pneus populaires
      </h2>


      <div className="products-container">

        {products.map((product)=>(
          <ProductCard 
            key={product.id}
            product={product}
          />
        ))}

      </div>

    </section>

  );
}


export default Products;