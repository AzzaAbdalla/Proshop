import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className="text-center py-4">
            <p className="site-footer__brand">Proshop</p>
            <p className="mb-1">Everyday tech, ready to ship.</p>
            <p className="mb-0">Proshop &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
