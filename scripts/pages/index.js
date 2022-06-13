import {photographersList} from "../../data/dataManager.js";
import CardImage from "../components/CardImage.js";

function showIndex(){
    const target = document.querySelector(".photographer_section");
    photographersList().forEach((photographe)=>{
        new CardImage(target, photographe);
    });
}

window.onload = showIndex;



