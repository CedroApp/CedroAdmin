import { useState } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import "./login.css"
import api from "../../api/api";
import { Checkbox } from "@mui/material";

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function CreateUser() {
  let navigate = useNavigate()
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isAdmin, setIsAdmin] = useState('')
  const [error, setError] = useState('');

  const validateData = () =>{
    if(name.length < 5){
      setNameError("Digite um nome válido")
      return false
    }
    setNameError('')
    if(!validator.isEmail(email)){
      setEmailError("Digite um email válido")
      return false 
    }
    setEmailError('')
    if(!validator.isStrongPassword(password, {minLength: 6, minSymbols: 0})){
      setPasswordError("Digite uma senha válida")
      return false
    }
    if(confirmPassword !== password){
      setPasswordError("Digite senhas iguais")
      return false
    }
    setPasswordError('')
    return true
  }

  const handleAdminClick = () => {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true)
  }

  const handleSubmit = async () => {
    const valid = validateData()
    if(!valid){
      return
    }
    const data = {
      "name": name,
      "email": email,
      "password": password,
      "admin": isAdmin
    }
    api.post("/createuser", data).then((res) =>{
      console.log(res)
      navigate('/users')
    }).catch((e) => {
      setError("Erro na criação")
    })
  }

  return (
    <main className="container">
      <div className="create-user-container">
        <h1> Criar Usuário </h1>
        <input placeholder="Nome" type="text" className="input" onChange={e => { setName(e.target.value) }} />
        <p> {nameError} </p>
        <input placeholder="Email" type="email" className="input" onChange={e => { setEmail(e.target.value) }} />
        <p> {emailError} </p>
        <input placeholder="Senha" type="password" className="input" onChange={e => { setPassword(e.target.value) }} />
        <p> </p>
        <input placeholder="Confirmar Senha" type="password" className="input" onChange={e => { setConfirmPassword(e.target.value) }} />
        <p> {passwordError} </p>
        <div style={{display:"flex", flexDirection: "row", alignItems: "center"}}>
          <p style={{margin: 0}}> Admin? </p>
          <Checkbox {...label} onClick={handleAdminClick}/>
        </div>
        <button onClick={handleSubmit} className="submit-button" style={{alignSelf: "center"}}> Criar </button>
        <p> {error} </p>
      </div>
    </main>
  );
}