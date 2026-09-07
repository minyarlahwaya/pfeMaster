import "./TireSearch.css";
import { FaSearch } from "react-icons/fa";

function TireSearch() {
  return (
    <section className="tire-search">

      <div className="search-container">

        <h2>
          Trouvez les pneus adaptés à votre véhicule
        </h2>

        <p>
          Recherchez facilement vos pneus par marque,
          dimension et type de véhicule.
        </p>


        <div className="search-box">

          <select>
            <option>Choisir la marque</option>
            <option>Michelin</option>
            <option>Continental</option>
            <option>Bridgestone</option>
          </select>


          <select>
            <option>Dimension</option>
            <option>205/55 R16</option>
            <option>195/65 R15</option>
            <option>225/45 R17</option>
          </select>


          <select>
            <option>Saison</option>
            <option>Été</option>
            <option>Hiver</option>
            <option>4 saisons</option>
          </select>


          <button>
            <FaSearch />
            Rechercher
          </button>

        </div>

      </div>

    </section>
  );
}

export default TireSearch;