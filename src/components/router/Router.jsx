import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../../pages/main/Main.jsx";
import SignUp from "../../pages/sign/up/SignUp.jsx";
import SignIn from "../../pages/sign/in/SignIn.jsx";
import TopBar from "../common/TopBar.jsx";
import React from "react";
import BoardList from "../../pages/board/list/BoardList.jsx";
import BoardWrite from "../../pages/board/write/BoardWrite.jsx";
import BoardDetail from "../../pages/board/detail/BoardDetail.jsx";

export default function Router() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/sign/up" element={<SignUp />} />
        <Route path="/sign/in" element={<SignIn />} />
        <Route path="/board/list" element={<BoardList />} />
        <Route path="/board/write" element={<BoardWrite />} />
        <Route path="/board/detail/:id" element={<BoardDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
