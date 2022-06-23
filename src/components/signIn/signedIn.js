import React from "react";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignedId() {
  const navigate = useNavigate();
  let now = new Date().getTime(); // expiration 5 minutes

  const redirectSignup = (e) => {
    e.preventDefault();
    navigate("/signup");
  };

  const redirectUsersList = (e) => {
    e.preventDefault();
    navigate("/user-details");
  };

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "isLogin",
      JSON.stringify({ isLogin: false, time: now })
    );
    window.location.reload();
  };

  return (
    <>
      <Container className="containerStyle">
        <Row>
          <Col sm={2} md={3} lg={4}></Col>
          <Col sm={8} md={6} lg={4} className="text-center">
            <Card className="mt-4">
              <Card.Header>
                جهت دسترسی به صفحه مورد نظر خود از منوی زیر اقدام نمایید
              </Card.Header>
              <Card.Body>
                <Form className="py-3 text-center d-inline-block">
                  <Button
                    className="btn-sm mx-4"
                    variant="primary"
                    type="submit"
                    onClick={redirectSignup}
                  >
                    فرم ثبت نام
                  </Button>
                  <Button
                    className="btn-sm mx-4"
                    variant="success"
                    type="submit"
                    onClick={redirectUsersList}
                  >
                    لیست کاربران
                  </Button>
                  <br></br>
                  <Button
                    className="btn-sm mt-5 mx-4"
                    variant="secondary"
                    type="submit"
                    onClick={handleLogOut}
                  >
                    خروج
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={2} md={3} lg={4}></Col>
        </Row>
      </Container>
    </>
  );
}
