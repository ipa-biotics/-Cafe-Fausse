import axios from "axios";

async function getCsrfToken() {
  const response = await axios.get("/api/csrf-token");

  return response.data.csrf_token;
}

async function subscribeNewsletter(email) {
  const csrfToken = await getCsrfToken();

  return axios.post(
    "/api/newsletter",
    {
      email: email,
    },
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );
}

async function createReservation(bookingData) {
  const csrfToken = await getCsrfToken();

  return axios.post(
    "/api/reservations",
    bookingData,
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
    }
  );
}

const ApiService = {
  subscribeNewsletter,
  createReservation,
};

export default ApiService;