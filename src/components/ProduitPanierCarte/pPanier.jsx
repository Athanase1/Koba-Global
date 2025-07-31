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
        <h2>{produit.nom}</h2>

        <div className="ppanier-qte">
          <i className="bi bi-dash-circle" onClick={déincrementerQte}></i>
          <input type="number" value={qte} onChange={handleChange} />
          <i className="bi bi-plus-circle" onClick={incrementerQte}></i>
        </div>

        <p className="ppanier-total">{produit.prix}$</p>

        <button className="ppanier-remove" onClick={onClick}>
          Retirer
        </button>
      </div>
    </div>
  );
}
