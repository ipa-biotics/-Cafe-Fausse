import { useEffect, useState } from "react";

function BookingDetails({ date, time, guests, onClose }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const dialog = document.getElementById("booking-dialog");

    dialog.showModal();

    return () => dialog.close();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    setMessage(
      "Online booking is not available yet. Your reservation has not been submitted."
    );
  }

  return (
    <dialog
      id="booking-dialog"
      className="booking-dialog"
      aria-labelledby="booking-dialog-title"
      onCancel={onClose}
    >
      <h2 id="booking-dialog-title">Guest Information</h2>
      <p>Enter the contact details for your reservation.</p>

      <p className="booking-summary">
        {date} · {time} · {guests} guest(s)
      </p>

      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="reservation-field">
          <label htmlFor="booking-name">Full Name *</label>
          <input
            id="booking-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            autoFocus
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="booking-email">Email Address *</label>
          <input
            id="booking-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>

        <div className="reservation-field">
          <label htmlFor="booking-phone">Phone Number — Optional</label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </div>

        <label className="booking-checkbox">
          <input name="newsletter" type="checkbox" />
          Subscribe to our newsletter
        </label>
        
        <label className="booking-checkbox">
          <input
            name="reservationTerms"
            type="checkbox"
            required
          />
          I agree to the reservation terms and conditions.
        </label>

        <p role="status">{message}</p>

        <div className="booking-actions">
          <button
            className="button button-outline"
            type="button"
            onClick={onClose}
          >
            Go Back
          </button>

          <button className="button" type="submit">
            Book
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default BookingDetails;