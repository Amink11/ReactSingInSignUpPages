import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import UserNotSignedIn from "../components/userList/userNotSignedIn";
import UserList from "../components/userList/userList";

export default function SignupTable() {
  const users = JSON.parse(localStorage.getItem("userDetails"));
  const login = JSON.parse(localStorage.getItem("isLogin"));
  const [userDetail, setUserDetail] = useState(users);
  const [loginDetail, setLoginDetail] = useState({});


  let now = new Date().getTime(); // expiration 5 minutes

  useEffect(() => {
    setUserDetail(users);
    setLoginDetail(login);
  }, []);

  if (loginDetail.isLogin) {
    if (now - loginDetail.time > 300000) {
      localStorage.setItem(
        "isLogin",
        JSON.stringify({ isLogin: false, time: now })
      );
    }
  }

  if (loginDetail.isLogin) {
    return <UserList userDetail={userDetail} />;
  } else {
    return <UserNotSignedIn />;
  }
}
