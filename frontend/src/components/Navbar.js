import { useState } from "react";
import { Link } from "react-router-dom";
import cafeLogo from "../images/cafe-fausse-logo.png";

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
        aria-label="Café Fausse home"
        onClick={closeMenu}
      >
        <img src={cafeLogo} alt="Café Fausse" />
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
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/menu" onClick={closeMenu}>
          Menu
        </Link>
        <Link to="/reservations" onClick={closeMenu}>
          Reservations
        </Link>
        <Link to="/about" onClick={closeMenu}>
          About Us
        </Link>
        <Link to="/gallery" onClick={closeMenu}>
          Gallery
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;