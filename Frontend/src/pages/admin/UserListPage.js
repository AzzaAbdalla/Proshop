import { Button, Table } from "react-bootstrap";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../../slices/usersApiSlice";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const UserListPage = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data: users, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const deleteUserHandler = async (user) => {
    if (user.isAdmin) {
      toast.error("Admin accounts cannot be deleted.");
      return;
    }
    if (user._id === userInfo?._id) {
      toast.error("You cannot delete the account you are using.");
      return;
    }
    if (!window.confirm(`Remove ${user.name}? They will no longer be able to sign in.`)) {
      return;
    }
    try {
      await deleteUser(user._id).unwrap();
      toast.success(`${user.name} was removed`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-page__header">
        <div>
          <p className="section-kicker">Admin</p>
          <h1>People</h1>
          {users && (
            <p className="section-meta">
              {users.length} {users.length === 1 ? "account" : "accounts"}
            </p>
          )}
        </div>
      </div>
      {isDeleting && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : users.length === 0 ? (
        <Message>No accounts yet.</Message>
      ) : (
        <Table responsive className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <strong>{user.name}</strong>
                  {user._id === userInfo?._id && (
                    <span className="you-label">You</span>
                  )}
                </td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  <span className={user.isAdmin ? "role-pill role-pill--admin" : "role-pill"}>
                    {user.isAdmin ? "Admin" : "Customer"}
                  </span>
                </td>
                <td className="admin-actions">
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <FaEdit /> Edit
                    </Button>
                  </Link>
                  <Button
                    variant="outline-danger"
                    className="btn-sm"
                    disabled={user.isAdmin}
                    onClick={() => deleteUserHandler(user)}
                  >
                    <FaTrash /> Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserListPage;
