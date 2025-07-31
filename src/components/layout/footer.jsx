import { useNavigate } from "react-router-dom";
import "./footer.css";
import { useState } from "react";
import { validerEmail } from "../../service/functionValidations";
export default function Footer({}) {
  const currentYear = new Date().getFullYear();
  const [afficheLink, setAffiche] = useState(true);
  const navigate = useNavigate();
  const handleNav = (cat) => {
    navigate(`/produits/${cat}`);
  };
  const [value, setValue] = useState("");
  const [erreur, setErreur] = useState()
  const handleSubmit = () => {
    if(!validerEmail(value)){
          setErreur("email invalide")
       
            return;
    }
    alert(`${value} est inscrit avec succès !`);
    setValue(""); // pour réinitialiser le chams!`)
    setErreur("")
  };
 
  return (
    <footer>
      <div id="footer">
        <div className="info-lettreContainer">
          <h1>incrivez-vous à nos infolettres:</h1>
          <div className="info-input">
            <label id="elabel" htmlFor="email">{erreur}</label>
            <input
              type="text"
              name="email"
              id=""
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleSubmit}>Envoyez</button>
          </div>
        </div>
        <div id="contact">
          <h1 id="h1C">Contactez-nous:</h1>
          <a href="mailto:Distributionskobaglobainc@gmail.com">
            Email: Distributionskobaglobainc@gmail.com
          </a>
          <a href="tel:+1 581-578-4549">Tel: +1 581-578-4549</a>
        </div>
        <div className="linksContainer">
          <div className="link-header" onClick={() => setAffiche(!afficheLink)}>
            <h1>Liens importants</h1>
            <i
              className={
                afficheLink ? "bi bi-chevron-up" : "bi bi-chevron-down"
              }
            ></i>
          </div>
          <ul id="Ful" className={afficheLink ? "" : "hide"}>
            <li onClick={() => navigate("/")}>home</li>
            <li onClick={() => handleNav("poisson")}>poissons</li>
            <li onClick={() => handleNav("légumes")}>légumes</li>
            <li onClick={() => handleNav("condiment")}>condiments</li>
            <li onClick={() => handleNav("autres")}>autres</li>
          </ul>
        </div>
      </div>
      <p className="copy">
        Koba-Global Inc. &copy; {currentYear} — Tous droits réservés
      </p>
    </footer>
  );
}
