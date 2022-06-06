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
        <label for="sort-box">Trier par</label>
        <select id="sort-box" name="select-box" onchange="${this.component_id}.sort(this)">
            <option value="popularity"> Popularité </option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
        </select>
       ` ;
    }


    sort(select) {
        const idPhotographer = parseInt(window.location.search.slice(1));
        const mode = select.value;
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






