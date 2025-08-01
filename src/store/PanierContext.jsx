import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PanierContext = createContext({
  panierPasVide: false,
  articles: [],
  ajouterAuPanier: () => {},
  retirerDuPanier: () => {},
  viderPanier: () => {},
  envoyerCommande: () => {},
  total: 0
});

export default function PanierProvider({ children }) {
  const [articles, setArticles] = useState(() => {
    const saved = localStorage.getItem("panier");
    return saved ? JSON.parse(saved) : [];
  });

  // Met à jour le localStorage dès que le panier change
  useEffect(() => {
    localStorage.setItem("panier", JSON.stringify(articles));
  }, [articles]);

 const ajouterAuPanier = (nouvelArticle) => {
  const quantiteAjoutee = nouvelArticle.qte || 1; // valeur par défaut = 1
  setArticles((prev) => {
    const existant = prev.find((a) => a.id === nouvelArticle.id);
    if (existant) {
      return prev.map((a) =>
        a.id === nouvelArticle.id
          ? { ...a, qte: a.qte + quantiteAjoutee }
          : a
      );
    } else {
      return [...prev, { ...nouvelArticle, qte: quantiteAjoutee }];
    }
  });
};


  const retirerDuPanier = (id) => {
    setArticles((prev) =>
      prev
        .map((a) =>
          a.id === id ? { ...a, qte: a.qte - 1 } : a
        )
        .filter((a) => a.qte > 0)
    );
  };
  const modifierQuantite = (id, qte) => {
  const updated = articles.map((article) =>
    article.id === id ? { ...article, qte } : article
  );
  setArticles(updated);
  localStorage.setItem("panier", JSON.stringify(updated));
};

  const viderPanier = () => {
    setArticles([]);
  };
  const envoyerCommande = async (infosClient, produits, total) =>{
    try {
      const res = await axios.post("https://koba-global-backend.onrender.com/commande",
       //const res = await axios.post("http://localhost:5000/commande",
        {infosClient,produits,total},
        { headers: { "Content-Type": "application/json" } }
      )
      const message = res?.data?.message
      return {success: true, message};
    } catch (error) {
      const message = error?.response?.data?.message || "Information invalide";
      return {success:false, message}
    }
  }

  const total = articles.reduce((somme, a) => somme + a.qte * a.prix, 0);

  const value = {
    panierPasVide: articles.length > 0,
    articles,
    ajouterAuPanier,
    retirerDuPanier,
    viderPanier,
    modifierQuantite,
    envoyerCommande,
    total,
  };

  return (
    <PanierContext.Provider value={value}>
      {children}
    </PanierContext.Provider>
  );
}
