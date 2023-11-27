import React, { useState } from "react";
import styled from "styled-components";
import { boardApi } from "../../../apis/api/board/boardApi.jsx";
import { useNavigate } from "react-router-dom";

export default function BoardWrite() {
  const [boardForm, setBoardForm] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  const write = (e) => {
    e.preventDefault();

    boardApi
      .write(boardForm)
      .then(() => {
        alert("글 작성 성공");
        navigate("/board/list");
      })
      .catch(() => {
        alert("글 작성 실패");
      });
  };

  const handleTitleChange = (e) => {
    setBoardForm((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };

  const handleContentChange = (e) => {
    setBoardForm((prevState) => ({
      ...prevState,
      content: e.target.value,
    }));
  };

  return (
    <PostFormWrapper>
      <Form onSubmit={write}>
        <Input
          type="text"
          id="title"
          value={boardForm.title}
          onChange={handleTitleChange}
          placeholder="제목"
        />
        <TextArea
          id="content"
          value={boardForm.content}
          onChange={handleContentChange}
          placeholder="내용"
        />
        <SubmitButton type="submit">글 작성</SubmitButton>
      </Form>
    </PostFormWrapper>
  );
}

const PostFormWrapper = styled.div`
  max-width: 600px;
  margin: 60px auto;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  height: 60vh;
`;

const Input = styled.input`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
  font-size: 1rem;
  height: 100%;
`;

const SubmitButton = styled.button`
  padding: 12px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
`;
