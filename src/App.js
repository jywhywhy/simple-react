import React from "react";
import "./App.css";
import { RecoilRoot } from "recoil";
import Auth from "./components/auth/Auth.jsx";
import Router from "./components/router/Router.jsx";

export default function App() {
  return (
    <RecoilRoot>
      <Router />
      <Auth />
    </RecoilRoot>
  );
}
