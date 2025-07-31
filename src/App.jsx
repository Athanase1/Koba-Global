import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Panier from "./components/pages/Panier";

import Layout from "./components/layout/layout";
import PageArticle from "./components/carteArticle/pageArticle";
import ProduitsPage from "./components/pages/ProduitsPage";


function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<Home/>} />
          <Route path="/panier" element={<Panier/> } />
          <Route path="/produits/:cat" element={<ProduitsPage/>}/>
          <Route path="/articles/:id" element={<PageArticle/>}/>
        </Route>
      </Routes>
     </Router>
  )
}

export default App
