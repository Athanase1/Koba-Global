import "./Produit-carte.css";
export default function ProduitCarte({ onClick, data}) {
  return (
    <div className="pcarte" onClick={onClick}>
      <div className="pImage">
        <img src={data.img[0]} alt={data.nom} />
      </div>
      <div className="carteCorps">
        <div className="nomEtprix">
          <h1>{data.nom}</h1>
        </div>
        <button onClick={onClick}>Commander</button>
      </div>
    </div>
  );
}
