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
        this.DOM.tabIndex = 0;
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
        <div class="VideoContainer"> <video id="video" src="assets/images/${this.video}#t=5" type="video/mp4"  pointer-events="fill" tabindex="0" onclick="components_lightbox.showLightBox(${this.id});${this.component_id}.play()"> </div>
        </video>
        <div class="description">
        <h2 tabindex=0>${this.title}</h2>
        <div class="likes">
        <p tabindex=0 class="ShowLikes"> ${this.likes} </p>
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
        
            
    