import { useState, useEffect } from "react";
import validator from "validator";
import { useNavigate } from "react-router-dom";

import "./login.css"
import api from "../../api/api";

export default function Login() {
  let navigate = useNavigate()
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token != null){
      navigate('/')
    }
  }, [])

  const validateData = () =>{
    if(!validator.isEmail(email)){
      setEmailError("Digite um email válido")
      return false 
    }
    setEmailError('')
    if(!validator.isStrongPassword(password, {minLength: 6, minSymbols: 0})){
      setPasswordError("Digite uma senha válida")
      return false
    }
    setPasswordError('')
    return true
  }

  const handleSubmit = async () => {
    const valid = validateData()
    if(!valid){
      return
    }
    const data = {
      "email": email,
      "password": password
    }
    api.post("/login", data).then((res) =>{
      console.log(res.data.token)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('name', res.data.name)
      localStorage.setItem('email', res.data.email)
      localStorage.setItem('userID', res.data.id)
      navigate('/')
    }).catch((e) => {
      setError("Erro no login")
    })
  }

  return (
    <main className="all-screen-container">
      <div className="login-container">
        <h1>Login</h1>
        <input placeholder="email" type="email" className="input" onChange={e => { setEmail(e.target.value) }} />
        <p> {emailError} </p>
        <input placeholder="senha" type="password" className="input" onChange={e => { setPassword(e.target.value) }} />
        <p> {passwordError} </p>
        <button onClick={handleSubmit} className="submit-button"> Login </button>
        <p> {error} </p>
      </div>
    </main>
  );
}