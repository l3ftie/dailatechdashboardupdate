export const baseUrl = {
  prod: "http://localhost:4400",
  dev: "https://dat-backend.onrender.com",
};

export const greeting = () => {
  const time = new Date().getHours();
  let message = "";

  if (time < 11) {
    message = "Good Morning";
  } else if (time >= 11 && time < 16) {
    message = "Good Afternoon";
  } else {
    message = "Good Evening";
  }

  return message;
};
