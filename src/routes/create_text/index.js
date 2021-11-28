import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./create_multiple_choice.css"
import api from "../../api/api";

export default function CreateText() {
  let navigate = useNavigate()
  let params = useParams()
  const formID = params.formID

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [error, setError] = useState('');
  const validateData = () => {
    if (title.length < 5) {
      setTitleError("Digite um título válido")
      return false
    }
    setTitleError('')
    return true
  }

  const handleSubmit = async () => {
    const valid = validateData()
    if (!valid) {
      return
    }
    const data = {
      "title": title
    }
    api.post(`/createquestion/${formID}`, data).then((res) => {
      console.log(res.data)
      navigate(`/forms/${formID}`)
    }).catch((e) => {
      setError("Erro ao enviar")
    })
  }

  return (
    <main className="container">
      <div className="create-container">

        <h1>Criar questão texto</h1>

        <input placeholder="Título" type="text" className="input" onChange={e => { setTitle(e.target.value) }} />
        <p> {titleError} </p>

        <button onClick={handleSubmit} className="submit-button"> Criar </button>
        <p> {error} </p>

      </div>
    </main>
  );
}