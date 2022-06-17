import Component from "../factories/Component.js";
export default class PhotographeHeader extends  Component{

    /**
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {Object} props 
     * @param {String} props.name
     * @param {String} props.country
     * @param {String} props.tagline
     * @param {String} props.portrait
     * @param {String} props.alt
     */
    constructor(DOMtarget, props){
        super(DOMtarget, props.name, "div", props);
        this.DOM.className="photograph-header";
        this.DOM.tabIndex=-1;
    }
    

    render(){
        this.DOM.innerHTML = `
        <div class="info" >
        <h1 tabindex="0">${this.name}</h1>
        <div class="desc" tabindex="0">
        <p class="city">${this.city} ,${this.country}</p>
        <p class="tagline"> ${this.tagline}</p>
        </div>
        </div>
        <button tabindex="0" id="btnContact" aria-label="bouton contactez-moi" class="contact_button" onclick="components_formModal.displayModal()"> Contactez-moi </button>
        <img src="assets/photographers/${this.portrait}" tabindex="0" alt="${this.alt}">
       ` ;
    }

}
