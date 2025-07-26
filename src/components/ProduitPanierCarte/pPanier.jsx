import { useContext } from "react";
import "./pPanier.css";
import { PanierContext } from "../../store/PanierContext";
export default function ({ produit, total, onClick }) {
  const panierContext = useContext(PanierContext);
  return (
    <div className="PPanier">
      <h1 id="pNomProduit">{produit.nom}</h1>
      <div className="sectionqte">
        <i
          className="bi bi-dash-circle"
          onClick={() =>
            produit.qte > 1 &&
            panierContext.modifierQuantite(produit.id, produit.qte - 1)
          }
        ></i>
        <input
          type="number"
          value={produit.qte}
          min="1"
          max="100"
          onChange={(e) => {
            const val = Number(e.target.value);
            if (!isNaN(val) && val >= 1 && val <= 100) {
              panierContext.modifierQuantite(produit.id, val);
            }
          }}
        />
        <i
          className="bi bi-plus-circle"
          onClick={() =>
            produit.qte < 99 &&
            panierContext.modifierQuantite(produit.id, produit.qte + 1)
          }
        ></i>
      </div>
      <div className="total">
        <h1 id="total">Total</h1>
        <h1>{total}$</h1>
      </div>
      <button id="btnRetrait" onClick={onClick}>retirer du panier</button>
    </div>
  );
}
