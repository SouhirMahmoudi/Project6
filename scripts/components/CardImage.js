import Component from "../Component.js";
export default class CardImage extends  Component{

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
    constructor(DOMtarget, props){
        super(DOMtarget, props.name, "a", props);
        this.DOM.className="test";
        this.DOM.setAttribute("title", `${this.name} nouvelle page`);
        this.DOM.href=`./photographer.html?${this.id}`;
        this.DOM.tabIndex=0;
    }
    

    render(){
        this.DOM.innerHTML = `
        <img src="assets/images/${this.portrait}" alt="${this.alt}">
        <h2>${this.name}</h2>
        <p class="city">${this.city} ,${this.country}</p>
        <p class="tagline"> ${this.tagline}</p>
        <p class="price">${this.price} €/jour </p>
       ` ;
    }
    
}

