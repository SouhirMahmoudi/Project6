import Component from "../factories/Component.js";
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
        this.DOM.tabIndex = "-1";
        this.DOM.id = this.id;
        if (!window.mediaComponents) window.mediaComponents = [];
        window.mediaComponents.push(this);


        var video = document.getElementById("video");
        video.onkeypress = function (e) {
            if ((e || window.event).keyCode === 13) {
                video.onclick();
            }
        };
    }

    render() {
        this.DOM.innerHTML = `
        <div class="VideoContainer">
            <video 
            class="mediaFirst"
                id="video" 
                src="assets/images/${this.video}#t=1" 
                tabindex="0" 
                onclick="components_lightbox.showLightBox(${this.id})">
                aria-labelledby="${this.title}"
            </video>
        </div>
        <div class="description">
            <h2 tabindex=0>${this.title}</h2>
            <div class="likes" aria-labelledby="nombre de likes pour ${this.title}">
                <p tabindex=0 class="ShowLikes"> ${this.likes} </p>
                <button  aria-labelledby="clickez pour aimer ${this.title} " class="heart" onclick="${this.component_id}.like(${this.id})"></button>
            </div>
        </div>
       ` ;
    }
    /**
     *  @param {Number}      currentMediaId 
     * @param {object}         currentMedia
   **/


    like(mediaId) {
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


