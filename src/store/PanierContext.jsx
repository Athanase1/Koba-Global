import { createContext, useEffect, useState } from "react";

export const PanierContext = createContext({
  panierPasVide: false,
  articles: [],
  ajouterAuPanier: () => {},
  retirerDuPanier: () => {},
  viderPanier: () => {},
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

  const viderPanier = () => {
    setArticles([]);
  };

  const total = articles.reduce((somme, a) => somme + a.qte * a.prix, 0);

  const value = {
    panierPasVide: articles.length > 0,
    articles,
    ajouterAuPanier,
    retirerDuPanier,
    viderPanier,
    total,
  };

  return (
    <PanierContext.Provider value={value}>
      {children}
    </PanierContext.Provider>
  );
}
