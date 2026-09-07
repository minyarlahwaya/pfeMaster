import "./Hero.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <h1>
          Des pneus de qualité
          <span> pour votre véhicule</span>
        </h1>

        <p>
          Découvrez notre large gamme de pneus automobiles
          des meilleures marques au meilleur prix.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary">
            Acheter maintenant
          </button>

          <button className="btn-secondary">
            Voir les marques
          </button>
        </div>

      </div>

    </section>
  );
}

export default Hero;