import salmon from "../images/salmon.png";
import steak from "../images/steak.png";
import risotto from "../images/risotto.png";
import cheesecake from "../images/cheescake.png";
import bruschetta from "../images/bruchetta.png";
import caesar from "../images/ceasar.png";

import atmosphere1 from "../images/atmosphere-interior-1.png";
import atmosphere2 from "../images/atmosphere-interior-2.png";
import atmosphere3 from "../images/atmosphere-interior-3.png";
import atmosphere4 from "../images/atmosphere-interior-4.png";
import atmosphere5 from "../images/atmosphere-interior-5.png";

import networking from "../images/special-event-networking.png";
import birthday from "../images/special-event-birthday.png";
import business from "../images/special-event-business.png";
import concert from "../images/special-event-concert.png";
import gala from "../images/special-event-gala.png";

const galleryImages = [
  {
    src: salmon,
    alt: "Grilled salmon with seasonal vegetables",
    category: "dishes",
  },
  {
    src: steak,
    alt: "Ribeye steak with garlic mashed potatoes",
    category: "dishes",
  },
  {
    src: risotto,
    alt: "Vegetable risotto with wild mushrooms",
    category: "dishes",
  },
  {
    src: cheesecake,
    alt: "Cheesecake with berry compote",
    category: "dishes",
  },
  {
    src: bruschetta,
    alt: "Bruschetta with tomatoes and basil",
    category: "dishes",
  },
  {
    src: caesar,
    alt: "Caesar salad",
    category: "dishes",
  },
  {
    src: atmosphere1,
    alt: "Café Fausse interior — view 1",
    category: "atmosphere",
  },
  {
    src: atmosphere2,
    alt: "Café Fausse interior — view 2",
    category: "atmosphere",
  },
  {
    src: atmosphere3,
    alt: "Café Fausse interior — view 3",
    category: "atmosphere",
  },
  {
    src: atmosphere4,
    alt: "Café Fausse interior — view 4",
    category: "atmosphere",
  },
  {
    src: atmosphere5,
    alt: "Café Fausse interior — view 5",
    category: "atmosphere",
  },
  {
    src: networking,
    alt: "Networking event at Café Fausse",
    category: "events",
  },
  {
    src: birthday,
    alt: "Birthday celebration at Café Fausse",
    category: "events",
  },
  {
    src: business,
    alt: "Business event at Café Fausse",
    category: "events",
  },
  {
    src: concert,
    alt: "Live music evening at Café Fausse",
    category: "events",
  },
  {
    src: gala,
    alt: "Gala dinner at Café Fausse",
    category: "events",
  },
];

export default galleryImages;
export const galleryCategories = [
  { value: "atmosphere", label: "Atmosphere" },
  { value: "dishes", label: "Dishes" },
  {
    value: "events",
    label: "Special Events & Behind the Scenes",
  },
];
