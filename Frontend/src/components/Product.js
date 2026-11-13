import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const imageSrc = (image) =>
  image?.startsWith("/uploads") ? `http://localhost:5000${image}` : image;

const Product = ({ product }) => {
  return (
    <Card className="product-card h-100">
      <Link to={`/product/${product._id}`} className="product-card__media">
        {Number(product.countInStock) === 0 && (
          <span className="stock-label">Out of stock</span>
        )}
        <Card.Img
          src={imageSrc(product.image)}
          alt={product.name}
          className="product-card__img"
        />
      </Link>
      <Card.Body className="product-card__body">
        {product.category && (
          <p className="product-card__category">
            {product.category.replace(/-/g, " ")}
          </p>
        )}
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Rating rating={product.rating} reviews={product.numReviews} />
        </Card.Text>
        <Card.Text className="product-card__price">
          ${Number(product.price).toFixed(2)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
