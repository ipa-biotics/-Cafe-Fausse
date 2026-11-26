import restaurant from "../data/restaurant";

function formatTime(value) {
  const [hours, minutes] = value.split(":");
  const hour = Number(hours);
  const period = hour >= 12 ? "PM" : "AM";

  return `${hour % 12 || 12}:${minutes} ${period}`;
}

function OpeningHours({ variant = "lines" }) {
  if (variant === "cards") {
    return (
      <div className="hours-card">
        {restaurant.openingHours.map((entry) => (
          <div key={entry.id}>
            <h3>{entry.label}</h3>
            <p>{formatTime(entry.opensAt)}–{formatTime(entry.closesAt)}</p>
          </div>
        ))}
      </div>
    );
  }

  if (variant === "footer") {
    return restaurant.openingHours.map((entry) => (
      <p key={entry.id}>
        {entry.compactLabel}: {formatTime(entry.opensAt)}–{formatTime(entry.closesAt)}
      </p>
    ));
  }

  return (
    <p>
      {restaurant.openingHours.map((entry, index) => (
        <span key={entry.id}>
          {entry.compactLabel}: {formatTime(entry.opensAt)}–{formatTime(entry.closesAt)}
          {index < restaurant.openingHours.length - 1 && <br />}
        </span>
      ))}
    </p>
  );
}

export default OpeningHours;
