import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useContext,  useEffect } from "react"
import { AuthContext } from "../Contexts/AuthContext"

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Entramos no useEffect')
    try {
        const now = JSON.parse(localStorage.getItem("user"));
        console.log(now)
        console.log('creeds 2, ainda não assisti pô');
        login(now);
        if (now) {
          navigate('/home');
        }
        
        
        
    } catch (error) {
        console.log('Errouu (provavelmente não existe ainda):' + error);
    }
  }, []);

  const { getUser, setToken, login} = useContext(AuthContext);

  const handleForm = (event, qual) => {
    qual(event.target.value);
  }

  const logUser = (e) => {
    e.preventDefault()

    const objt = {
      email: email,
      password: senha
    }

    axios.post(`${import.meta.env.VITE_API_URL}/`, objt)
      .then((res) => {
        console.log(res);
        console.log(res.data.token);
        setToken(res.data.token);
        getUser(res.data.token);
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    
  }

  return (
    <SingInContainer>
      <form onSubmit={logUser}>
        <MyWalletLogo />
        <input value={email} onChange={(event) => handleForm(event, setEmail)} placeholder="E-mail" type="email" />
        <input value={senha} onChange={(event) => handleForm(event, setSenha)} placeholder="Senha" type="password" autocomplete="new-password" />
        <button>Entrar</button>
      </form>

      <Link to={'/cadastro'}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
