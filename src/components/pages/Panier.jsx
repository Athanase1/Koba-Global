import { useNavigate } from "react-router-dom";
import { Produits } from "../../assets/data/produit";
import ProduitCarte from "../produitCarte/produitCarte";
import "../styles/pagePanier.css";
import { useContext, useEffect, useState } from "react";
import { PanierContext } from "../../store/PanierContext";
import PPanier from "../ProduitPanierCarte/pPanier";

export default function Panier() {
  const navigate = useNavigate();
  const panierContext = useContext(PanierContext);

  const [produits, setProduits] = useState([]);

  useEffect(() => {
    if (panierContext.articles) {
      setProduits(panierContext.articles);
    }
  }, [panierContext.articles]);

  const totalProduit = (produit) => {
    return produit.prix * (produit.qte || 1);
  };

  const allerPageArticle = (p) => {
    navigate(`/articles/${p.id}`);
  };

  const viderPanier = async () => {
    await panierContext.viderPanier();
    alert("Panier vidé avec succès");
    navigate("/");
  };
  const retirerDuPanier = async (id) => {
    await panierContext.retirerDuPanier(id);
    alert("Produit rétirer avec succèss");
  };

  if (!panierContext.panierPasVide) {
    return (
      <div className="panierVide">
        <h1>Votre panier est vide !</h1>
        <button onClick={() => navigate("/")}>Magasiner un produit</button>
      </div>
    );
  }

  return (
    <div className="PanierContainer">
      <div className="pProduits">
        {produits.map((produit) => (
          <PPanier
            produit={produit}
            key={produit.id}
            total={totalProduit(produit).toFixed(2)}
            onClick={() => {
              retirerDuPanier(produit.id);
            }}
          />
        ))}
      </div>
      <div className="divTotal">
        <h1>Sous-Total:</h1>
        <h1>{panierContext.total}$</h1>
      </div>
      <button onClick={viderPanier} id="btnViderPanier">
        Vider le panier
      </button>

      <h1>Entrez Vos coordonnées :</h1>
      <div className="InfoClients">
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="epicerie" />
          <label htmlFor="epicerie">Nom de votre épicerie :</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="adresse" />
          <label htmlFor="adresse">Adresse :</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="responsable" />
          <label htmlFor="responsable">Nom du responsable :</label>
        </div>
        <div className="form-floating mb-3">
          <input type="text" className="form-control" id="telephone" />
          <label htmlFor="telephone">Numéro de téléphone :</label>
        </div>
        <div className="form-floating mb-3">
          <input type="email" className="form-control" id="email" />
          <label htmlFor="email">Email :</label>
        </div>
      </div>

      <h1>Ajouter d'autres produits</h1>
      <div className="PlusdeProduits">
        {Produits.map((p) => (
          <ProduitCarte
            data={p}
            onClick={() => allerPageArticle(p)}
            key={p.id}
          />
        ))}
      </div>
    </div>
  );
}
