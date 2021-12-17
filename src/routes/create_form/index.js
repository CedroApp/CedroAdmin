import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./create_form.css"
import api from "../../api/api";

export default function CreateForm() {
  let navigate = useNavigate()
  let params = useParams()
  const projectID = params.projectID

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(['']);
  const [descriptionError, setDescriptionError] = useState('');
  const [error, setError] = useState('');

  const validateData = () => {
    if (name.length < 5) {
      setNameError("Digite um nome válido")
      return false
    }
    setNameError('')
    if (description.length < 10) {
      setDescriptionError("Digite uma descrição válida")
      return false
    }
    setDescriptionError('')
    return true
  }

  const handleSubmit = async () => {
    const valid = validateData()
    if (!valid) {
      return
    }
    const data = {
      "name": name,
      "description": description
    }
    api.post(`/createform/${projectID}`, data).then((res) => {
      console.log(res.data)
      navigate(`/projects/${projectID}`)
    }).catch((e) => {
      setError("Erro ao enviar")
    })
  }

  return (
    <main className="container">
      <div className="create-container">

        <h1>Criar form</h1>

        <input placeholder="Nome" type="text" className="input" value={name} onChange={e => { setName(e.target.value) }} />
        <p> {nameError} </p>

        <input placeholder="Descrição" type="text" className="input" value={description} onChange={e => { setDescription(e.target.value) }} />
        <p> {descriptionError} </p>

        <button onClick={handleSubmit} className="submit-button"> Criar </button>
        <p> {error} </p>

      </div>
    </main>
  );
}