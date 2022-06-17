import Component from "../factories/Component.js";
import {
  getPhotographerById
} from "../../data/dataManager.js";
export default class FormModal extends Component {
  showForm = false;
  $body = document.querySelector(".photographer");
  $main = document.getElementById("mainPhotographer");
  // $modal = document.getElementsByClassName(".formModal");
  // openModalBtn;
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
      <h2>Contactez-moi</h2>
     <button tabindex="1" aria-label="fermer formulaire"> <img src="assets/icons/close.svg" id="close" onclick="${this.component_id}.closeModal()" /></button>
      </div>
      <h3> ${this.currentPhotographer.name}</h3>
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



      const focusableElements =
        "button, input, textarea, [tabindex]:not([tabindex='-1'])";
      const modal = document.querySelector(".modal"); // select the modal by it's id
 
      const firstFocusableElement = modal.querySelectorAll(focusableElements)[0]; // get first element to be focused inside modal
      const focusableContent = modal.querySelectorAll(focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1]; // get last element to be focused inside modal
       console.log(focusableContent,firstFocusableElement);

      document.addEventListener("keydown", function (e) {
        let isTabPressed = e.key === "Tab" || e.keyCode === 9;

        if (!isTabPressed) {
          return;
        }

        if (e.shiftKey) { // if shift key pressed for shift + tab combination
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus(); // add focus for the last focusable element
            e.preventDefault();
          }
        } else { // if tab key is pressed
          if (document.activeElement === lastFocusableElement) { // if focused has reached to last focusable element then focus first focusable element after pressing tab
            firstFocusableElement.focus(); // add focus for the first focusable element
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



