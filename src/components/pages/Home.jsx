import { useNavigate } from "react-router-dom";
import { Produits } from "../../assets/data/produit";
import "../styles/styles.css";
import Produit from "./Produits";
import Logo from "../../assets/images/Smash/Logo.png"
import { useState } from "react";
export default function Home() {
    const navigate = useNavigate()
    const [afficheContact, setContact] = useState(false)
  return (
    <div className="container">
      <div className="intro">
        <p className="">
          <strong>DISTRIBUTIONS KOBA GLOBAL INC.</strong>
          est une entreprise spécialisée dans la distribution en gros de
          produits alimentaires authentiques importés d’Afrique. Nos produits
          proviennent principalement de la Tanzanie, notamment de la région du
          lac Tanganyika, réputée pour la richesse et la qualité de ses
          ressources. Nous desservons les épiceries africaines partout au Québec
          et en Ontario.{" "}
          <b onClick={() =>{
            setContact(!afficheContact)
          }}>
              Nous contacter.
          </b>
        </p>
       {afficheContact && <div className="contact">

          <h1>Tel: 581-578-4549</h1>
          <h1>Email: Distributionskobaglobainc@gmail.com</h1>
            <div className="logo">
                  <img
                    onClick={() => {
                      navigate("/");
                    }}
                    id="Logo"
                    src={Logo}
                    alt="Logo de distribuctions kobal global"
                  />
                </div>
        </div>}
      </div>
        <h1>Nos produits principaux</h1>
      <div className="section-produits">
      <Produit champCategore={true} produitsliste={Produits}/>
      </div>
    </div>
  );
}
