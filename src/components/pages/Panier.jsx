import { useNavigate } from "react-router-dom";
import { Produits } from "../../assets/data/produit";
import ProduitCarte from "../produitCarte/produitCarte";
import "../styles/pagePanier.css";
import { useContext, useEffect, useState } from "react";
import { PanierContext } from "../../store/PanierContext";
import PPanier from "../ProduitPanierCarte/pPanier";
import { validerForm } from "../../service/functionValidations";

export default function Panier() {
  const navigate = useNavigate();
  const panierContext = useContext(PanierContext);

  const [champs, setChamps] = useState({
    nomEpic: "",
    nomRes: "",
    addresse: "",
    tel: "",
    email: "",
  });

  const [erreurs, setErreurs] = useState({});
  const [produits, setProduits] = useState([]);
  const [qte, setQte] = useState();

  const gererChangement = (e) => {
    const { name, value } = e.target;
    setChamps((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConfirmer = () => {
    const erreursTrouvées = validerForm(champs);
    setErreurs(erreursTrouvées);
    if (Object.keys(erreursTrouvées).length === 0) {
      navigate("/confirmation/champs", {state: champs});
    } else {
      alert("Veuillez corriger les erreurs.");
    }
  };

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
    alert("Produit retiré avec succès");
  };
  const incrementerQuantite = (p) => {
    if (!p) return;
    const qte = Number(p.qte) || 0;
    panierContext.modifierQuantite(p.id, qte + 1);
  };

  const decrementerQuantite = (p) => {
    if (!p) return;
    const qte = Number(p.qte) || 0;
    if (qte > 1) {
      panierContext.modifierQuantite(p.id, qte - 1);
    }
  };

  const handleChangeQuantite = (e, produit) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= 100) {
      panierContext.modifierQuantite(produit.id, val);
    }
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
      <h1>Votre panier</h1>
      <div className="sectionCommande">
        <div className="pProduits">
          {produits.map((produit) => (
            <PPanier
              produit={produit}
              key={produit.id}
              qte={produit.qte}
              onClick={() => retirerDuPanier(produit.id)}
              incrementerQte={() => incrementerQuantite(produit)}
              déincrementerQte={() => decrementerQuantite(produit)}
              handleChange={(e) => handleChangeQuantite(e, produit)}
            />
          ))}
         
        </div>
        
        <div className="form">
          <h1 id="h1F">Entrez Vos coordonnées :</h1>
          <div className="InfoClients">
            <div className="form-floating mb-1 col-sm-12">
              <input
                type="text"
                className="form-control "
                name="nomEpic"
                id="epicerie"
                value={champs.nomEpic}
                onChange={gererChangement}
              />
              <label htmlFor="epicerie">
                Nom de votre épicerie : <span>{erreurs.nomEpic}</span>
              </label>
            </div>

            <div className="form-floating mb-1 col-sm-12">
              <input
                type="text"
                className="form-control "
                name="addresse"
                id="addresse"
                value={champs.addresse}
                onChange={gererChangement}
              />
              <label htmlFor="addresse">
                Adresse : <span>{erreurs.addresse}</span>
              </label>
            </div>

            <div className="form-floating mb-1 col-sm-12">
              <input
                type="text"
                className="form-control w-100"
                name="nomRes"
                id="responsable"
                value={champs.nomRes}
                onChange={gererChangement}
              />
              <label htmlFor="responsable">
                Nom du responsable : <span>{erreurs.nomRes}</span>
              </label>
            </div>

            <div className="form-floating mb-1 col-sm-12">
              <input
                type="text"
                className="form-control"
                name="tel"
                id="telephone"
                value={champs.tel}
                onChange={gererChangement}
              />
              <label htmlFor="telephone">
                Numéro de téléphone : <span>{erreurs.tel}</span>
              </label>
            </div>

            <div className="form-floating mb-3 col-sm-12">
              <input
                type="email"
                className="form-control"
                name="email"
                id="email"
                value={champs.email}
                onChange={gererChangement}
              />
              <label htmlFor="email">
                Email : <span>{erreurs.email}</span>
              </label>
            </div>

            <button id="btnCon" onClick={handleConfirmer}>
              Confirmer
            </button>
          </div>
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
