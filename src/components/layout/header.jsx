import { Link, useNavigate } from "react-router-dom";


export default function Header({gererNav, affiche}) {
  const navigate = useNavigate()
  return (
    <header>
      <div className="logo">
        <h1 onClick={() =>{
          navigate("/")
        }}>
          {" "}
         Distributions Koba Global <span>Inc</span>
        </h1>
        <div className="bis">
          <i className="bi bi-search" ></i>
          <i className="bi bi-basket"></i>
          <i className="bi bi-list" onClick={gererNav}></i>
        </div>
      </div>
      <nav className={affiche ? "nav" :"cache"}>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
           <li>
            <Link to="/produits" >Produits</Link>
          </li>
          <li>
            <Link to="/panier">Panier</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
