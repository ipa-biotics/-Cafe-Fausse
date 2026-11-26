import MenuItem from "./MenuItem";

function Menu() {
  return (
    <main className="menu-page">
      <header className="menu-hero">
        <h1>Menu</h1>
      </header>

      <div className="menu-content">
        <section className="menu-category">
          <h2>Starters</h2>

          <div className="menu-category-items">
            <MenuItem
              name="Bruschetta"
              description="Fresh tomatoes, basil, olive oil, and toasted baguette slices"
              price="8.50"
            />

            <MenuItem
              name="Caesar Salad"
              description="Crisp romaine with homemade Caesar dressing"
              price="9.00"
            />
          </div>
        </section>

        <section className="menu-category">
          <h2>Main Courses</h2>

          <div className="menu-category-items">
            <MenuItem
              name="Grilled Salmon"
              description="Served with lemon butter sauce and seasonal vegetables"
              price="22.00"
            />

            <MenuItem
              name="Ribeye Steak"
              description="12 oz prime cut with garlic mashed potatoes"
              price="28.00"
            />

            <MenuItem
              name="Vegetable Risotto"
              description="Creamy Arborio rice with wild mushrooms"
              price="18.00"
            />
          </div>
        </section>

        <section className="menu-category">
          <h2>Desserts</h2>

          <div className="menu-category-items">
            <MenuItem
              name="Tiramisu"
              description="Classic Italian dessert with mascarpone"
              price="7.50"
            />

            <MenuItem
              name="Cheesecake"
              description="Creamy cheesecake with berry compote"
              price="7.00"
            />
          </div>
        </section>

        <section className="menu-category">
          <h2>Beverages</h2>

          <div className="menu-category-items">
            <MenuItem
              name="Red Wine (Glass)"
              description="A selection of Italian reds"
              price="10.00"
            />

            <MenuItem
              name="White Wine (Glass)"
              description="Crisp and refreshing"
              price="9.00"
            />

            <MenuItem
              name="Craft Beer"
              description="Local artisan brews"
              price="6.00"
            />

            <MenuItem
              name="Espresso"
              description="Strong and aromatic"
              price="3.00"
            />
          </div>
        </section>
      </div>
    </main>
  );
}

export default Menu;