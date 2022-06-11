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
        
    

        const focusableElements = "button,video,[tabindex]:not([tabindex='-1'])";
        const lightbox = document.querySelector(".lightbox"); // select the lightbox by it's id

        const firstFocusableElement = lightbox.querySelectorAll(focusableElements)[0]; // get first element to be focused inside lightbox
        const focusableContent = lightbox.querySelectorAll(focusableElements);
        const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside lightbox


        document.addEventListener("keydown", function (e) {
            let isTabPressed = e.key === "Tab" || e.keyCode === 9;

            if (!isTabPressed) {
                return;
            }

            if (e.shiftKey) { // if shift key pressed for shift + tab combination
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus(); // add focus for the last focusable element
                    e.preventDefault();
                }
            } else { // if tab key is pressed
                if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
                    firstFocusableElement.focus(); // add focus for the first focusable element
                    e.preventDefault();
                }
            }
        });

        firstFocusableElement.focus();
        var video = document.getElementById("lbMedia"); 
        
        document.onkeypress = function(e){
            if((e || window.event).keyCode === 32){
                video.paused ? video.play() : video.pause();
            }
        };

        document.onkeydown = function (e) {
            switch (e.key) {
                case "ArrowLeft":
                    components_lightbox.gotoPreviousMedia();
                    break;
                case "ArrowRight":
                    components_lightbox.gotoNextMedia();
            }
        };
    
    }



    get html() {
        return ` <div class= "lightbox">
            <input type="button"  id="lbClose" onclick="${this.component_id}.remove()" tabindex="1"> <i class="fas fa-times"></i> </>
            <input type="button" id="lbPrev" onclick="${this.component_id}.gotoPreviousMedia()" tabindex="1"><i class="fas fa-chevron-left"></i></> 
            <input type="button  id="lbNext" onclick="${this.component_id}.gotoNextMedia()" tabindex="1"><i class="fas fa-chevron-right"></i></>
            ${this.showMedia()}
            <h4>${this.currentMedia.title}</h4>
            </div>
        `;
    }



    showMedia() {
        if (this.currentMedia.image) {
            return `<img src="./assets/images/${this.currentMedia.image}" id="lbMedia" alt="${this.currentMedia.image.alt}" />`;
        }
        return `<video controls id="lbMedia"> 
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
        this.die();
        delete window.onkeydown;
        new Lightbox();

    }

}



    /* keyListener(event) {
         // alert("out");
         if (event.code === "Tab") {
             setTimeout(lightbox.checkFocus, 100);
         }
     }
 
     /*checkFocus() {
         const currentId = document.activeElement.id ? document.activeElement.id : null;
         if (currentId !== null && lightbox.possibleIds.includes(currentId)) return;
         document.getElementById("lbClose").focus();
     }*/





