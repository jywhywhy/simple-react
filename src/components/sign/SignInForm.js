import { useRef } from "react"
import { useRecoilState, useSetRecoilState } from "recoil";
import { signState } from "../../recoil/atoms/sign/signState";
import { authState } from "../../recoil/atoms/auth/authState";
import axios from "axios";

export default function SignInForm () {
    const [signForm, setSignForm] = useRecoilState(signState)
    const setAuthentication = useSetRecoilState(authState)
    const emailRef = useRef()
    const passwordRef = useRef()

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
            })
            .catch((e) => {
                setAuthentication(false)
                alert("로그인 실패")
            })
    }

    return (
        <div>
            <input type="text" value={signForm.email} placeholder="이메일" onChange={handleEmailChange} ref={emailRef} />
            <br />

            <input type="password" value={signForm.password} placeholder="비밀번호" onChange={handlePasswordChange} ref={passwordRef} />
            <br />

            <button onClick={handleSignIn}>로그인</button>
        </div>
    )
}