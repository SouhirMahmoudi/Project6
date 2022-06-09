import CardMedia from "../components/CardMedia.js";
import CardVideo from "../components/CardVideo.js";
import {
    getMediaByPhotographerId,
    sort as sortFromDataManager
} from "../../data/dataManager.js"; import Component from "../Component.js";
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
        <p class="trier">Trier par</p>
        <button id="btnFirst"  value="popularity" onclick="${this.component_id}.myFunction();${this.component_id}.sort(this)">Popularité</button>
        <i class="fas fa-chevron-down"></i>
              <div class="Dropdown">
              <button id="btn" value="date" onclick="${this.component_id}.sort(this)">Date</button>
              <button id="btn" value="title" onclick="${this.component_id}.sort(this)">Titre</button>
                </div>
       
       ` ;
    }

   /* 
    <select id="sort-box" name="select-box" onchange="${this.component_id}.sort(this)">
        <option value="popularity"> Popularité </option>
        <option value="date">Date</option>
        <option value="title">Titre</option>
    </select>*/

    myFunction() {
        var element = document.querySelector(".Dropdown");
        element.classList.toggle("IsVisible");
        var element2 = document.querySelector(".fa-chevron-down");
        element2.classList.toggle("fa-chevron-up");
      }
    sort(button) {
        const idPhotographer = parseInt(window.location.search.slice(1));
        var mode = button.value;
        const sorted = JSON.parse(JSON.stringify(sortFromDataManager(mode, (getMediaByPhotographerId(idPhotographer)))));
        for (const component of window.mediaComponents) {
            component.die();
        }
        window.mediaComponents = [];
        const target = document.getElementById("mainPhotographer");
        for (const media of sorted) {
            if (media.hasOwnProperty("image")) {
                new CardMedia(target, media);
            }
            else {
                new CardVideo(target, media);
            }
        }
    }

}






