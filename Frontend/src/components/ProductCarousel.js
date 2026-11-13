import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTopProductsQuery } from "../slices/productApiSlice";
import Loader from "./Loader";
import Message from "./Message";

const imageSrc = (image) =>
  image?.startsWith("/uploads") ? `http://localhost:5000${image}` : image;

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) return <Loader />;
  if (error) {
    return (
      <Message variant="danger">{error?.data?.message || error.error}</Message>
    );
  }
  if (!products?.length) return null;

  return (
    <Carousel
      pause="hover"
      className="product-slider"
      interval={3000}
      controls={false}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <div className="product-slide">
            <div className="product-slide__copy">
              {product.category && (
                <p className="section-kicker">
                  {product.category.replace(/-/g, " ")}
                </p>
              )}
              <h2>{product.name}</h2>
              <p className="product-slide__price">
                ${Number(product.price).toFixed(2)}
              </p>
              <Link
                to={`/product/${product._id}`}
                className="btn btn-success"
              >
                Shop now
              </Link>
            </div>
            <Link
              to={`/product/${product._id}`}
              className="product-slide__media"
            >
              <img src={imageSrc(product.image)} alt={product.name} />
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
