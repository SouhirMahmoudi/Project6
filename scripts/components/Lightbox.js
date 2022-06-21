/* eslint-disable no-undef */
import { getMediaById } from "../../data/dataManager.js";
import Component from "../factories/Component.js";

export default class Lightbox extends Component {

    possibleIds = [
        "lbClose",
        "lbPrev",
        "lbNext",
        "lbMedia"
    ];
    constructor() {
        super(document.body, "lightbox", "div");
    }

    /**
     * 
     * @param {Array.<Object>} mediaList 
     * @param {Number}         currentMediaId 
     * @param {object}         currentMedia
     * 
     */
    showLightBox(currentMediaId) {
        this.currentMediaId = currentMediaId;
        this.mediaList = [];
        this.idList = [];
        document.querySelectorAll("article").forEach(elm => {
            this.mediaList.push(getMediaById(parseInt(elm.id)));
            this.idList.push(parseInt(elm.id));
        });

        this.currentMedia = getMediaById(this.currentMediaId);
        this.DOM.innerHTML = this.html;
        const lightContainer = document.getElementById("components_lightbox");
        lightContainer.style.display = "block";
        document.onkeydown = function (e) {
            switch (e.key) {
                case "ArrowLeft":
                    components_lightbox.gotoPreviousMedia();
                    e.preventDefault();
                    break;
                case "ArrowRight":
                    components_lightbox.gotoNextMedia();
                    e.preventDefault();
                    break;
                case "Escape":
                    components_lightbox.remove();
                    e.preventDefault();
            }
        };
        const page = document.querySelector("body");
        page.classList.add("noScroll");

         //garder le focus en lightbox quand le lihghtbox est ouvert
        const focusableElements = "button,video,[tabindex]:not([tabindex='-1'])";
        const lightbox = document.querySelector(".lightbox"); 

        const firstFocusableElement = lightbox.querySelectorAll(focusableElements)[0]; 
        const focusableContent = lightbox.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; 



        document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { 
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); 
                    e.preventDefault();
                }
            } else { 
                if (document.activeElement === lastFocusableElement) { 
                    firstFocusableElement.focus(); 
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();





    }



    get html() {
        return ` <div class= "lightbox">
            <input type="button" aria-label ="fermer lightbox" id="lbClose" onclick="${this.component_id}.remove()" tabindex="1"> <i class="fas fa-times"></i> </>
            <input type="button" aria-label ="Précédent"  id="lbPrev" onclick="${this.component_id}.gotoPreviousMedia()" tabindex="1"><i class="fas fa-chevron-left"></i></>
            <input type="button"  aria-label ="Suivant"  id="lbNext" onclick="${this.component_id}.gotoNextMedia()" tabindex="1"><i class="fas fa-chevron-right"></i></>
            ${this.showMedia()}
            <h4>${this.currentMedia.title}</h4>
            </div>
        `;
    }



    showMedia() {
        if (this.currentMedia.image) {
            return `<img src="./assets/images/${this.currentMedia.image}" id="lbMedia" tabindex="1" alt="${this.currentMedia.alt}" />`;
        }
        return `<video controls id="lbMedia" tabindex="1"> 
        <source src="assets/images/${this.currentMedia.video}" type="video/mp4" aria-label="${this.currentMedia.title}"/>
    </video>`;
    }

    //defilement des images

    gotoNextMedia() {

        let newPosition = this.idList.indexOf(this.currentMediaId) + 1;
        if (newPosition === this.mediaList.length) newPosition = 0;
        this.currentMedia = this.mediaList[newPosition];
        this.currentMediaId = this.currentMedia.id;
        this.DOM.innerHTML = this.html;

    }

    gotoPreviousMedia() {
        let newPosition = this.idList.indexOf(this.currentMediaId) - 1;
        if (newPosition === -1) newPosition = (this.mediaList.length - 1);
        this.currentMedia = this.mediaList[newPosition];
        this.currentMediaId = this.currentMedia.id;
        this.DOM.innerHTML = this.html;
    }



    remove() {
        this.die();
        new Lightbox();
        document.getElementsByClassName("mediaFirst")[0].focus();
        const page = document.querySelector("body");
        page.classList.remove("noScroll");

    }

}




