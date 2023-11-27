import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth/authState.jsx";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const [authentication, setAuthentication] = useRecoilState(authState);
  const navigate = useNavigate();

  const signOut = () => {
    sessionStorage.removeItem("id");
    setAuthentication(false);
    navigate("/");
  };

  return (
    <TopBarWrapper>
      <TopBarTitle>97</TopBarTitle>
      <TopBarMenu>
        <TopBarLink to="/board/list">게시판</TopBarLink>
        {authentication ? (
          <TopBarLink onClick={signOut} to="#">
            로그아웃
          </TopBarLink>
        ) : (
          <TopBarLink to="/sign/in">로그인</TopBarLink>
        )}
      </TopBarMenu>
    </TopBarWrapper>
  );
}

const TopBarWrapper = styled.div`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TopBarTitle = styled.h1`
  margin: 0;
`;

const TopBarMenu = styled.div`
  display: flex;
  gap: 20px;
`;

const TopBarLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
`;
