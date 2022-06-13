import Component from "../factories/Component.js";
export default class CardImage extends Component {

    /**
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {Object} props 
     * @param {String} props.portrait
     * @param {String} props.name
     * @param {String} props.country
     * @param {String} props.tagline
     * @param {Number} props.price
     * @param {String} props.alt
     * @param {Number} props.id
     */
    constructor(DOMtarget, props) {
        super(DOMtarget, props.name, "a", props);
        this.DOM.className = "test";
        this.DOM.setAttribute("title", `${this.name} nouvelle page`);
        this.DOM.tabIndex = -1;
    }


    render() {
        this.DOM.innerHTML = `
       <a href="./photographer.html?${this.id}"> 
       <div class="CardHeader" tabindex="1">
        <div class="ImageContainer">
        <img src="assets/images/${this.portrait}" alt="${this.alt}">
        </div>
        <h2>${this.name}</h2> 
        </div></a>
         <div class="CardDescription" tabindex="0">
        <p class="city">${this.city} ,${this.country}</p>
        <p class="tagline"> ${this.tagline}</p>
        <p class="price">${this.price} €/jour </p>
        </div>
       ` ;
    }

}

