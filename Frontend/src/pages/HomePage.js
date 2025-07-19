import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productApiSlice.js";
import Product from "../components/Product.js";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate.js";
import ProductCarousel from "../components/ProductCarousel.js";

const HomePage = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {keyword ? (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      ) : (
        <ProductCarousel />
      )}
      {isLoading ? (
        <div className="text-success">
          <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products.map((product) => {
              return (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Paginate
            totalPages={data.totalPages}
            page={data.page}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};

export default HomePage;
