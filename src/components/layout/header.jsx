import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import Logo from "../../assets/images/Smash/Logo.png";
import { useContext } from "react";
import { PanierContext } from "../../store/PanierContext";
export default function Header({ gererNav, affiche }) {
  const navigate = useNavigate();
  const handleNav = (cat) => {
    navigate(`/produits/${cat}`);
  };
  const panierContext = useContext(PanierContext)
  return (
    <header>
      <div className="header">
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
        <nav className="nav1">
          <ul>
            <li onClick={gererNav}>
              <Link to="/">Accueil</Link>
            </li>
            <li
              onClick={() => {
                gererNav(), handleNav("poisson");
              }}
            >
              <Link>Poissons</Link>
            </li>
            <li
              onClick={() => {
                gererNav(), handleNav("légume");
              }}
            >
              <Link>Légumes</Link>
            </li>
            <li
              onClick={() => {
                gererNav(), handleNav("condiments");
              }}
            >
              <Link>Condiments</Link>
            </li>
            <li
              onClick={() => {
                gererNav(), handleNav("autres");
              }}
            >
              <Link>Autres</Link>
            </li>
          </ul>
        </nav>
        <div className="bis">
          <i className="bi bi-search"></i>
          <div className="panier">
            <i
              className="bi bi-basket"
              onClick={() => {
                navigate("/panier");
              }}
            ></i>
            { panierContext.panierPasVide  && <h6 id="chiffrePanier">{panierContext.articles.length}</h6>}
          </div>

          <i
            className={affiche ? "bi bi-x" : "bi bi-list"}
            onClick={gererNav}
            id="biL"
          ></i>
        </div>
      </div>

      <nav className={affiche ? "nav" : "cache"}>
        <ul>
          <li onClick={gererNav}>
            <Link to="/">Accueil</Link>
          </li>
          <li
            onClick={() => {
              gererNav(), handleNav("poisson");
            }}
          >
            <Link>Poissons</Link>
          </li>
          <li
            onClick={() => {
              gererNav(), handleNav("légume");
            }}
          >
            <Link>Légumes</Link>
          </li>
          <li
            onClick={() => {
              gererNav(), handleNav("condiments");
            }}
          >
            <Link>Condiments</Link>
          </li>
          <li
            onClick={() => {
              gererNav(), handleNav("autres");
            }}
          >
            <Link>Autres</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
