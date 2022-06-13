export default class Component{

    /**
     * 
     * @param {HTMLElment} DOMtarget 
     * @param {String} id 
     * @param {Object} [props] 
     * @param {String} tagName 
     */
    constructor(DOMtarget, id, tagName, props={}){
        this.component_id = this.#createId(id);
        this.DOM = document.createElement(tagName);
        this.DOM.id = this.component_id;
        DOMtarget.appendChild(this.DOM);
        window[this.component_id] = this;
        for (const [key, value] of Object.entries(props)){
            this[key] = value;
        }
        this.render();
    }

    #createId(id){
        const noSpace = id.split(" ").join("_");
        const noHyphen = noSpace.split("-").join("_");
        const noPoint = noHyphen.split(",").join("_");
        const noSpecPoint= noPoint.split("!").join("_");
        return "components_"+noSpecPoint;
    }
    render(){
    }

    die(){
        this.DOM.parentNode.removeChild(this.DOM);
    }
}