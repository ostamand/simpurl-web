import configs from "./defaults.js";

const usernameInput = document.querySelector("#input-username");
const passwordInput = document.querySelector("#input-password");
const main = document.querySelector("main");

const displayAlert = (type, message) => {
  const alert = document.querySelector("#alert");
  if (alert != null) {
    alert.remove();
  }
  main.insertAdjacentHTML(
    "afterbegin",
    /*html*/
    `
      <div id="alert"
      class="alert alert-${type} alert-dismissible fade show"
      role="alert">
      ${message}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
      </button>
    </div>
  `
  );
};

const init = () => {
  const alert = window.localStorage.getItem("alert");
  console.log(alert);
  if (alert != null) {
    [type, message] = alert.split(";");
    displayAlert(type, message);
    window.localStorage.removeItem("alert");
  }
};

async function signin() {
  try {
    const response = await fetch(configs.apiEndpoint + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: usernameInput.value,
        password: passwordInput.value,
      }),
    });
    if (response.status != 200) {
      if (response.status === 401) {
        displayAlert("danger", "Wrong! Try again.");
      }
      return;
    }
    // TODO: change signin so that it returns the expire date
    const data = await response.json();

    // set or update local storage
    window.localStorage.setItem("username", usernameInput.value);
    window.localStorage.setItem("session", data.token);

    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);

    document.cookie = `session_token=${
      data.token
    }; expires=${d.toUTCString()}; path=/`;

    window.location.replace("/");
  } catch (error) {
    // TODO: add alert for user
    console.log(error);
  }
}

document.querySelector("#form-signin").addEventListener("submit", (event) => {
  event.preventDefault();
  signin();
});

init();
