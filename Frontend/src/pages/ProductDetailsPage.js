import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeft } from "react-icons/fa";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productApiSlice.js";
import { addToCart } from "../slices/cartSlice.js";
import Rating from "../components/Rating";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { toast } from "react-toastify";
import Meta from "../components/Meta.js";

const ProductDetailsPage = () => {
  const { id: productId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReviews }] =
    useCreateReviewMutation();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        user: userInfo._id,
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review Submitted Successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error.data.message || error.error);
    }
  };

  return (
    <>
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
          <Meta title={product.name} />
          <Row className="my-4">
            <Col md={5}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    rating={product.rating}
                    reviews={product.numReviews}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price: </Col>
                      <Col>${product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status: </Col>
                      <Col>
                        {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(Number(e.target.value));
                              {
                                [...Array(product.countInStock).keys()].map(
                                  (item) => (
                                    <option key={item + 1} value={item + 1}>
                                      {item + 1}
                                    </option>
                                  )
                                );
                              }
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (count) => {
                                return (
                                  <option key={count + 1} value={count + 1}>
                                    {count + 1}
                                  </option>
                                );
                              }
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className="btn btn-black"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      )}
      <Row className="text-center">
        <Col>
          <Link
            className="btn btn-light col-3 my-5 bg-success text-white"
            to="/"
          >
            <FaArrowLeft /> Go Back
          </Link>
        </Col>
      </Row>
      <Row className="review">
        <Col md={6}>
          <h2>Reviews</h2>
          {product && product.reviews.lenght === 0 && (
            <Message>No Reviews</Message>
          )}
          <ListGroup variant="flush">
            {product &&
              product.reviews.map((review) => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating rating={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
            <ListGroup.Item>
              <h2>Write a Customer Review</h2>
              {loadingReviews && <Loader />}
              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Fair</option>
                      <option value="3">3 - Good</option>
                      <option value="4">4 - Very Good</option>
                      <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="comment" className="my-2">
                    <Form.Label>comment</Form.Label>
                    <Form.Control
                      as={"textarea"}
                      rows="3"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Button
                    disabled={loadingReviews}
                    type="submit"
                    variant="primary"
                  >
                    Submit
                  </Button>
                </Form>
              ) : (
                <Message>
                  Please <Link to="/login">sign in</Link> to write a review
                </Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetailsPage;
