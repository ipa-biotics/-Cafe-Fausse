import pageContent from "../data/pageContent";
import restaurant from "../data/restaurant";
import OpeningHours from "../components/OpeningHours";
import { useState } from "react";
import BookingDetails from "../components/BookingDetails";


function Reservations() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [message, setMessage] = useState("");
  const [proposedTimes, setProposedTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  function handleSearch(event) {
    event.preventDefault();
    setSelectedTime("");

    const selectedDate = new Date(`${date}T12:00:00`);
    const openingHours = restaurant.openingHours.find((entry) =>
      entry.days.includes(selectedDate.getDay())
    );
    const times = [];
    const now = new Date();

    if (openingHours) {
      const [openHour, openMinute] = openingHours.opensAt.split(":").map(Number);
      const [closeHour, closeMinute] = openingHours.closesAt.split(":").map(Number);
      const firstStart = openHour * 60 + openMinute;
      const lastStart = closeHour * 60 + closeMinute - restaurant.reservations.durationMinutes;

      for (
        let minute = firstStart;
        minute <= lastStart;
        minute += restaurant.reservations.intervalMinutes
      ) {
        const hourText = String(Math.floor(minute / 60)).padStart(2, "0");
        const minuteText = String(minute % 60).padStart(2, "0");
        const time = `${hourText}:${minuteText}`;
        const reservationStart = new Date(`${date}T${time}:00`);

        if (reservationStart > now) {
          times.push(time);
        }
      }
    }

    setProposedTimes(times);

    setMessage(
      times.length === 0
        ? "No future times are offered for this date. Please choose another date."
        : "Choose a time. Table availability will be checked when you submit your reservation."
    );
  }

  return (
    <main className="reservations-page">
      <header
        className="reservations-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${pageContent.reservations.heroImage}")`,
        }}
      >
        <h1>{pageContent.reservations.title}</h1>
      </header>

      <section className="reservation-content">
        <h2>{restaurant.name}</h2>

        <address>
          {restaurant.address.street}, {restaurant.address.city}
        </address>

        <OpeningHours />

        <form className="reservation-search" onSubmit={handleSearch}>
          <div className="reservation-field">
            <label htmlFor="reservation-date">Date</label>
            <input
              id="reservation-date"
              name="date"
              type="date"
              value={date}
              onChange={(event) => {
                setDate(event.target.value);
                setProposedTimes([]);
                setSelectedTime("");
                setMessage("");
              }}
              required
            />
          </div>

          <div className="reservation-field">
            <label htmlFor="reservation-guests">Number of Guests</label>
            <input
              id="reservation-guests"
              name="guests"
              type="number"
              min="1"
              step="1"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">
            View Times
          </button>
        </form>

        <p role="status">{message}</p>

        {proposedTimes.length > 0 && (
          <section className="reservation-times">
            <h3>Select a Time</h3>

            <div className="time-slots">
              {proposedTimes.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={
                    selectedTime === time
                      ? "time-slot selected"
                      : "time-slot"
                  }
                  aria-pressed={selectedTime === time}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>

            <button
              className="button booking-open-button"
              type="button"
              disabled={
                !selectedTime ||
                !Number.isInteger(Number(guests)) ||
                Number(guests) < 1
              }
              onClick={() => setShowDetails(true)}
            >
              Book a Table
            </button>
          </section>
        )}
      </section>

      {showDetails && (
        <BookingDetails
          date={date}
          time={selectedTime}
          guests={guests}
          onClose={() => setShowDetails(false)}
        />
      )}
    </main>
  );
}

export default Reservations;
