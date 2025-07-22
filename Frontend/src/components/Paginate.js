import { Button, Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ totalPages, page, isAdmin = false, keyword = "" }) => {
  return (
    totalPages > 1 && (
      <div>
        {Array.from({ length: totalPages }, (_, p) => (
            <Link
              key={p + 1} 
              to={
                !isAdmin
                  ? keyword
                    ? `/search/${keyword}/page/${p + 1}`
                    : `/page/${p + 1}`
                  : `/admin/productlist/${p + 1}`
              }
              className="text-black"
            >
              <Button 
                active={p + 1 === page} 
                variant={p + 1 === page ? "light" : "primary"}
                className="mx-1"
              >
                {p + 1}
              </Button>
            </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;
