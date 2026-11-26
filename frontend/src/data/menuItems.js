import bruschettaImage from "../images/bruchetta.png";
import caesarImage from "../images/ceasar.png";
import salmonImage from "../images/salmon.png";
import steakImage from "../images/steak.png";
import risottoImage from "../images/risotto.png";
import cheesecakeImage from "../images/cheescake.png";

export const menuCategories = [
  { value: "starters", title: "Starters" },
  { value: "mains", title: "Main Courses" },
  { value: "desserts", title: "Desserts" },
  { value: "beverages", title: "Beverages" },
];

const menuItems = [
  {
    id: "bruschetta",
    name: "Bruschetta",
    description: "Fresh tomatoes, basil, olive oil, and toasted baguette slices",
    price: "8.50",
    category: "starters",
    image: bruschettaImage,
  },
  {
    id: "caesar-salad",
    name: "Caesar Salad",
    description: "Crisp romaine with homemade Caesar dressing",
    price: "9.00",
    category: "starters",
    image: caesarImage,
  },
  {
    id: "grilled-salmon",
    name: "Grilled Salmon",
    description: "Served with lemon butter sauce and seasonal vegetables",
    price: "22.00",
    category: "mains",
    image: salmonImage,
  },
  {
    id: "ribeye-steak",
    name: "Ribeye Steak",
    description: "12 oz prime cut with garlic mashed potatoes",
    price: "28.00",
    category: "mains",
    image: steakImage,
  },
  {
    id: "vegetable-risotto",
    name: "Vegetable Risotto",
    description: "Creamy Arborio rice with wild mushrooms",
    price: "18.00",
    category: "mains",
    image: risottoImage,
  },
  {
    id: "tiramisu",
    name: "Tiramisu",
    description: "Classic Italian dessert with mascarpone",
    price: "7.50",
    category: "desserts",
    image: null,
  },
  {
    id: "cheesecake",
    name: "Cheesecake",
    description: "Creamy cheesecake with berry compote",
    price: "7.00",
    category: "desserts",
    image: cheesecakeImage,
  },
  {
    id: "red-wine",
    name: "Red Wine (Glass)",
    description: "A selection of Italian reds",
    price: "10.00",
    category: "beverages",
    image: null,
  },
  {
    id: "white-wine",
    name: "White Wine (Glass)",
    description: "Crisp and refreshing",
    price: "9.00",
    category: "beverages",
    image: null,
  },
  {
    id: "craft-beer",
    name: "Craft Beer",
    description: "Local artisan brews",
    price: "6.00",
    category: "beverages",
    image: null,
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Strong and aromatic",
    price: "3.00",
    category: "beverages",
    image: null,
  },
];

export default menuItems;