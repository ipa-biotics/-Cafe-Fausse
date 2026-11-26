import pageContent from "../data/pageContent";
import menuItems, { menuCategories } from "../data/menuItems";

function Menu() {
  return (
    <main className="menu-page">
      <header
        className="menu-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url("${pageContent.menu.heroImage}")`,
        }}
      >
        <h1>{pageContent.menu.title}</h1>
      </header>

      <div className="menu-content">
        {menuCategories.map((category) => (
          <section className="menu-category" key={category.value}>
            <h2>{category.title}</h2>

            <div className="menu-category-items">
              {menuItems
                .filter((item) => item.category === category.value)
                .map((item) => (
                  <article className="menu-item" key={item.id}>
                    <p className="menu-item-description">
                      <span>{item.name}</span> – {item.description}
                    </p>

                    <span className="menu-item-price">
                      ${item.price}
                    </span>
                  </article>
                ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

export default Menu;
