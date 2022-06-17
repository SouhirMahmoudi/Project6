import Component from "../factories/Component.js";
export default class CardMedia extends Component {

    /** 
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {Object} props 
     * @param {String} props.title
     * @param {String} props.image
     * @param {number} props.likes
     * @param {number} props.id
     *  @param {String} props.alt
     */
    constructor(DOMtarget, props, updateLikes) {
        super(DOMtarget, props.title, "article", props);
        this.updateLikes = updateLikes;
        this.DOM.className = "card-media";
        this.DOM.tabIndex = -1;
        this.DOM.id = this.id;
        this.liked = false;
        if (!window.mediaComponents) window.mediaComponents = [];
        window.mediaComponents.push(this);
    }


    render() {
        this.DOM.innerHTML = `
        <img class="mediaFirst" tabindex=0 src="assets/images/${this.image}" alt="${this.alt}" onclick="components_lightbox.showLightBox(${this.id})">
        <div class="description">
        <h2 tabindex=0>${this.title}</h2>
        <div class="likes" aria-labelledby="nombre de likes pour ${this.title}" >
        <p tabindex=0 class="showLikes"> ${this.likes} </p>
        <button class="heart" aria-labelledby="clickez pour aimer ${this.title}"  onclick="${this.component_id}.Like(${this.id})"></button>
        </div>
        </div>
       ` ;
    }
    /**
     *  @param {Number}      currentMediaId 
     * @param {object}         currentMedia
   **/


    Like(mediaId) {
        this.liked = !this.liked;
        if (!this.liked) this.likes--;
        else this.likes++;
        this.updateLikes(this.liked);
        this.render();
        var currentMedia = document.getElementById(mediaId);
        var currentElem = currentMedia.querySelector(".heart");
        currentElem.focus();
        
    }

    

}

