function MenuItem({ name, description, price }) {
  return (
    <article className="menu-item">
      <p className="menu-item-description">
        <span>{name}</span> – {description}
      </p>

      <span className="menu-item-price">${price}</span>
    </article>
  );
}

export default MenuItem;