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
        <input type="image" id="image"tabindex=0 src="assets/images/${this.image}" alt="${this.altText}" onclick="components_lightbox.showLightBox(${this.id})"> 
        <div class="description">
        <h2 tabindex=0>${this.title}</h2>
        <div class="likes">
        <p tabindex=0 class="showLikes"> ${this.likes} </p>
        <button id="btnLike" class="heart" onclick="${this.component_id}.Like()"></button>
        </div>
        </div>
       ` ;
    }
    /**
     *  @param {Number}      currentMediaId 
     * @param {object}         currentMedia
   **/


    Like() {
        this.liked = !this.liked;
        if (!this.liked) this.likes--;
        else this.likes++;
        this.updateLikes(this.liked);
        this.render();

    }

    

}

