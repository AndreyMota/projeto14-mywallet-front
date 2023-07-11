import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../Contexts/AuthContext"

export default function SignUpPage() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [senha2, setSenha2] = useState('');
  const navigate = useNavigate()

  const handleForm = (event, qual) => {
    qual(event.target.value);
  }


  const cadUser = (e) => {
    e.preventDefault()
    if (!(senha === senha2)) {
      alert('Confirmação de senha incorreta');
      return
    }

    const objt = {
      name: nome,
      email: email,
      password: senha
    }

    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, objt)
      .then((res) => {
        console.log(res);
        navigate('/')
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      })
    
  }

  return (
    <SingUpContainer>
      <form onSubmit={cadUser}>
        <MyWalletLogo />
        <input placeholder="Nome" onChange={(event) => handleForm(event, setNome)} value={nome} type="text" />
        <input placeholder="E-mail" onChange={(event) => handleForm(event, setEmail)} value={email} type="email" />
        <input placeholder="Senha" onChange={(event) => handleForm(event, setSenha)} value={senha} type="password" autocomplete="new-password" />
        <input placeholder="Confirme a senha" onChange={(event) => handleForm(event, setSenha2)} value={senha2} type="password" autocomplete="new-password" />
        <button>Cadastrar</button>
      </form>

      <Link to={'/'}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
