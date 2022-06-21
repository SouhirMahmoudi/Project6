import Component from "../factories/Component.js";
import {
  getPhotographerById
} from "../../data/dataManager.js";
export default class FormModal extends Component {
  showForm = false;
  modalCloseBtn = document.getElementById("#close");



  /**
   * 
   * @param {String} idPhotographer
   */
  constructor(idPhotographer) {
    super(document.body, "formModal", "div");
    this.idPhotographer = idPhotographer;
    this.currentPhotographer = getPhotographerById(idPhotographer);
  }
  renderModal() {
    this.DOM.style.display = this.showForm ? "block" : "none";
    this.DOM.innerHTML = !this.showForm ? "" : this.formTemplate();
    document.onkeydown = function (e) {
      if ((e || window.event).keyCode === 27) {
        // eslint-disable-next-line no-undef
        components_formModal.closeModal();
      }

    };
  }

  formTemplate() {
    return `
    <div id="contact_modal">
    <div class="modal" role="dialog"  tabindex="0">
      <header>
      <div class="headerContainer">
      <h2 tabindex="1">Contactez-moi</h2>
     <button tabindex="1 aria-label="fermer formulaire"> <img aria-label="fermer formulaire" src="assets/icons/close.svg" id="close" onclick="${this.component_id}.closeModal()" /></button>
      </div>
      <h3 tabindex="1"> ${this.currentPhotographer.name}</h3>
      </header>
      <form>
        <div class="prenom">
          <label for="prenom">Prénom</label><br>
          <input tabindex="1" class="text-control" type="text" id="prenom" name="prenom" minlength="2" required /><br>
        </div>
        <div class="nom">
          <label for="prenom">Nom</label><br>
          <input tabindex="1" class="text-control" type="text" id="nom" name="nom" minlength="2" required /><br>
        </div>
        <div class="email">
          <label for="email">Email</label><br>
          <input  tabindex="1" class="text-control" type="email" id="email" name="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$" title="entrez une adresse mail valide!"
            required /><br>
        </div>
        <div class="message">
          <label for="message">Votre message</label><br>
          <textarea tabindex="1" id="message" name="message" rows="5" cols="33">
          </textarea>
        </div>
        <div>
        <button tabindex="1" aria-label="envoyer" class="envoyer_button" id ="envoyer">Envoyer</button>
        </div>
      </form>
    </div>
  </div>

    `;
  }




  displayModal() {
    this.showForm = true;
    this.renderModal();
    const page = document.querySelector("body");
    page.classList.add("noScroll");
    //garder le focus en lightbox quand le lihghtbox est ouvert   
    const focusableElements =
      "button,h2,h3, input, textarea, [tabindex]:not([tabindex='-1'])";
    const modal = document.querySelector(".modal");

    const firstFocusableElement = modal.querySelectorAll(focusableElements)[0];
    const focusableContent = modal.querySelectorAll(focusableElements);
    const lastFocusableElement = focusableContent[focusableContent.length - 1];
    console.log(focusableContent, firstFocusableElement);

    document.addEventListener("keydown", function (e) {
      let isTabPressed = e.key === "Tab" || e.keyCode === 9;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });

    firstFocusableElement.focus();

  }

  closeModal() {
    this.showForm = false;
    this.renderModal();
    const page = document.querySelector("body");
    page.classList.remove("noScroll");

    document.getElementById("btnContact").focus();
  }


}



