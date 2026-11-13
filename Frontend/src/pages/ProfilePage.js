import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/ordersApiSlice";
import Message from "../components/Message";
import { Link } from "react-router-dom";

const formatDate = (value) =>
  new Date(value).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const ProfilePage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [name, setName] = useState(userInfo?.name || "");
  const [email, setEmail] = useState(userInfo?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const [profileUpdate, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const {
    data: orders,
    isLoading: loadingOrders,
    error: ordersError,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    if ((password || confirmPassword) && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await profileUpdate({
        _id: userInfo._id,
        name: name.trim(),
        email: email.trim(),
        password,
      }).unwrap();
      dispatch(setCredentials(res));
      setPassword("");
      setConfirmPassword("");
      toast.success("Profile updated");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="profile-page">
      <div className="admin-page__header">
        <div>
          <p className="section-kicker">Account</p>
          <h1>{userInfo?.name || "Profile"}</h1>
          <p className="section-meta">{userInfo?.email}</p>
        </div>
        {userInfo?.isAdmin && (
          <span className="role-pill role-pill--admin">Admin</span>
        )}
      </div>

      <Row className="g-4">
        <Col lg={4}>
          <section className="profile-card">
            <h2>Your details</h2>
            <p className="section-meta">
              Change your name or email. Add a password only if you want a new
              one.
            </p>
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  autoComplete="name"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="you@email.com"
                  value={email}
                  autoComplete="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Leave blank to keep the current one"
                  value={password}
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Repeat the new password"
                  value={confirmPassword}
                  autoComplete="new-password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              <Button
                type="submit"
                variant="success"
                disabled={loadingUpdateProfile}
              >
                Save changes
              </Button>
              {loadingUpdateProfile && <Loader />}
            </Form>
          </section>
        </Col>
        <Col lg={8}>
          <section className="profile-orders">
            <div className="profile-orders__head">
              <h2>Orders</h2>
              {orders && (
                <p className="section-meta">
                  {orders.length} {orders.length === 1 ? "order" : "orders"}
                </p>
              )}
            </div>
            {loadingOrders ? (
              <Loader />
            ) : ordersError ? (
              <Message variant="danger">
                {ordersError?.data?.message ||
                  ordersError?.data?.error ||
                  ordersError.error}
              </Message>
            ) : orders.length === 0 ? (
              <Message>
                No orders yet. <Link to="/">Browse the catalog</Link>
              </Message>
            ) : (
              <Table responsive className="admin-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Delivery</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>
                        <span className="order-id" title={order._id}>
                          {order._id.slice(-6).toUpperCase()}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        {order.isPaid ? (
                          <span className="status-pill status-pill--ok">
                            {formatDate(order.paidAt)}
                          </span>
                        ) : (
                          <span className="status-pill">Unpaid</span>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <span className="status-pill status-pill--ok">
                            {formatDate(order.deliveredAt)}
                          </span>
                        ) : (
                          <span className="status-pill">Not shipped</span>
                        )}
                      </td>
                      <td>
                        <Link
                          to={`/order/${order._id}`}
                          className="btn btn-light btn-sm"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </section>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
