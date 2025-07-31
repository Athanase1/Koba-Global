import { useEffect, useState } from "react";
import { Produits } from "../../assets/data/produit";
import Produit from "./Produits";
import { useParams } from "react-router-dom";


export default function ProduitsPage(){
    const {cat} = useParams()

    const [produits, setProduits] = useState([])
    useEffect(() =>{
        setProduits(Produits.filter((p) => p.categorie === String(cat)))
    },[cat])
    return(
        <div className="container">
            <Produit produitsliste={produits}/>
        </div>
    )
}