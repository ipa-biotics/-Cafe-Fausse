import homeHero from "../images/home-cafe-fausse.webp";
import menuHero from "../images/gallery-ribeye-steak.webp";
import reservationsHero from "../images/reserve-a-table.png";
import eventsHero from "../images/gallery-special-event.webp";
import foundersImage from "../images/founders.png";
import antonioPortrait from "../images/antonio-rossi.png";
import mariaPortrait from "../images/maria-lopez.png";
import hoursBackground from "../images/opening-hours.png";
import awardsBackground from "../images/awards.png";
import newsletterBackground from "../images/newsletter.png";

const pageContent = {
  home: {
    storyImage: foundersImage,
    hoursBackground: hoursBackground,
    heroImage: homeHero,
    kicker: "Welcome to",
    tagline: "Refined cuisine, timeless elegance, and warm hospitality.",
    storyLabel: "About Us",
    storyTitle: "Our story, our people, and our passion for fine dining.",
    storyText: "Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation.",
    storyImageAlt: "Chef Antonio Rossi and restaurateur Maria Lopez",
    menuLabel: "Menu",
    menuTitle: "Taste the Excellence",
    menuText: "Discover a menu inspired by Italian flavors, seasonal ingredients, and the pleasure of sharing a beautifully prepared meal.",
    hoursLabel: "Reservations",
    hoursTitle: "Opening Hours",
    hoursText: "Plan your visit and join us for an evening of fine dining at Café Fausse."
  },
  menu: {
    heroImage: menuHero,
    title: "Menu"
  },
  reservations: {
    heroImage: reservationsHero,
    title: "Reserve Your Table"
  },
  about: {
    heroImage: eventsHero,
    title: "About Us",
    storyLabel: "Our Story",
    storyText: "Founded in 2010 by Chef Antonio Rossi and restaurateur Maria Lopez, Café Fausse blends traditional Italian flavors with modern culinary innovation. Our mission is to provide an unforgettable dining experience that reflects both quality and creativity.",
    foundersLabel: "The People Behind Café Fausse",
    foundersTitle: "Our Founders",
    commitmentsLabel: "What Matters to Us",
    commitmentsTitle: "Our Commitments",
    founders: [
      {
        id: "antonio-rossi",
        image: antonioPortrait,
        name: "Antonio Rossi",
        role: "Chef & Co-Founder",
        alt: "Chef Antonio Rossi",
        biography: "Chef Antonio Rossi brings Italian tradition and culinary curiosity to Café Fausse. His approach celebrates seasonal ingredients, balanced flavors, and the care that turns a meal into a memorable experience."
      },
      {
        id: "maria-lopez",
        image: mariaPortrait,
        name: "Maria Lopez",
        role: "Restaurateur & Co-Founder",
        alt: "Restaurateur Maria Lopez",
        biography: "Restaurateur Maria Lopez leads Café Fausse with a passion for hospitality. She creates a welcoming atmosphere and thoughtful service, making every guest feel at home from arrival to the end of their evening."
      }
    ],
    commitments: [
      {
        id: "dining",
        number: "01",
        title: "Unforgettable Dining",
        text: "A welcoming setting and attentive service for every occasion."
      },
      {
        id: "food",
        number: "02",
        title: "Excellent Food",
        text: "Thoughtfully prepared dishes that combine tradition and creativity."
      },
      {
        id: "ingredients",
        number: "03",
        title: "Locally Sourced Ingredients",
        text: "Seasonal ingredients and a close connection to the people who produce them."
      }
    ]
  },
  gallery: {
    heroImage: eventsHero,
    titleLines: [
      "Our Gallery,",
      "Awards & Reviews"
    ]
  },
  galleryPreview: {
    label: "Gallery",
    title: "Explore Café Fausse",
    description: "A glimpse of our food, atmosphere, and special moments."
  },
  awards: {
    backgroundImage: awardsBackground,
    label: "Our Awards",
    title: "What they say about us",
    description: "Recognition of the food, hospitality, and memorable experiences we share with our guests."
  },
  reviews: {
    label: "Guest Reviews",
    title: "Why people choose us"
  },
  newsletter: {
    backgroundImage: newsletterBackground,
    label: "Newsletter",
    title: "Subscribe to our newsletter",
    description: "Stay up to date with restaurant news, seasonal dishes, and special evenings at Café Fausse."
  },
  footer: {
    description: "Italian flavors, seasonal ingredients, and thoughtful hospitality in the heart of Washington, DC."
  }
};

export default pageContent;
