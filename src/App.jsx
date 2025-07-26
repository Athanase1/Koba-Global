import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Panier from "./components/pages/Panier";
import Produit from "./components/pages/Produits";
import Layout from "./components/layout/layout";
import PageArticle from "./components/carteArticle/pageArticle";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<Home/>} />
          <Route path="/panier" element={<Panier/> } />
          <Route path="/produits" element={<Produit/>} />
          <Route path="/articles/:id" element={<PageArticle/>}/>
        </Route>
      </Routes>
     </Router>
  )
}

export default App
