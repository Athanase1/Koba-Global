import "../styles/styles.css";
import "../styles/produitsPage.css";
import { Produits } from "../../assets/data/produit";
import ProduitCarte from "../produitCarte/produitCarte";
import { useEffect, useRef, useState } from "react";
import CarteArticle from "../carteArticle/pageArticle";
import { useNavigate } from "react-router-dom";

export default function Produit() {
  const navigate = useNavigate();
  const [categorie, setCategorie] = useState("tous");
  const refs = {
    tous: useRef(null),
    poisson: useRef(null),
    condiment: useRef(null),
    legume: useRef(null),
    autres: useRef(null),
  };

  // Scroll manuel
  const scrollToCategorie = (cat) => {
    refs[cat]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Observer pour changer la catégorie selon la visibilité
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          const id = visible.target.getAttribute("data-categorie");
          setCategorie(id);
        }
      },
      {
        threshold: 0.5, // 50% visible
      }
    );

    Object.entries(refs).forEach(([key, ref]) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);
  const handleClick = (a) => {
    navigate(`/articles/${a.id}`);
  };

  return (
    <div className="container">
      <div className="categories">
        {["tous", "poisson", "condiment", "legume", "autres"].map((cat) => (
          <button
            key={cat}
            onClick={() => scrollToCategorie(cat)}
            className={categorie === cat ? "selectionné" : ""}
          >
            {cat === "legume"
              ? "Légume sèches"
              : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div className="categorie">
        <h1 ref={refs.tous} data-categorie="tous">
          Tous
        </h1>
        <div className="produits">
          {Produits.filter((p) => p.id < 4).map((p) => (
            <ProduitCarte
              data={p}
              key={p.id}
              onClick={() => {
                handleClick(p)
              }}
            />
          ))}
        </div>

        <h1 ref={refs.poisson} data-categorie="poisson">
          Poissons
        </h1>
        <div className="produits">
          {Produits.filter((p) => p.categorie === "poisson").map((p) => (
            <ProduitCarte
              data={p}
              key={p.id}
              onClick={() => {
                handleClick(p);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
