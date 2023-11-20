import { useRef, useState} from "react"
import { useRecoilState } from "recoil";
import { signState } from "../../recoil/atoms/sign/signState";
import axios from "axios";

export default function SignUpForm () {
    const [isEmailCheck, setIsEmailCheck] = useState(false)
    const [signForm, setSignForm] = useRecoilState(signState)
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
            })
            .catch((e) => {
                alert("회원가입 실패")
            })
    }

    return (
        <div>
            <input type="text" value={signForm.name} placeholder="이름" onChange={handleNameChange} ref={nameRef} /> 
            <br />
            
            <input type="text" value={signForm.email} placeholder="이메일" onChange={handleEmailChange} ref={emailRef} />
            <button onClick={handleEmailCheck} disabled={isEmailCheck}>{isEmailCheck ? "확인완료" : "중복확인"}</button>
            <br />

            <input type="password" value={signForm.password} placeholder="비밀번호" onChange={handlePasswordChange} ref={passwordRef} />
            <br />

            <button onClick={handleSignUp}>회원가입</button>
        </div>
    )
}