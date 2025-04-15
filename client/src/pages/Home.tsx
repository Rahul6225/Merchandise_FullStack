// import FeaturedProducts from "../Components copy/FeaturedProducts";
// import HeroSection from "../Components copy/HeroSection";
// import "../Components copy/Navbar";
// // import Navbar from "../Components copy/Navbar";
// import CategorySection from "../Components copy/CategorySection";
// import AutoScrollSlider from "../Components copy/AutoScrollSlider";
// import "../Components copy/CSS/HomePage.css";
// import Footer from "../Components copy/Footer";
// import ProtectedRoute from "../components/admin/ProtectedRoute";



import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonLoader from "../components/SkeletonLoader";
import { useLatestProductsQuery } from "../redux/api/ProductApi";
import { addToCart } from "../redux/reducer/CartReducer";
import { server } from "../redux/store";
import { CartItemType } from "../types/Types";
import HeroSection from "../Components copy/HeroSection";
import AutoScrollSlider from "../Components copy/AutoScrollSlider";
import Footer from "../Components copy/Footer";

const Home = () => {
    const images: string[] = [
      "https://campussutra.com/cdn/shop/files/CSMSSRT7198_1_f7673e4b-8e21-4db1-bd2f-f58db02640b1.jpg?v=1731147246",
      "https://campussutra.com/cdn/shop/files/CSMSSRT7198_1_f7673e4b-8e21-4db1-bd2f-f58db02640b1.jpg?v=1731147246",
      "https://campussutra.com/cdn/shop/files/CSMSSRT7198_1_f7673e4b-8e21-4db1-bd2f-f58db02640b1.jpg?v=1731147246",
      "https://spykar.com/cdn/shop/files/BFwPq29Tm_-MSHCS1BC137NAVY-BLUE-_1.jpg?v=1744015348",
      "https://campussutra.com/cdn/shop/files/CSMSSRT7198_1_f7673e4b-8e21-4db1-bd2f-f58db02640b1.jpg?v=1731147246",
      "https://spykar.com/cdn/shop/files/BFwPq29Tm_-MSHCS1BC137NAVY-BLUE-_1.jpg?v=1744015348",
      "https://campussutra.com/cdn/shop/files/CSMSSRT7198_1_f7673e4b-8e21-4db1-bd2f-f58db02640b1.jpg?v=1731147246",
      "https://spykar.com/cdn/shop/files/BFwPq29Tm_-MSHCS1BC137NAVY-BLUE-_1.jpg?v=1744015348",
    ];
const dispatch=useDispatch();

  const addToCartHandler = (cartItem: CartItemType) => {
    if (cartItem.stock < 1) {
      return toast.error("Product Out Of Stock :(");
    }
    dispatch(addToCart(cartItem));
    toast.success("Added to Cart")
  };
  const { data, isLoading, isError } = useLatestProductsQuery("");
  console.log(data);
  if (isError) {
    toast.error("Cannot Fetch the Products");
  }
  return (
    <div className="home">
      {/* <section></section> */}
      <HeroSection />
      <div className="heads">
        <h1>Latest Product</h1>

        <Link to={"/search"} className="findmore">
          More
        </Link>
      </div>
      <div className="main">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          data?.product.map((i) => (
            <ProductCard
              key={i._id}
              productId={i._id}
              name={i.name}
              photo={`${server}/${i.photo}`}
              price={i.price}
              stock={i.stock}
              handler={addToCartHandler}
            />
          ))
        )}
      </div>
      <div className="home">
        <h1 className="title">Our Products</h1>
        <AutoScrollSlider images={images} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
