import { useState } from "react";
import BookingDetails from "./BookingDetails";

const reservationTimes = [
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
];

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
    const isSunday = selectedDate.getDay() === 0;
    const lastTime = isSunday ? "19:30" : "21:30";
    const now = new Date();

    const times = reservationTimes.filter((time) => {
      const reservationStart = new Date(`${date}T${time}:00`);

      return time <= lastTime && reservationStart > now;
    });

    setProposedTimes(times);

    setMessage(
      times.length === 0
        ? "No future times are offered for this date. Please choose another date."
        : "Choose a time. Table availability will be checked when you submit your reservation."
    );
  }

  return (
    <main className="reservations-page">
      <header className="reservations-hero">
        <h1>Reserve Your Table</h1>
      </header>

      <section className="reservation-content">
        <h2>Café Fausse</h2>

        <address>
          1234 Culinary Ave, Suite 100, Washington, DC 20002
        </address>

        <p>
          Monday–Saturday: 5:00 PM–11:00 PM
          <br />
          Sunday: 5:00 PM–9:00 PM
        </p>

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