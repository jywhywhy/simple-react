import SignUpForm from "../../components/sign/SignUpForm";
import { Link } from "react-router-dom";

export default function SignUp () {
    return (
        <>
            <SignUpForm />
            <Link to="/sign-in">돌아가기</Link>
            <br />

            <Link to="/">메인으로</Link>
        </>
    )
};