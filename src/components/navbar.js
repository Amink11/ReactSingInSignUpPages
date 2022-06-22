import React from "react";
import {Navbar, Nav, Container} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navigation() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Nav>
          <Nav.Link href="/">خانه</Nav.Link>
          <Nav.Link href="/signup">ثبت نام</Nav.Link>
          <Nav.Link href="/user-details">لیست کاربران</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
