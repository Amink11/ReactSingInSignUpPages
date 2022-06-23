import React, { useState } from "react";
import {
  Table,
  Container,
  Button,
  Row,
  Col,
  Form,
  Card,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function UserList(users) {
  const [searchSelectValue, setSearchSelectValue] = useState("");
  const [searchFieldValue, setSearchFieldValue] = useState("");
  const [userDetail, setUserDetail] = useState(users.userDetail);

  const handleDeleteBtn = (userId) => {
    const newUsers = JSON.parse(localStorage.getItem("userDetails"));
    const index = userDetail.findIndex((user) => user.id === userId);
    newUsers.splice(index, 1);
    localStorage.setItem("userDetails", JSON.stringify(newUsers));
    setUserDetail(newUsers);
  };

  const handleSelectMenuValue = (e) => {
    e.preventDefault();
    setSearchSelectValue(e.target.value);
  };

  const handleSearchField = (e) => {
    e.preventDefault();
    setSearchFieldValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setUserDetail(users);
    if (searchFieldValue && searchSelectValue) {
      let newUserList = userDetail.filter(
        (user) => user[searchSelectValue] === searchFieldValue
      );
      setUserDetail(newUserList);
    }
  };

  const handleSearchReset = () => {
    document.getElementById("searchSelect").value = 0;
    document.getElementById("serachInput").value = "";
    setUserDetail(users);
  };
  return (
    <>
      <Container className="w-100">
        <Card className="mt-4">
          <Card.Header>جدول کاربران</Card.Header>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Form>
                <Row>
                  <Col>
                    <Form.Select
                      onChange={handleSelectMenuValue}
                      id="searchSelect"
                      aria-label="Default select example"
                    >
                      <option value="0" className="text-center">
                        انتخاب
                      </option>
                      <option value="firstName">نام</option>
                      <option value="lastName">نام‌خانوادگی</option>
                      <option value="phoneNumber">شماره‌تلفن</option>
                      <option value="nationalId">کد ملی</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    {" "}
                    <Form.Group onChange={handleSearchField} className="mb-3">
                      <Form.Control
                        id="serachInput"
                        type="text"
                        placeholder="جست و جو ..."
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      onClick={handleSearch}
                      className="mr-2"
                      variant="info"
                      type="button"
                    >
                      فیلتر
                    </Button>
                    <Button
                      onClick={handleSearchReset}
                      className="mx-2"
                      variant="secondary"
                      type="button"
                    >
                      ریست
                    </Button>
                  </Col>
                  <Col sm={0} md={3} lg={3}></Col>
                </Row>
              </Form>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Table
              striped
              bordered
              hover
              variant="light"
              className="tableStyle text-center"
            >
              <thead>
                <tr>
                  <th>نام</th>
                  <th>نام‌خانوادگی</th>
                  <th>شماره تلفن</th>
                  <th>کد ملی</th>
                  <th>عملیات</th>
                </tr>
              </thead>
              <tbody>
                {userDetail.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.nationalId}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleDeleteBtn(user.id)}
                      >
                        حذف
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
