import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";
import "./layout.css"
import { useState } from "react";

export default function Layout() {
  const [afficheNav, gererAffichage] = useState(false)
  return (
    <div className="layOut">
      <Header affiche={afficheNav} gererNav={() =>{
        gererAffichage(!afficheNav)
      }} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
