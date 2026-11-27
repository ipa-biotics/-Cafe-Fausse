import { useEffect, useRef, useState } from "react";
import ApiService from "../services/api-service";

function BookingDetails({ date, time, guests, onClose }) {
  const dialogRef = useRef(null);

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservation, setReservation] = useState(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    dialog.showModal();

    return () => {
      dialog.close();
    };
  }, []);

  function handleClose() {
    if (!isSubmitting) {
      onClose();
    }
  }

  function handleCancel(event) {
    event.preventDefault();
    handleClose();
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    const formData = new FormData(event.currentTarget);

    const bookingData = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      date: date,
      time: time,
      guests: Number(guests),
      newsletter: formData.has("newsletter"),
      reservationTerms: formData.has("reservationTerms"),
    };

    setMessage("");
    setIsSubmitting(true);

    try {
      const response = await ApiService.createReservation(bookingData);

      setReservation(response.data.reservation);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Unable to confirm your reservation. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      id="booking-dialog"
      className="booking-dialog"
      aria-labelledby="booking-dialog-title"
      onCancel={handleCancel}
    >
      <h2 id="booking-dialog-title">
        {reservation ? "Reservation Confirmed" : "Guest Information"}
      </h2>

      {reservation ? (
        <div className="booking-confirmation">
          <p role="status">{message}</p>

          <p>
            Reservation reference:{" "}
            <strong>{reservation.reservation_id}</strong>
          </p>

          <p className="booking-summary">
            {reservation.date} · {reservation.time} ·{" "}
            {reservation.guests} guest(s)
          </p>

          <p>
            To modify or cancel your reservation, please call{" "}
            <a href="tel:+12025554567">(202) 555-4567</a>.
          </p>

          <div className="booking-actions">
            <button
              className="button"
              type="button"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>Enter the contact details for your reservation.</p>

          <p className="booking-summary">
            {date} · {time} · {guests} guest(s)
          </p>

          <form
            className="booking-form"
            onSubmit={handleSubmit}
            aria-busy={isSubmitting}
          >
            <div className="reservation-field">
              <label htmlFor="booking-name">Full Name *</label>

              <input
                id="booking-name"
                name="name"
                type="text"
                autoComplete="name"
                maxLength={100}
                disabled={isSubmitting}
                required
                autoFocus
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="booking-email">
                Email Address *
              </label>

              <input
                id="booking-email"
                name="email"
                type="email"
                autoComplete="email"
                maxLength={150}
                disabled={isSubmitting}
                required
              />
            </div>

            <div className="reservation-field">
              <label htmlFor="booking-phone">
                Phone Number — Optional
              </label>

              <input
                id="booking-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={20}
                disabled={isSubmitting}
              />
            </div>

            <label className="booking-checkbox">
              <input
                name="newsletter"
                type="checkbox"
                disabled={isSubmitting}
              />
              Subscribe to our newsletter
            </label>

            <label className="booking-checkbox">
              <input
                name="reservationTerms"
                type="checkbox"
                disabled={isSubmitting}
                required
              />
              I agree to the reservation terms and conditions.
            </label>

            <p role="status" aria-live="polite">
              {message}
            </p>

            <div className="booking-actions">
              <button
                className="button button-outline"
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Go Back
              </button>

              <button
                className="button"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Booking..." : "Book"}
              </button>
            </div>
          </form>
        </>
      )}
    </dialog>
  );
}

export default BookingDetails;