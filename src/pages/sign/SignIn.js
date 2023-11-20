import SignInForm from "../../components/sign/SignInForm"
import { Link } from "react-router-dom";

export default function SignIn () {
    return (
        <>
            <SignInForm />
            <Link to="/sign-up">회원가입</Link>
            <br />

            <Link to="/">메인으로</Link>
        </>
    )
};
