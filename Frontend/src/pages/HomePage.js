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
          <div className="section-heading">
            <div>
              <p className="section-kicker">Catalog</p>
              <h1>Latest products</h1>
            </div>
            <p className="section-meta">
              {Number.isFinite(Number(data.totalPages)) &&
              Number(data.totalPages) > 0
                ? `Page ${data.page} of ${data.totalPages}`
                : `${data.products.length} ${
                    data.products.length === 1 ? "product" : "products"
                  }`}
            </p>
          </div>
          <Row className="g-4">
            {data.products.map((product) => {
              return (
                <Col key={product._id} xs={12} md={6} lg={4} xl={3} className="d-flex">
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
