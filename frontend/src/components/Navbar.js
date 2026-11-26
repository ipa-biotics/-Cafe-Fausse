import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import restaurant from "../data/restaurant";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Escape" && isOpen) {
      closeMenu();
      document.getElementById("navigation-toggle").focus();
    }
  }

  return (
    <nav
      className="site-nav"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
    >
      <Link
        className="site-brand"
        to="/"
        aria-label={`${restaurant.name} home`}
        onClick={closeMenu}
      >
        <img src={restaurant.logo} alt={restaurant.name} />
      </Link>

      <button
        id="navigation-toggle"
        className="nav-toggle"
        type="button"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="navigation-links"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <div
        id="navigation-links"
        className={
          isOpen ? "site-nav-links is-open" : "site-nav-links"
        }
      >
        <NavLink to="/" end onClick={closeMenu}>
          <span>Home</span>
        </NavLink>

        <NavLink to="/menu" onClick={closeMenu}>
          <span>Menu</span>
        </NavLink>

        <NavLink to="/reservations" onClick={closeMenu}>
          <span>Reservations</span>
        </NavLink>

        <NavLink to="/about" onClick={closeMenu}>
          <span>About Us</span>
        </NavLink>

        <NavLink to="/gallery" onClick={closeMenu}>
          <span>Gallery</span>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
