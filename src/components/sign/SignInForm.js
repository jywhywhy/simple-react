import { useRef } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { signState } from "../../recoil/atoms/sign/signState";
import { authState } from "../../recoil/atoms/auth/authState";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";

export default function SignInForm () {
    const [signForm, setSignForm] = useRecoilState(signState)
    const setAuthentication = useSetRecoilState(authState)
    const emailRef = useRef()
    const passwordRef = useRef()
    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        setSignForm((prevValue) => ({
            ...prevValue,
            email: e.target.value
        }))
    }
    const handlePasswordChange = (e) => {
        setSignForm((prevValue) => ({
            ...prevValue,
            password: e.target.value,
        }))
    }

    const handleSignIn = async () => {
        if (!signForm.email) {
            alert("이메일을 입력하세요")
            return emailRef.current.focus()
        }
        if (!signForm.password) {
            alert("비밀번호를 입력하세요")
            return passwordRef.current.focus()
        }
        await axios.post("http://localhost:9090/member/sign/in", signForm)
            .then((res) => {
                setAuthentication(true)
                alert("로그인 성공")
                setSignForm((prevValue) => ({
                    ...prevValue,
                    password: "",
                }))
                navigate("/")
            })
            .catch((e) => {
                setAuthentication(false)
                alert("로그인 실패")
            })
    }

    return (
            <Container className="login-container" >
                <Form>
                    <label htmlFor="email">Username:</label>
                    <Input type="text" id="email" name="email" ref={emailRef} value={signForm.email} onChange={handleEmailChange} required />

                    <label htmlFor="password">Password:</label>
                    <Input type="password" id="password" name="password" ref={passwordRef} value={signForm.password} onChange={handlePasswordChange} required />

                    <Button type="button" onClick={handleSignIn}>Login</Button>
                </Form>

                <LinkWrap>
                    <LinkSpan><Link to="/sign-up">회원가입</Link></LinkSpan>
                    <LinkSpan style={{ marginLeft: '10px' }}><Link to="/">메인으로</Link></LinkSpan>
                </LinkWrap>
            </Container>
    )
}

const Container = styled.div`
        width: 300px;
        margin: 100px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    `

const Form = styled.form`
        display: flex;
        flex-direction: column;
    `

const Input = styled.input`
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-bottom: 15px;
    `

const Button = styled.button`
        background-color: #4caf50;
        color: white;
        padding: 10px 15px;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
            background-color: #45a049;
        }
    `

const LinkWrap = styled.div`
        margin-top: 15px
    `

const LinkSpan = styled.span`
        color: #007bff;
        text-decoration: underline;
        cursor: pointer;
    `