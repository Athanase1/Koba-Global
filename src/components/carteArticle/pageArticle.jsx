import { useContext, useEffect, useState } from "react";
import { Produits } from "../../assets/data/produit";
import ProduitCarte from "../produitCarte/produitCarte";
import "./pageArticle.css";
import { useNavigate, useParams } from "react-router-dom";
import { PanierContext } from "../../store/PanierContext";

export default function PageArticle({}) {
  const panierContext = useContext(PanierContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [qte, setQte] = useState(1);
  const [total, setTotal] = useState(0);
  const [transaction, setTransaction] = useState(false);

  // Charger l'article à partir de l'ID
  useEffect(() => {
    const trouve = Produits.find((a) => String(a.id) === String(id));
    if (trouve) {
      setArticle(trouve);
      setQte(trouve.qte || 1);
    }
  }, [id]);

  // Mettre à jour le total quand article ou qte change
  useEffect(() => {
    if (article) {
      setTotal(article.prix * qte);
    }
  }, [article, qte]);

  const handleChange = (e) => {
    const val = Number(e.target.value);
    if (!isNaN(val) && val >= 1 && val <= 100) {
      setQte(val);
    }
  };

  const incrementerQte = () => {
    setQte((prev) => (prev < 99 ? prev + 1 : prev));
  };

  const déincrementerQte = () => {
    setQte((prev) => (prev > 1 ? prev - 1 : prev));
  };
  const ajouterAuPanier = async (p) => {
    setTransaction(true);
    const res = await panierContext.ajouterAuPanier(p);
    setTimeout(() => setTransaction(false), setQte(1), 1000);
  };
  const handleClick = (a) => {
    navigate(`/articles/${a.id}`);
  };

  if (!article) return <div>Chargement...</div>;

  return (
    <div className="PArticle">
      <div className="sectionArticle">
        <div className="articleImg">
          <img src={article.img[0]} alt={article.nom} />
        </div>
        <div className="details">
          <div className="nomEtprix2">
            <h1 id="nom">{article.nom}</h1>
            <h1 id="prix">
              {article.prix}$ / {article.unite}
            </h1>
            <div className="sectionInput">
              <div className="input">
                <i className="bi bi-dash-circle" onClick={déincrementerQte}></i>
                <input value={qte} onChange={handleChange} />
                <i className="bi bi-plus-circle" onClick={incrementerQte}></i>
              </div>
            </div>
          </div>
          <button
            disabled={transaction}
            id="btnAjouterPanier"
            onClick={() => {
              ajouterAuPanier({ ...article, qte });
            }}
          >
            Ajouter au panier ({total.toFixed(2)} $)
          </button>
        </div>
        {panierContext.panierPasVide && (
          <div className="Ptemporaire">
            <div className="div">
              {panierContext.articles.map((p) => (
                <h1 id="pNom" key={p.id}>
                  Nom: {p.nom} qte: {p.qte}
                </h1>
              ))}
            </div>
            <button
              onClick={() => {
                navigate("/panier");
              }}
            >
              voir le panier {panierContext.total.toFixed(2)} $
            </button>
          </div>
        )}
      </div>

      <h1 id="As">Articles similaires</h1>
      <div className="Asimilaire">
        {Produits.filter(
          (p) =>
            String(p.id) !== String(id) && p.categorie === String(p.categorie)
        ).map((p, index) => (
          <ProduitCarte
            key={`produit-${index}`} // fallback au cas où p.id est manquant
            data={p}
            onClick={() => handleClick(p)}
          />
        ))}
      </div>
    </div>
  );
}
