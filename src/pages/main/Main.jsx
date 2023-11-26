import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/auth/authState.jsx";

export default function Main() {
  const authentication = useRecoilValue(authState);
  const navigate = useNavigate();

  useEffect(() => {
    if (authentication) {
      return navigate("/");
    }
    navigate("/sign/in");
  }, [authentication]);
}
