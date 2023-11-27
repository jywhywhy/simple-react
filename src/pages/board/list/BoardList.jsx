import styled from "styled-components";
import { boardApi } from "../../../apis/api/board/boardApi.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoardList() {
  const [boardList, setBoardList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    list();
  }, []);

  const list = () => {
    boardApi.list().then((response) => {
      setBoardList(response.data);
    });
  };

  const handleAddPostClick = () => {
    navigate("/board/write");
  };

  const handelPostItemClick = (id) => {
    navigate(`/board/detail/${id}`);
  };

  return (
    <>
      <PostListWrapper>
        <AddPostButton onClick={handleAddPostClick}>글 작성</AddPostButton>

        {boardList.map((board) => (
          <PostItem
            key={board.id}
            onClick={() => handelPostItemClick(board.id)}
          >
            <PostTitle>{board.title}</PostTitle>
            <PostContent>{board.content}</PostContent>
          </PostItem>
        ))}
      </PostListWrapper>
    </>
  );
}

const PostListWrapper = styled.div`
  max-width: 600px;
  margin: 30px auto;
`;

const PostItem = styled.div`
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PostTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 5px;
`;

const PostContent = styled.p`
  font-size: 1rem;
  color: #333;
`;

const AddPostButton = styled.button`
  padding: 12px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 20px;
`;
