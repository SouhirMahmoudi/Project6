/* eslint-disable no-undef */
import { getMediaById } from "../../data/dataManager.js";
import Component from "../Component.js";

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
     */
    showLightBox(currentMediaId) {
        window.onkeydown = this.keyListener;
        this.DOM.focus();
        this.currentMediaId = currentMediaId; //document.activeElement.id;
        this.mediaList = [];
        this.idList = [];
        document.querySelectorAll("article").forEach(elm => {
            this.mediaList.push(getMediaById(parseInt(elm.id)));
            this.idList.push(parseInt(elm.id));
        });
        // this.idList=Array.from(this.mediaList).map(elm=>parseInt(elm.id))
        this.currentMedia = getMediaById(this.currentMediaId);
        this.DOM.innerHTML = this.html;
        const lightContainer = document.getElementById("components_lightbox");
        lightContainer.style.display = "block";
}
    

    get html() {
        return ` <div class= "lightbox">
            <button id="lbClose" onclick="${this.component_id}.remove()"> <i class="fas fa-times"></i> </button>
            <button id="lbPrev" onclick="${this.component_id}.gotoPreviousMedia()"><i class="fas fa-chevron-left"></i></button> 
            <button id="lbNext" onclick="${this.component_id}.gotoNextMedia()"><i class="fas fa-chevron-right"></i></button>
            ${this.showMedia()}
            <h4>${this.currentMedia.title}</h4>
            </div>
        `;
    }

    showMedia() {
        if (this.currentMedia.image) {
            return `<img src="./assets/images/${this.currentMedia.image}" id="lbMedia" alt="${this.alt}" />`;
        }
        return `<video controls="controls" id="lbMedia"> 
        <source src="assets/images/${this.currentMedia.video}" type="video/mp4"  />
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
        document.body.removeChild(this.DOM);
        delete window.onkeydown;
        window.location.reload();

    }





    keyListener(event) {
        // alert("out");
        if (event.code === "Tab") {
            setTimeout(lightbox.checkFocus, 100);
        }
    }

    checkFocus() {
        const currentId = document.activeElement.id ? document.activeElement.id : null;
        if (currentId !== null && lightbox.possibleIds.includes(currentId)) return;
        document.getElementById("lbClose").focus();
    }
}


