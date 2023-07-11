import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useContext } from "react"
import axios from "axios"
import { AuthContext } from "../Contexts/AuthContext"


export default function TransactionsPage() {
  const { tipo } = useParams();
  const { token, login, user } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleForm = (event, qual) => {
    qual(event.target.value);
  }


  const [valor, setValor] = useState('');
  const [descri, setDescri] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    const novoValor = value.replace(/[^0-9.]/g, '');
    setValor(novoValor);
  };

  const postT = async (e) => {
    e.preventDefault()
    console.log(token)
    let url;
    const objt = {
      valor: parseFloat(valor),
      descri: descri
    }
    if (tipo === 'entrada') {
      url = `${import.meta.env.VITE_API_URL}/nova-transacao/entrada`
    } if (tipo === 'saida') {
      url = `${import.meta.env.VITE_API_URL}/nova-transacao/saida`
    }
    axios.post(url, 
      objt,
    {headers: {
      Authorization: `Bearer ${token}`
    }}).then((res) => {
      console.log(res);
      navigate('/home')
    })
    .catch((err) => {
      alert(err);
    })
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={postT}>
        <input placeholder="Valor" type="text" value={valor} onChange={handleChange}/>

        <input placeholder="Descrição" type="text" value={descri} onChange={(event) => handleForm(event, setDescri)}/>

        <button>Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
