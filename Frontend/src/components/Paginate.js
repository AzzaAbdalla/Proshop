import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ totalPages, page, isAdmin = false, keyword = "" }) => {
  return (
    totalPages > 1 && (
      <Pagination>
        {Array.from({ length: totalPages }, (_, p) => (
          <Pagination.Item key={p + 1} active={p + 1 === page}>
            <Link
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : `/page/${p + 1}`
                  : `/admin/productlist/${p + 1}`
              }
              className="text-black"
            >
              {p + 1}
            </Link>
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
