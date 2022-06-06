    // async function getPhotographers() {
    //     // Penser à remplacer par les données récupérées dans le json

    //    // let mimiKeel = JSON.parse(photographers[1]);
       
    //     const photographers = [
    //         {
    //             "name": "Ma data test",
    //             "id": 1,
    //             "city": "Paris",
    //             "country": "France",
    //             "tagline": "Ceci est ma data test",
    //             "price": 400,
    //             "portrait": "account.png"
    //         },
    //         {
    //             "name": "Autre data test",
    //             "id": 2,
    //             "city": "Londres",
    //             "country": "UK",
    //             "tagline": "Ceci est ma data test 2",
    //             "price": 500,
    //             "portrait": "account.png"
    //         },
    //     ]
    //     // et bien retourner le tableau photographers seulement une fois
    //     return ({
    //         photographers: [...photographers, ...photographers, ...photographers]})
    // }

    // async function displayData(photographers) {
    //     const photographersSection = document.querySelector(".photographer_section");

    //     photographers.forEach((photographer) => {
    //         const photographerModel = photographerFactory(photographer);
    //         const userCardDOM = photographerModel.getUserCardDOM();
    //         photographersSection.appendChild(userCardDOM);
    //     });
    // };

    // async function init() {
    //     // Récupère les datas des photographes
    //     const { photographers } = await getPhotographers();
    //     displayData(photographers);
    // };
    
    // init();
    
import {photographersList} from "../../data/dataManager.js";
import CardImage from "../components/CardImage.js";

function showIndex(){
    const target = document.querySelector(".photographer_section");
    photographersList().forEach((photographe)=>{
        new CardImage(target, photographe)
    })
}

window.onload = showIndex;



/****************************??????????????????????????????????******************** */
/*function showIndex(){
    data.photographers.forEach((photographe)=>{
        new CardImage($section, photographe.name,photographe)
    })
}*/
/******************???????????????????????***************************** */
/*const $section = document.getElementsByClassName("photographer_section")[0];
const articles = document.getElementsByClassName("test");
Array.from(articles).forEach((elem) => {elem.appendChild($section)})*/