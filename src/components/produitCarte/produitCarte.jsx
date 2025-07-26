import "./Produit-carte.css";
export default function ProduitCarte({ onClick, data}) {
  return (
    <div className="pcarte" onClick={onClick}>
      <img src={data.img[0]} alt={data.nom} />
      <div className="carteCorps">
        <div className="nomEtprix">
          <h1 id="nom">{data.nom}</h1>
          <h1 id="prix">{`${data.prix}$/${data.unite}`}</h1>
        </div>
        <button onClick={onClick}>Commander</button>
      </div>
    </div>
  );
}
