import Component from "../Component.js";
import {
  getPhotographerById
} from "../../data/dataManager.js";
export default class FormModal extends Component {
  showForm = false;
  $body = document.querySelector(".photographer");
  $main =  document.getElementById("mainPhotographer");
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
    this.$main.setAttribute("aria-hidden", !this.showForm);
    this.DOM.setAttribute("aria-hidden", this.showForm);
    this.DOM.style.display = this.showForm ? "block" : "none";

    this.DOM.innerHTML = !this.showForm ? "" : this.formTemplate();
  }

  formTemplate() {
    return `
    <div id="contact_modal">
    <div class="modal" aria-hidden="true" role="dialog" aria-describedby="modalTitle">
      <header>
        <h2>Contactez-moi ${this.currentPhotographer.name}</h2>
        <img src="assets/icons/close.svg" id="close" onclick="${this.component_id}.closeModal()" />
      </header>
      <form>
        <div class="prenom">
          <label for="prenom">Prénom</label><br>
          <input class="text-control" type="text" id="prenom" name="prenom" minlength="2" required /><br>
        </div>
        <div class="nom">
          <label for="prenom">Nom</label><br>
          <input class="text-control" type="text" id="nom" name="nom" minlength="2" required /><br>
        </div>
        <div class="email">
          <label for="email">Email</label><br>
          <input class="text-control" type="email" id="email" name="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{1,63}$" title="entrez une adresse mail valide!"
            required /><br>
        </div>
        <div class="message">
          <label for="message">Votre message</label><br>
          <textarea id="message" name="message" rows="5" cols="33">
          </textarea>
        </div>
        <button class="contact_button" id ="envoyer">Envoyer</button>
      </form>
    </div>
  </div>

    `;
  }




  displayModal() {
    this.showForm = true;
    this.renderModal();
    this.$body.classList.remove("no-scroll");
    const openModalBtn = document.querySelector(".contact_button");
    openModalBtn.focus();
    
  }

  closeModal() {
    this.showForm = false;
    this.renderModal();
    this.$body.classList.add("no-scroll");
  }

}


// Close modal when espace key is pressed
/*(document).on("keydown", e => {
    const keyCode = e.keyCode ? e.keyCode : e.which

    if ($modal.attr("aria-hidden") == "false" && keyCode === 27) {
      closeModal()
    }
})*/

