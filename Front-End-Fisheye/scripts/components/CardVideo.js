import Component from "../Component.js";
export default class CardVideo extends Component {

    /** 
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {Object} props 
     * @param {String} props.title
     *  @param {String} props.video
     * @param {number} props.likes
     *  @param {number} props.id
     */
    constructor(DOMtarget, props, updateLikes) {
        super(DOMtarget, props.title, "article", props);
        this.updateLikes = updateLikes;
        this.DOM.className = "card-media";
        this.DOM.tabIndex = 0;
        this.DOM.id = this.id;
        if (!window.mediaComponents) window.mediaComponents = [];
        window.mediaComponents.push(this);
    }
    render() {
        this.DOM.innerHTML = `
        <video src="assets/images/${this.video}#t=5" type="video/mp4" onclick="components_lightbox.showLightBox(${this.id})" 
        width="350" height="300" > 
        </video>
        <div class="description">
        <h2>${this.title}</h2>
        <div class="likes">
        <p class="ShowLikes"> ${this.likes} </p>
        <button id ="btnLike" class="heart" onclick="${this.component_id}.Like()"></button>
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