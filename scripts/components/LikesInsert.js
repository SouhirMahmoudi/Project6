import Component from "../factories/Component.js";
export default class LikesInsert extends Component {

    /**
       * 
       * @param {HTMLElment} DOMtarget 
       * @param {Object} props 
       * @param {String} props.name
       * @param {String} props.country
       * @param {String} props.tagline
       * @param {String} props.portrait
       */
    constructor(DOMtarget, props) {
        super(DOMtarget, "InsertLikes", "aside", props);
        this.DOM.className = "insert";
    }


    render() {
        this.DOM.innerHTML = `
        <div id="insert" class="insert_description">
        <div class="Likes">
        <div id="update"> </div>
        <button class="Heart"></button>
        </div>
        <div id="price">${this.price} €/jour </div>
        </div>
       ` ;
    }

   


    // click(){
    //   window.location.href=`./photographer.html?${this.id}`;
    //}
}