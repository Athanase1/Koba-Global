import "./entete.css";
export default function Entete({ titre, onClick, links, affiche}) {
  return (
    <div className="entete-container" onClick={onClick}>
      <div className="titre-icon">
        <h1>{titre}</h1>
        <i className={affiche ? "bi bi-chevron-down" : "bi bi-chevon-up"}></i>
      </div>
     {affiche && <ul>
      {links.map((li, index) =>(
        <a href={`/${li}`} key={index}>{li}</a>
      ))}
      </ul>}
    </div>
  );
}
