import logo from "../images/cafe-fausse-logo.png";
const restaurant = {
  logo,
  name: "Café Fausse",
  address: {
    street: "1234 Culinary Ave, Suite 100",
    city: "Washington, DC 20002"
  },
  phone: {
    display: "(202) 555-4567",
    href: "tel:+12025554567"
  },
  openingHours: [
    {
      id: "monday-saturday",
      days: [
        1,
        2,
        3,
        4,
        5,
        6
      ],
      label: "Monday to Saturday",
      compactLabel: "Monday–Saturday",
      opensAt: "17:00",
      closesAt: "23:00"
    },
    {
      id: "sunday",
      days: [
        0
      ],
      label: "Sunday",
      compactLabel: "Sunday",
      opensAt: "17:00",
      closesAt: "21:00"
    }
  ],
  reservations: {
    durationMinutes: 90,
    intervalMinutes: 30
  }
};

export default restaurant;
