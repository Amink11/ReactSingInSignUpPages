import React from "react";
import { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Button,
  Container,
  Row,
  Col,
  Card,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/signup.css";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [userDetail, setUserDetail] = useState([]);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  let now = new Date().getTime(); // expiration 5 minutes

  useEffect(() => {
    setUserDetail(JSON.parse(localStorage.getItem("userDetails")));
  }, []);

  const handleuserName = (e) => {
    e.preventDefault();
    setUserName(e.target.value);
  };

  const handleuserPassword = (e) => {
    e.preventDefault();
    setUserPassword(e.target.value);
  };

  const handleUserSignIn = (e) => {
    e.preventDefault();
    let index = userDetail.findIndex(
      (user) =>
        user.phoneNumber === userName && user.nationalId === userPassword
    );
    if (index !== -1) {
      setShowModal(true);
      localStorage.setItem(
        "isLogin",
        JSON.stringify({ isLogin: true, time: now })
      );
      setTimeout(() => {
        navigate("/user-details");
      }, 2000);
      setUserError("");
    } else {
      setUserError("نام کاربری یا رمز عبور اشتباه است");
      setTimeout(() => {
        setUserError("");
      }, 2000);
      localStorage.setItem(
        "isLogin",
        JSON.stringify({ isLogin: false, time: now })
      );
    }
  };

  return (
    <>
      <Modal
        className="text-center"
        show={showModal}
        // centered
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Modal.Body>
          <span className="text-success">ورود موفقیت‌آمیز</span>
          <hr></hr>
          در حال انتقال
        </Modal.Body>
      </Modal>

      <Container className="containerStyle">
        <Row>
          <Col sm={2} md={3} lg={4}></Col>
          <Col sm={8} md={6} lg={4}>
            <Card className="mt-4">
              <Card.Header>
                برای ورود نام کاربری و پسورد را وارد نمایید
              </Card.Header>
              <Card.Body>
                <Form
                  onSubmit={handleUserSignIn}
                  className=" py-3 text-center d-inline-block"
                >
                  <Form.Group className="mb-3 mx-5 inputField">
                    <Form.Label>
                      نام کاربری{" "}
                      <span className="text-muted">( شماره موبایل )</span>
                    </Form.Label>
                    <Form.Control
                      onChange={handleuserName}
                      type="text"
                      placeholder="شماره موبایل"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 mx-5 position-static inputField">
                    <Form.Label>
                      رمز عبور <span className="text-muted">( کد ملی )</span>
                    </Form.Label>
                    <Form.Control
                      onChange={handleuserPassword}
                      type="password"
                      placeholder="کد ملی"
                    />
                    <Form.Text className="text-danger">
                      {userError && (
                        <span className="position-static">{userError}</span>
                      )}
                    </Form.Text>
                  </Form.Group>
                  <Button className="mt-4" variant="primary" type="submit">
                    ورود
                  </Button>
                </Form>
              </Card.Body>
            </Card>{" "}
          </Col>
          <Col sm={2} md={3} lg={4}></Col>
        </Row>
      </Container>
    </>
  );
}
