import { useNavigate } from "react-router-dom";
import { Produits } from "../../assets/data/produit";
import ProduitCarte from "../produitCarte/produitCarte";
import "../styles/styles.css";
export default function Home() {
    const navigate = useNavigate()
    const handleClick = (a) =>{
      navigate(`/articles/${a.id}`)
    }
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
          <b>
            <a className="a" href="">
              Nous contacter.
            </a>
          </b>
        </p>
      </div>

      <div className="section-produits">
        <div className="entete">
          <h1 id="nPd">Nos produits principaux</h1>
          <h1 onClick={() =>{
            navigate("/produits")
          }}>
           Tous <i className="bi bi-plus"></i>
          </h1>
        </div>
        <div className="produits-container">
          {Produits.map((p) => (
            <ProduitCarte data={p} key={p.id} onClick={() =>{
              handleClick(p)
            }} value={2}/>
          ))}
        </div>
      </div>
    </div>
  );
}
