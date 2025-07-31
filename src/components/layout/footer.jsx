export default function Footer({ afficheLink }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div id="footer">
         <div id="contact">
            <h1 id="h1C">Contactez-nous:</h1>
            <a href="mailto:Distributionskobaglobainc@gmail.com">
              Email: Distributionskobaglobainc@gmail.com
            </a>
            <a href="tel:+581-578-4549">Tel: +1 581-578-4549</a>
          </div>
        <div className="linksContainer">
          <div className="link-header">
            <h1>Liens importants</h1>
            <i
              className={
                afficheLink ? "bi bi-chevron-up" : "bi bi-chevron-down"
              }
            ></i>
          </div>
          <ul id="Ful">
            <li>home</li>
            <li>poissons</li>
            <li>légumes</li>
            <li>condiments</li>
            <li>autres</li>
          </ul>
        </div> 
      </div>
      <p className="copy">
        Koba-Global Inc. &copy; {currentYear} — Tous droits réservés
      </p>
    </footer>
  );
}
