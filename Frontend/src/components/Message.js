import { Alert } from "react-bootstrap";

const Message = ({ variant = "success", children }) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
