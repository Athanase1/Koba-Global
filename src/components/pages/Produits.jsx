import "../styles/styles.css";
import "../styles/produitsPage.css";

import ProduitCarte from "../produitCarte/produitCarte";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Produit({ champCategore, produitsliste }) {
  const navigate = useNavigate();
  const [filtres, setFiltre] = useState({
    prixMin: "26",
    prixMax: "1000",
    categorie: "poisson",
  });
  const [produits, setProduits] = useState([]);
  const [afficheFiltre, setAfficheFiltre] = useState(false);
  useEffect(() => {
    if (produitsliste) {
      setProduits(produitsliste);
    }
  }, [produitsliste]); // ← écouter les changements ici

  const handleClick = (a) => {
    navigate(`/articles/${a.id}`);
  };

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setFiltre((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filtrerProduit = () => {
    let minPrix = parseFloat(filtres.prixMin);
    let maxPrix = parseFloat(filtres.prixMax);

    // Valeurs par défaut si les champs sont vides ou invalides
    if (isNaN(minPrix)) minPrix = 0;
    if (isNaN(maxPrix)) maxPrix = Infinity;

    const resultat = produits.filter((produit) => {
      const estDansRangePrix =
        produit.prix >= minPrix && produit.prix <= maxPrix;

      const correspondCategorie =
        !filtres.categorie ||
        produit.categorie
          .toLowerCase()
          .includes(filtres.categorie.toLowerCase());

      return estDansRangePrix && correspondCategorie;
    });

    setProduits(resultat);
    setAfficheFiltre(!afficheFiltre)
  };
  return (
    <div className="PPageContainer">
      
      <div className="categorie">
        {produits.length > 0 ? (
          <div className="produits">
            {produits.map((p) => (
              <ProduitCarte
                data={p}
                key={p.id}
                onClick={() => handleClick(p)}
              />
            ))}
          </div>
        ) : (
          <h1 id="h1Warning">Ces produits ne sont pas disponibles pour le momment.</h1>
        )}
      </div>
    </div>
  );
}
