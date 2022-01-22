export const formatURL = (url) => {
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
};

export const getSessionToken = () => {
  let session = "";
  document.cookie.split(";").forEach((cookie) => {
    const [key, value] = cookie.trim().split("=");
    if (key === "session_token") {
      session = value;
    }
  });
  return session;
};
