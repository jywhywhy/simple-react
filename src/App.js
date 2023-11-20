import React from "react"
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { RecoilRoot } from "recoil"
import SignIn from "./pages/sign/SignIn"
import SignUp from "./pages/sign/SignUp";
import Main from "./pages/main/Main";

export default function App() {
  return (
      <RecoilRoot>
          <BrowserRouter>
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-up" element={<SignUp />} />
              </Routes>
          </BrowserRouter>
      </RecoilRoot>
  )
}
