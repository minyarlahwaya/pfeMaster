import "./Footer.css";

import {
  FaFacebookF,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaLocationDot
} from "react-icons/fa6";


function Footer() {

  return (

    <footer className="footer">

      <div className="footer-container">


        {/* Description entreprise */}
        <div className="footer-box">

          <h2>
            Landolsi <span>Motors</span>
          </h2>

          <p>
            Votre spécialiste de la vente de pneus automobiles en ligne.
            Découvrez une large gamme de pneus de grandes marques
            adaptés à votre véhicule.
          </p>

        </div>



        {/* Navigation */}
        <div className="footer-box">

          <h3>Navigation</h3>

          <ul>
            <li>Accueil</li>
            <li>Produits</li>
            <li>Marques</li>
            <li>Contact</li>
          </ul>

        </div>



        {/* Marques pneus */}
        <div className="footer-box">

          <h3>Marques pneus</h3>

          <ul>
            <li>Michelin</li>
            <li>Continental</li>
            <li>Bridgestone</li>
            <li>Pirelli</li>
            <li>Dunlop</li>
          </ul>

        </div>



        {/* Contact */}
        <div className="footer-box">

          <h3>Contact</h3>


          <p>
            <FaPhone />
            +216 XX XXX XXX
          </p>


          <p>
            <FaEnvelope />
            contact@landolsi.com
          </p>


          <p>
            <FaLocationDot />
            Msaken
          </p>



          <div className="social-icons">

            <FaFacebookF />

            <FaInstagram />

          </div>


        </div>


      </div>




      <div className="footer-bottom">

        <p>
          © 2026 Landolsi Motors - Tous droits réservés
        </p>


        <p>
          Mentions légales | Politique de confidentialité
        </p>

      </div>


    </footer>

  );

}


export default Footer;