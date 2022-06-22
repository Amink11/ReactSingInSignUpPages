import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "../style/signup.css";
import { Form, Modal, Button, Container, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  // Declare a new state variables
  const [userDetail, setUserDetail] = useState([]);
  const [singupNewUser, setSignUpNewUser] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nationalId: "",
  });
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [phoneNumberError, setPhoneError] = useState("");
  const [nationalIdError, setNationalIdError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    setUserDetail(userDetails);
  }, []);

  //handlers

  const handleAddNewSignup = (e) => {
    e.preventDefault();
    const inputName = e.target.getAttribute("name");
    const inputValue = e.target.value;

    const newUser = { ...singupNewUser };
    newUser[inputName] = inputValue;
    setSignUpNewUser(newUser);
  };

  const handleFormValidation = () => {
    const newUserSignup = {
      id: nanoid(),
      firstName: singupNewUser.firstName,
      lastName: singupNewUser.lastName,
      phoneNumber: singupNewUser.phoneNumber,
      nationalId: singupNewUser.nationalId,
    };
    const firstName = newUserSignup.firstName;

    if (!firstName) {
      setFirstNameError("مقدار نام نباید خالی باشد");
      return false;
    } else {
      setFirstNameError("");
    }
    const lastName = newUserSignup.lastName;
    if (!lastName) {
      setLastNameError("مقدار نام‌خانوادگی نباید خالی باشد");
      return false;
    } else {
      setLastNameError("");
    }
    // Convert Arabic/Persian numbers to English
    const changeNumber = (s) =>
      s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

    const phoneNumber = changeNumber(newUserSignup.phoneNumber);
    if (!phoneNumber) {
      setPhoneError("شماره همراه نباید خالی باشد");
      return false;
    } else if (isNaN(phoneNumber)) {
      setPhoneError("شماره همراه باید عدد باشد");
      return false;
    } else if (phoneNumber.length !== 11) {
      setPhoneError("شماره همراه باید ۱۱ رقم باشد");
      return false;
    } else {
      setPhoneError("");
    }
    const nationalId = changeNumber(newUserSignup.nationalId);
    if (!nationalId) {
      setNationalIdError("کد ملی نباید خالی باشد");
      return false;
    } else if (isNaN(nationalId)) {
      setNationalIdError("کد ملی باید عدد باشد");
      return false;
    } else if (nationalId.length !== 10) {
      setNationalIdError("کد ملی باید ۱۰ رقم باشد");
      return false;
    } else {
      setNationalIdError("");
    }
    return true;
  };

  setTimeout(() => {
    setFirstNameError("");
    setLastNameError("");
    setPhoneError("");
    setNationalIdError("");
  }, 4000);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    const newUserSignup = {
      id: nanoid(),
      firstName: singupNewUser.firstName,
      lastName: singupNewUser.lastName,
      phoneNumber: singupNewUser.phoneNumber,
      nationalId: singupNewUser.nationalId,
    };
    handleFormValidation();

    if (handleFormValidation()) {
      const newUsers = [...userDetail, newUserSignup];
      setUserDetail(newUsers);
      localStorage.setItem("userDetails", JSON.stringify(newUsers));
      JSON.parse(localStorage.getItem("userDetails"));
      setShowModal(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <Container className="containerStyle">
      <Row>
      <Col sm={2} md={2} lg={4}></Col>
          <Col sm={8} md={8} lg={4}>
        <Card className="mt-4">
          <Card.Header>فرم ثبت نام</Card.Header>
          <Card.Body>
          <Form
              onSubmit={handleSignupSubmit}
              className="py-3 text-center d-inline-block"
            >
              <Form.Group className="m-3">
                <Form.Control
                  className="inputField"
                  type="text"
                  name="firstName"
                  placeholder="نام"
                  value={userDetail.firstName}
                  onChange={handleAddNewSignup}
                ></Form.Control>
                <Form.Text className="text-danger">
                  {firstNameError && (
                    <span className="position-static">{firstNameError}</span>
                  )}
                </Form.Text>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Control
                  className="inputField"
                  type="text"
                  name="lastName"
                  placeholder="نام‌خانوادگی"
                  onChange={handleAddNewSignup}
                ></Form.Control>
                <Form.Text className="text-danger">
                  {lastNameError && (
                    <span className="position-static">{lastNameError}</span>
                  )}
                </Form.Text>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Control
                  className="inputField"
                  type="text"
                  name="phoneNumber"
                  placeholder="شماره‌موبایل"
                  onChange={handleAddNewSignup}
                ></Form.Control>
                <Form.Text className="text-danger">
                  {phoneNumberError && (
                    <span className="position-static">
                      {phoneNumberError}
                    </span>
                  )}
                </Form.Text>
              </Form.Group>
              <Form.Group className="m-3">
                <Form.Control
                  className="inputField"
                  type="text"
                  name="nationalId"
                  placeholder="کد ملی"
                  onChange={handleAddNewSignup}
                ></Form.Control>
                <Form.Text className="text-danger">
                  {nationalIdError && (
                    <span className="position-static">{nationalIdError}</span>
                  )}
                </Form.Text>
              </Form.Group>
              <Button variant="success" type="submit">
                ثبت
              </Button>
            </Form>
          </Card.Body>
        </Card>
          </Col>
          <Col sm={2} md={2} lg={4}></Col>
        </Row>
      </Container>
      {showModal && (
        <Modal
          className="text-center"
          show={showModal}
          // centered
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
        >
          <Modal.Body>
            <span className="text-success">ثبت نام با موفقیت انجام شد</span>
            <hr></hr>
            در حال انتقال به صفحه ورود
          </Modal.Body>
        </Modal>
      )}
    </>
  );
}
