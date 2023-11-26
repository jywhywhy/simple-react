import { useSetRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth/authState.jsx";
import { useEffect } from "react";

export default function Auth() {
  const setAuthentication = useSetRecoilState(authState);

  useEffect(() => {
    if (sessionStorage.getItem("id") > 0) {
      setAuthentication(true);
    }
  }, []);
}
