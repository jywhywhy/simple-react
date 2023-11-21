import { useRef, useState} from "react"
import { useRecoilState } from "recoil";
import {Link, useNavigate} from "react-router-dom";
import { signState } from "../../recoil/atoms/sign/signState";
import axios from "axios";
import styled from "styled-components";

export default function SignUpForm () {
    const [isEmailCheck, setIsEmailCheck] = useState(false)
    const [signForm, setSignForm] = useRecoilState(signState)
    const navigate = useNavigate();
    const nameRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleNameChange = (e) => {
        setSignForm((prevValue) => ({
            ...prevValue,
            name: e.target.value
        }))
    }

    const handleEmailChange = (e) => {
        setSignForm((prevValue) => ({
            ...prevValue,
            email: e.target.value
        }))
        setIsEmailCheck(false)
    }
    const handlePasswordChange = (e) => {
        setSignForm((prevValue) => ({
            ...prevValue,
            password: e.target.value
        }))
    }

    const handleEmailCheck = async () => {
        if (!signForm.email) {
            alert("이메일을 입력하세요")
            return emailRef.current.focus()
        }
        await axios.post("http://localhost:9090/member/email/check", signForm)
            .then((res) => {
                setIsEmailCheck(true)
                return alert("사용 가능한 이메일 입니다")
            })
            .catch((e) => {
                setIsEmailCheck(false)
                return alert("중복된 이메일 입니다")
            })
    }

    const handleSignUp = async () => {
        if (!signForm.name) {
            alert("이름을 입력하세요")
            return nameRef.current.focus()
        }
        if (!signForm.email) {
            alert("이메일을 입력하세요")
            return emailRef.current.focus()
        }
        if (!signForm.password) {
            alert("비밀번호를 입력하세요")
            return passwordRef.current.focus()
        }
        if (!isEmailCheck) {
            alert("이메일 중복확인이 필요합니다")
            return
        }
        await axios.post("http://localhost:9090/member/sign/up", signForm)
            .then((res) => {
                setSignForm((prevValue) => ({
                    ...prevValue,
                    password: ""
                }))
                alert("회원가입 성공")
                navigate("/sign-in")
            })
            .catch((e) => {
                alert("회원가입 실패")
            })
    }

    return (
        <Container>
            <Form>
                <label htmlFor="email">이름:</label>
                <Input type="text" id="name" name="name" ref={nameRef} value={signForm.name} onChange={handleNameChange} required />

                <label htmlFor="email">이메일:</label>
                <InputContainer>
                    <Input type="text" id="email" name="email" ref={emailRef} value={signForm.email} onChange={handleEmailChange} required />
                    <Button type="button" onClick={handleEmailCheck} disabled={isEmailCheck} style={isEmailCheck ? { backgroundColor: 'gray' } : {}}>{isEmailCheck ? "확인완료" : "중복확인"}</Button>
                </InputContainer>

                <label htmlFor="password">비밀번호:</label>
                <Input type="password" id="password" name="password" ref={passwordRef} value={signForm.password} onChange={handlePasswordChange} required />

                <Button type="button" onClick={handleSignUp}>회원가입</Button>
            </Form>

            <LinkWrap>
                <LinkSpan><Link to="/sign-in">돌아가기</Link></LinkSpan>
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
    flex: 1;
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
    margin-bottom: 15px;
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

const InputContainer = styled.div`
    display: flex;
`

