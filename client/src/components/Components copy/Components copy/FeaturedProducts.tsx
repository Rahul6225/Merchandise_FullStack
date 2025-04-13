// import React from "react";
import "./CSS/FeaturedProducts.css";

type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Premium T-Shirt",
    description: "High-quality cotton t-shirt with custom design",
    price: "$29.99",
    image:
      "https://airtex.in/cdn/shop/files/Men-premium-T-Shirt-Navy-Blue-and-Moss-Green-Airtex-64898022.jpg?v=1721401281",
  },
  {
    id: 2,
    name: "Designer Hoodie",
    description: "Comfortable hoodie perfect for any season",
    price: "$49.99",
    image:
      "https://static.zara.net/assets/public/dada/4678/999b4378a5ce/3590f66826dc/04393350807-e1/04393350807-e1.jpg?ts=1722871774113",
  },
  {
    id: 3,
    name: "Designer Cap",
    description: "Comfortable hoodie perfect for any season",
    price: "$49.99",
    image:
      "https://github.com/Rahul6225/Merchandise_FullStack/blob/main/client/src/images/cap.png?raw=true",
  },
  {
    id: 4,
    name: "Stylish Bag",
    description: "Adjustable cap with embroidered logo",
    price: "$19.99",
    image:
      "https://sreeleathersonline.com/cdn/shop/products/IMG_3959.png?v=1678199930",
  },
];

export default function FeaturedProducts(): JSX.Element {
  return (
    <section className="featured-section">
      <h2>Featured Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <strong>{product.price}</strong>
              <button className="view-button">View Product</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
