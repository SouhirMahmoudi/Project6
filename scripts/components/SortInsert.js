/* eslint-disable no-prototype-builtins */
import CardMedia from "../components/CardMedia.js";
import CardVideo from "../components/CardVideo.js";
import {
    getMediaByPhotographerId,
    sort as sortFromDataManager
} from "../../data/dataManager.js";
import Component from "../factories/Component.js";

export default class SortInsert extends Component {

    /**
       * 
       * @param {HTMLElment} DOMtarget 
       * 
       */
    constructor(DOMtarget, medialist) {
        super(DOMtarget, "SortInsert", "div");
        this.DOM.className = "sort";
        this.medialist = medialist;
    }


    render() {
        this.DOM.innerHTML = `
        <p tabindex="0" class="trier">Trier par</p>
        <button id="btnFirst" aria-label="trier par popularité" value="popularity" onclick="${this.component_id}.myFunction();${this.component_id}.sort(this)"><i id="fas" class="fas fa-chevron-down"></i>Popularité</button>
        
              <div class="Dropdown" id="dropdown">
              <button id="btnDate" aria-label="trier par date" value="date" onclick="${this.component_id}.sort(this);${this.component_id}.removeToggle()">Date</button>
              <button id="btnTitle" aria-label="trier par titre" value="title" onclick="${this.component_id}.sort(this);${this.component_id}.removeToggle()">Titre</button>
                </div>
       
       ` ;
    }


    myFunction() {
        var element = document.querySelector(".Dropdown");
        element.classList.toggle("IsVisible");
        var element2 = document.querySelector(".fa-chevron-down");
        element2.classList.toggle("fa-chevron-up");
    }
    removeToggle() {
        var element = document.querySelector(".Dropdown");
        element.classList.remove("IsVisible");
        var element2 = document.querySelector(".fa-chevron-down");
        element2.classList.remove("fa-chevron-up");
    }
    sort(button) {
        const idPhotographer = parseInt(window.location.search.slice(1));
        var mode = button.value;
        const sorted = JSON.parse(JSON.stringify(sortFromDataManager(mode, (getMediaByPhotographerId(idPhotographer)))));
        for (const component of window.mediaComponents) {
            component.die();
        }
        var mediaList = [];
        
       sorted.forEach(elm => {
            mediaList.push((elm.likes));
        });
        let sumLikes = 0;
        for (let i = 0; i < mediaList.length; i++) {
            sumLikes += mediaList[i];
        }

        const dataInsert = document.getElementById("update");
        dataInsert.innerHTML = "<p>" + sumLikes + "</p>";

        function update(liked) {
            sumLikes += liked ? 1 : -1;
            dataInsert.innerHTML = "<p>" + sumLikes + "</p>";
        }
        window.mediaComponents = [];
        const target = document.getElementById("mainPhotographer");
        const mediaContainer = document.createElement("div");
        mediaContainer.className = "mediaContainer";
        target.appendChild(mediaContainer);
        for (const media of sorted) {
            if (media.hasOwnProperty("image")) {
                new CardMedia(mediaContainer, media, update);
            }
            else {
                new CardVideo(mediaContainer, media, update);
            }
        }
        document.getElementById("btnFirst").focus();
    }

}





  

