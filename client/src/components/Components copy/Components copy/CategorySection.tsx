import React from "react";
import "./CSS/CategorySection.css";

// Define a type for category items
interface Category {
  id: number;
  name: string;
  image: string;
}

// Fix the duplicate IDs and define the category data
const categories: Category[] = [
  {
    id: 1,
    name: "T-Shirts",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Bags",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Perfume",
    image:
      "https://bellavitaorganic.com/cdn/shop/files/1_d5115b80-e607-4477-9205-b78447cd0e10.jpg?v=1714549127",
  },

  {
    id: 9,
    name: "Jeans",
    image:
      "https://images.jdmagicbox.com/quickquotes/images_main/men-denim-baggy-jeans-grey-28-36-2227181052-r8o8rq0a.jpg",
  },
  {
    id: 10,
    name: "3-Piece",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREyanPBFEk7Db0DIFq3Tz_wKKwSqYzQikBBA&s",
  },
  {
    id: 11,
    name: "Suit",
    image: "https://www.shoplibas.com/cdn/shop/files/36656O.jpg?v=1739273676",
  },
];

const CategorySection: React.FC = () => {
  return (
    <section className="category-section">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className="category-card"
            style={{ backgroundImage: `url(${category.image})` }}
          >
            <div className="overlay">
              <h3>{category.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
