import { Button, Table } from "react-bootstrap";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../slices/productApiSlice";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Paginate from "../../components/Paginate";

const ProductListPage = () => {
  const { pageNumber } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const createProductHandler = () => {
    navigate("/admin/product/new/edit");
  };

  const deleteProductHandler = async (product) => {
    if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
      return;
    }
    try {
      await deleteProduct(product._id).unwrap();
      refetch();
      toast.success(`${product.name} was deleted`);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <div className="admin-page__header">
        <div>
          <p className="section-kicker">Admin</p>
          <h1>Products</h1>
        </div>
        <Button variant="success" onClick={createProductHandler}>
          <FaPlus /> Create product
        </Button>
      </div>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Table responsive className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.countInStock}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm mx-2">
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      className="btn-sm"
                      onClick={() => deleteProductHandler(product)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate
            totalPages={data.totalPages}
            page={data.page}
            isAdmin={true}
          />
        </>
      )}
    </>
  );
};

export default ProductListPage;
