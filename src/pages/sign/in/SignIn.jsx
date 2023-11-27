import { useEffect, useRef, useState } from "react";
import { memberApi } from "../../../apis/api/member/memberApi.jsx";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authState } from "../../../recoil/atoms/auth/authState.jsx";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import SignInput from "../../../components/sign/SignInput.jsx";

export default function SignIn() {
  const [signForm, setSignForm] = useState({
    email: "",
    password: "",
  });
  const authentication = useRecoilValue(authState);
  const emailRef = useRef();
  const passwordRef = useRef();
  const setAuthentication = useSetRecoilState(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication) {
      return navigate("/");
    }
    navigate("/sign/in");
  }, [authentication]);

  const handleEmailChange = (e) => {
    setSignForm((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
  };

  const handlePasswordChange = (e) => {
    setSignForm((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const signIn = async (e) => {
    e.preventDefault();

    if (!signForm.email) {
      alert("이메일을 입력하세요");
      return emailRef.current.focus();
    }
    if (!signForm.password) {
      alert("비밀번호를 입력하세요");
      return passwordRef.current.focus();
    }

    await memberApi
      .signIn(signForm)
      .then((response) => {
        setAuthentication(true);
        sessionStorage.setItem("id", response.data);
        alert("환영합니다");
        navigate("/");
      })
      .catch(() => {
        setAuthentication(false);
        alert("아이디나 비밀번호를 확인하세요");
      });
  };

  return (
    <SignInWrapper>
      <SignInFormContainer onSubmit={signIn}>
        <SignInTitle>로그인</SignInTitle>
        <SignInForm>
          <SignInput
            type="email"
            name="email"
            forwardedRef={emailRef}
            value={signForm.email}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
          <SignInput
            type="password"
            name="password"
            forwardedRef={passwordRef}
            value={signForm.password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <SignInButton ty="submit">로그인</SignInButton>
        </SignInForm>
        <MovePageLink to="/sign/up">회원가입</MovePageLink>
      </SignInFormContainer>
    </SignInWrapper>
  );
}

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SignInFormContainer = styled.div`
  max-width: 300px;
  width: 100%;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const SignInTitle = styled.h2`
  text-align: center;
  color: #000;
`;

const SignInForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const SignInButton = styled.button`
  margin-bottom: 15px;
  background-color: #000;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const MovePageLink = styled(Link)`
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
`;
