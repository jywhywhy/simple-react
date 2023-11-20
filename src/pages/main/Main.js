import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth/authState";

export default function Main () {
    const [authentication, setAuthentication] = useRecoilState(authState)

    const handleSignOut = () => {
        return setAuthentication(false)
    }

    const isAuthentication = () => {
        if (!authentication) {
            return <Link to="/sign-in">로그인</Link>
        } else {
            return <button onClick={handleSignOut}>로그아웃</button>
        }
    }

    return (
        <div>
            {isAuthentication()}
        </div>
    )
};
