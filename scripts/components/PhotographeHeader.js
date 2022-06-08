import Component from "../Component.js";
export default class PhotographeHeader extends  Component{

    /**
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {Object} props 
     * @param {String} props.name
     * @param {String} props.country
     * @param {String} props.tagline
     * @param {String} props.portrait
     */
    constructor(DOMtarget, props){
        super(DOMtarget, props.name, "div", props);
        this.DOM.className="photograph-header";
        this.DOM.tabIndex=0;
    }
    

    render(){
        this.DOM.innerHTML = `
        <div class="info">
        <h1>${this.name}</h1>
        <p class="city">${this.city} ,${this.country}</p>
        <p class="tagline"> ${this.tagline}</p>
        </div>
        <button class="contact_button" onclick="components_formModal.displayModal()"> Contactez-moi </button>
        <div class="ImageContainer2"><img src="assets/images/${this.portrait}" alt="${this.alt}"></div> 
       ` ;
    }

}
