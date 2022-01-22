import TableURL from "./url/table.js";
import SigninElement from "./component/signin-toolbar.js";

customElements.define("signin-btn", SigninElement);

const table = new TableURL("#container-links");

function init() {
  document.querySelector("#input-search").addEventListener("keyup", (event) => {
    table.searchFor(event.currentTarget.value);
  });

  // check access

  try {
    table.getData();
  } catch (error) {
    console.log(error);
  }
}

init();
