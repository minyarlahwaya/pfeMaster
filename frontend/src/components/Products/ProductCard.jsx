import "./Products.css";

function ProductCard({ product }) {

  return (
    <div className="product-card">

      <img 
        src={product.image} 
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p className="dimension">
        {product.dimension}
      </p>

      <div className="rating">
        ⭐⭐⭐⭐⭐
      </div>

      <h4>
        {product.price} DT
      </h4>

      <button>
        Ajouter au panier
      </button>

    </div>
  );
}

export default ProductCard;