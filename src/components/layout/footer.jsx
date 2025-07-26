export default function Footer() {
     const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="copy">
        Koba-Global Inc. &copy; {currentYear} — Tous droits réservés
      </p>
    </footer>
  );
}
