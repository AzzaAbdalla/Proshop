import { useEffect, useState } from "react";
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/usersApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import FormContainer from "../../components/FormContainer";
import { Button, Form } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UserEditPage = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserDetailsQuery(userId);

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email are required.");
      return;
    }
    try {
      await updateUser({
        userId,
        name: name.trim(),
        email: email.trim(),
        isAdmin,
      }).unwrap();
      toast.success(
        isAdmin
          ? `${name.trim()} can now manage the shop`
          : `${name.trim()} was updated`
      );
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/userlist" className="back-link">
        Back to people
      </Link>
      <FormContainer>
        <p className="section-kicker">Admin</p>
        <h1>Edit account</h1>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Form onSubmit={submitHandler} className="admin-form">
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="isAdmin" className="admin-switch">
              <Form.Check
                type="switch"
                label="Admin access"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <p>
                Admins can create products, manage orders, and edit other
                accounts.
              </p>
            </Form.Group>

            <Button
              type="submit"
              variant="success"
              className="my-3"
              disabled={isUpdating}
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditPage;
