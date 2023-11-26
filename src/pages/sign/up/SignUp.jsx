import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { memberApi } from "../../../apis/api/member/memberApi.jsx";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { authState } from "../../../recoil/atoms/auth/authState.jsx";

export default function SignUp() {
  const [signForm, setSignForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const authentication = useRecoilValue(authState);
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication) {
      return navigate("/");
    }
    navigate("/sign/in");
  }, [authentication]);

  const handleNameChange = (e) => {
    setSignForm((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleEmailChange = (e) => {
    setSignForm((prevState) => ({
      ...prevState,
      email: e.target.value,
    }));
    setIsEmailCheck(false);
  };

  const handlePasswordChange = (e) => {
    setSignForm((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
  };

  const emailCheck = async () => {
    if (!signForm.email) {
      alert("이메일을 입력하세요");
      return emailRef.current.focus();
    }
    await memberApi
      .emailCheck(signForm)
      .then(() => {
        alert("사용 가능한 이메일 입니다");
        setIsEmailCheck(true);
      })
      .catch(() => {
        alert("중복된 이메일 입니다");
        setIsEmailCheck(false);
      });
  };

  const signUp = async (e) => {
    e.preventDefault();

    if (!signForm.name) {
      alert("이름을 입력하세요");
      return nameRef.current.focus();
    }
    if (!signForm.email) {
      alert("이메일을 입력하세요");
      return emailRef.current.focus();
    }
    if (!signForm.password) {
      alert("비밀번호를 입력하세요");
      return passwordRef.current.focus();
    }
    if (!isEmailCheck) {
      alert("이메일 중복확인이 필요합니다");
      return;
    }
    await memberApi
      .signUp(signForm)
      .then(() => {
        alert("회원가입 성공");
        navigate("/sign/in");
      })
      .catch(() => {
        alert("회원가입 실패");
      });
  };

  return (
    <SignInWrapper>
      <SignInFormContainer onSubmit={signUp}>
        <SignInTitle>회원가입</SignInTitle>
        <SignInForm>
          <SignInInput
            type="text"
            name="name"
            ref={nameRef}
            value={signForm.name}
            onChange={handleNameChange}
            placeholder="이름"
          />
          <EmailInputWrapper>
            <SignInInput
              type="email"
              name="email"
              ref={emailRef}
              value={signForm.email}
              onChange={handleEmailChange}
              placeholder="이메일"
            />
            <SignInButton
              onClick={emailCheck}
              type="button"
              style={isEmailCheck ? { backgroundColor: "gray" } : {}}
            >
              {isEmailCheck ? "완료" : "확인"}
            </SignInButton>
          </EmailInputWrapper>
          <SignInInput
            type="password"
            name="password"
            ref={passwordRef}
            value={signForm.password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
          />
          <SignInButton type="submit">로그인</SignInButton>
        </SignInForm>
        <MovePageLink to="/sign/in">이전으로</MovePageLink>
      </SignInFormContainer>
    </SignInWrapper>
  );
}

const SignInWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh; /* 화면 전체 높이만큼 커버하도록 설정 */
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

const SignInInput = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #c2c2c2;
  border-radius: 4px;
  font-size: 16px;
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
  width: 100%;
`;

const EmailInputWrapper = styled.div`
  display: flex;
`;

const MovePageLink = styled(Link)`
  margin-top: 10px;
  text-align: center;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;
`;
