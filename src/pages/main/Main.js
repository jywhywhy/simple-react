import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { authState } from "../../recoil/atoms/auth/authState";
import styled from "styled-components";

export default function Main () {
    const [authentication, setAuthentication] = useRecoilState(authState)

    const handleSignOut = () => {
        return setAuthentication(false)
    }

    const LoginButton = () => {
        if (!authentication) {
            return <LinkButton to="/sign-in">로그인</LinkButton>
        } else {
            return <Button onClick={handleSignOut}>로그아웃</Button>
        }
    }

    return (
        <Container>
            <Form>
                <LoginButton />
            </Form>
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

const LinkButton = styled(Link)`
    text-decoration: none;
    text-align: center;
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