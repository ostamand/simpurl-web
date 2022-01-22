//! I cannot use import for that one. So, for sure some dupplication.

const apiEndpoint = "http://localhost:8001";

async function redirect(token, symbol) {
  const response = await fetch(apiEndpoint + "/links/redirect", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ token, symbol }),
  });
  if (response.status != 200) {
    // TODO: if 404 display image to the user
    return;
  }
  const data = await response.json();

  if (data.url.length > 0) {
    document.location.href = data.url;
  }
}

const checkRedirect = () => {
  const path = document.location.pathname.replace("/", "");
  if (path.length === 0) {
    // no need to do anything we are not trying to redirect
    return;
  }
  // let's check if the symbol has an URL associated
  redirect(window.localStorage.getItem("session"), path);
};

checkRedirect();
