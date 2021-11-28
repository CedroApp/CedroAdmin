import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./edit_multiple_choice.css"
import api from "../../api/api";

export default function EditForm() {
  let navigate = useNavigate()
  let params = useParams()
  const formID = params.formID

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [description, setDescription] = useState(['', '']);
  const [descriptionError, setDescriptionError] = useState('');
  const [error, setError] = useState('');
  const [ loading, setLoading ] = useState(true)

  const getForm = () => {
    api.get(`/getformbyid/${formID}`).then((res) => {
      console.log(res.data)
      setName(res.data.name)
      setDescription(res.data.description)
      setLoading(false)
    }
    ).catch(() => {
      console.log("OI")
    })
  }

  useEffect(() => {
    getForm()
  }, [])

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
    api.put(`/updateform/${formID}`, data).then((res) => {
      console.log(res.data)
      navigate(`/forms/${formID}`)
    }).catch((e) => {
      setError("Erro ao enviar")
    })
  }

  if (loading) {
    return (
      <div className="container">
        <h1>
          Carregando
        </h1>
      </div>
    )
  } else {
    return (
      <main className="container">
        <div className="create-container">

          <h1>Editar form</h1>

          <input placeholder="Nome" type="text" className="input" value={name} onChange={e => { setName(e.target.value) }} />
          <p> {nameError} </p>

          <textarea placeholder="Descrição" rows="7" type="text" className="input" value={description} onChange={e => { setDescription(e.target.value) }} />
          <p> {descriptionError} </p>

          <button onClick={handleSubmit} className="submit-button"> Editar </button>
          <p> {error} </p>

        </div>
      </main>
    );
  }
}