import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import { boardApi } from "../../../apis/api/board/boardApi.jsx";

export default function BoardDetail() {
  const [boardForm, setBoardForm] = useState({
    id: "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setBoardForm((prevState) => ({
      ...prevState,
      id: id,
    }));
    detail();
  }, []);

  const detail = () => {
    boardApi
      .detail(id)
      .then((response) => {
        setBoardForm(response.data);
      })
      .catch(() => {
        alert("게시물 정보 없음");
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

  const update = (e) => {
    e.preventDefault();

    boardApi
      .update(boardForm)
      .then(() => {
        alert("수정 성공");
        navigate(`/board/detail/${id}`);
      })
      .catch(() => {
        alert("수정 실패");
      });
  };

  const drop = () => {
    boardApi
      .drop(id)
      .then(() => {
        alert("삭제 성공");
        navigate("/board/list");
      })
      .catch(() => {
        alert("삭제 실패");
      });
  };

  return (
    <PostFormWrapper>
      <Form onSubmit={update}>
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
        <SubmitButton type="submit">글 수정</SubmitButton>
        <SubmitButton type="button" onClick={drop}>
          글 삭제
        </SubmitButton>
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
  margin-bottom: 4px;
`;
