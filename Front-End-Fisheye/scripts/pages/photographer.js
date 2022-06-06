/* eslint-disable no-prototype-builtins */
// Code JavaScript lié à la page photographer.html

import {
    getMediaByPhotographerId,
    getPhotographerById,
    sort
} from "../../data/dataManager.js";
import PhotographeHeader from "../components/PhotographeHeader.js";
import CardMedia from "../components/CardMedia.js";
import CardVideo from "../components/CardVideo.js";
import Lightbox from "../components/Lightbox.js";
import FormModal from "../components/FormModal.js";
import LikesInsert from "../components/LikesInsert.js";
import SortInsert from "../components/SortInsert.js";

const idPhotographer = parseInt(window.location.search.slice(1));
const DOMphotographerInfo = document.getElementById("mainPhotographer");

//afficher header page photographe 
new LikesInsert(document.body, getPhotographerById(idPhotographer));
new PhotographeHeader(DOMphotographerInfo, getPhotographerById(idPhotographer));

// afficher nombre total de likes
var mediaList = [];
const photographerMedia = sort("popularity", getMediaByPhotographerId(idPhotographer));
photographerMedia.forEach(elm => {
    mediaList.push((elm.likes));
});

let sumLikes = 0;
for (let i = 0; i < mediaList.length; i++) {
    sumLikes += mediaList[i];
}

const dataInsert = document.getElementById("update");
dataInsert.innerHTML = "<p>" + sumLikes + "</p>";

function update(liked) {
    sumLikes += liked? 1 : -1 ;
    dataInsert.innerHTML = "<p>" + sumLikes + "</p>";
}


//afficher encart trie
new SortInsert(DOMphotographerInfo, mediaList);
const mediaContainer = document.createElement("div");
mediaContainer.className="mediaContainer";
DOMphotographerInfo.appendChild(mediaContainer);



new Lightbox();
new FormModal(idPhotographer);


//afficher image ou video page photographe

function showMediaFactory() {
    //const target = document.getElementById("mainPhotographer");
//    console.log(getMediaByPhotographerId(idPhotographer)) 
    for (const media of photographerMedia) {
        if (media.hasOwnProperty("image")) {
            new CardMedia(mediaContainer, media, update);
        }
        else {
            new CardVideo(mediaContainer, media, update);
        }
    }

}
window.onload = showMediaFactory;





