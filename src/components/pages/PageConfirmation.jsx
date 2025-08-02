import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PanierContext } from "../../store/PanierContext";
import "../styles/pageConfirmation.css";
import LoadingScreen from "../Loading/LoadingScreen";
export default function PageConfirmation() {
  const location = useLocation();
  const [champs, setChamps] = useState(location.state);
  const panierContext = useContext(PanierContext);
  const [produits, setProduits] = useState(panierContext.articles);
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();
  const envoyerCommande = async () => {
    setChargement(true);
    const res = panierContext.envoyerCommande(
      champs,
      panierContext.articles,
      panierContext.total
    );
    setTimeout(() => setChargement(false), 1000);
    if (res.success) {
      alert(
        "Commande envoyée avec succèss vous. Un email de confirmation vous a été envoyé"
      );
      panierContext.viderPanier();
      navigate("/");
    }
  };
  if (chargement) {
    return <LoadingScreen />;
  }
  return (
    <div className="container">
      <h1>Details de la commande:</h1>
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Prix unitaire ($)</th>
          </tr>
        </thead>
        <tbody>
          {produits.map((produit, index) => (
            <tr key={index}>
              <td>{produit.nom}</td>
              <td>{produit.qte}</td>
              <td>{produit.prix.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="montant">
        <h1>Sous-Total:</h1>
        <h1>{panierContext.total.toFixed(2)}$</h1>
      </div>
      <div className="info-contact">
        <h1>Contact:</h1>
        <h1>
          Nom d'épicerie: <span>{champs.nomEpic}</span>{" "}
        </h1>
        <h1>
          Nom du responsable: <span>{champs.nomRes}</span>{" "}
        </h1>
        <h1>
          addresse: <span>{champs.addresse}</span>
        </h1>
        <h1>
          Email: <span>{champs.email}</span>
        </h1>
        <h1>
          Numéro de telephone: <span>{champs.tel}</span>{" "}
        </h1>
      </div>
      <div className="btns">
        <button onClick={() => navigate("/panier")}>Retour au panier</button>
        <button onClick={envoyerCommande}>
          Envoyer la commande à Distributions kobal Global
        </button>
      </div>
    </div>
  );
}
