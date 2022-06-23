import React from "react";
import SignedId from "../components/signIn/signedIn";
import SignIn from "../components/signIn/signIn";

export default function Home() {
  const loginDetail = JSON.parse(localStorage.getItem("isLogin"));

  let now = new Date().getTime(); // expiration 5 minutes
  if (loginDetail.isLogin) {
    if (now - loginDetail.time > 300000) {
      // expiration time 5 min
      localStorage.setItem(
        "isLogin",
        JSON.stringify({ isLogin: false, time: now })
      );
    }
  }

  if (!loginDetail.isLogin) {
    return <SignIn />;
  } else {
    return <SignedId />;
  }
}
