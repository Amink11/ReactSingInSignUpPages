import React from "react";
import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function UserNotSignedIn() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <>
      <Container className="containerStyle">
        <Row>
          <Col sm={2} md={3} lg={4}></Col>
          <Col sm={8} md={6} lg={4} className="text-center">
            <Card className="mt-4">
              <Card.Header className="text-danger">دسترسی ندارید!</Card.Header>
              <Card.Body>
                <Form className="mt-1 py-1 text-center d-inline-block">
                  <h6>ابتدا ثبت نام کنید یا وارد حساب کاربری خود شوید</h6>
                  <br></br>
                </Form>

                <Button
                  className="btn-sm mt-5 mx-4"
                  variant="success"
                  type="submit"
                  onClick={handleSignup}
                >
                  ثبت نام
                </Button>
                <Button
                  className="btn-sm mt-5 mx-4"
                  variant="primary"
                  type="submit"
                  onClick={handleSignIn}
                >
                  ورود
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2} md={3} lg={4}></Col>
        </Row>
      </Container>
    </>
  );
}
