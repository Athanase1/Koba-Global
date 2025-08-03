import "./pPanier.css";
export default function PPanier({
  produit,
  onClick,
  déincrementerQte,
  incrementerQte,
  handleChange,
  qte,
}) {
  return (
    <div className="PPanier">
      <div className="ppimage">
        <img
          className=""
          src={`images/${produit.id}.png`}
          alt={`Produit ${produit.id}`}
        />
      </div>

      <div className="ppanier-info">
        <div className="NometButton">
          <h2>{produit.nom}</h2>
           <div className="ppanier-qte">
          <i className="bi bi-dash-circle" onClick={déincrementerQte}></i>
          <input type="number" value={qte} onChange={handleChange} />
          <i className="bi bi-plus-circle" onClick={incrementerQte}></i>
        </div>
        </div>
        <button className="ppanier-remove" onClick={onClick}>
          Retirer
        </button>
      </div>
    </div>
  );
}
