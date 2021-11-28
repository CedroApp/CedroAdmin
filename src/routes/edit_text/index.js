import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./create_multiple_choice.css"
import api from "../../api/api";

export default function EditText() {
  let navigate = useNavigate()
  let params = useParams()
  const questionID = params.questionID

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [error, setError] = useState('');
  const [formID, setFormID] = useState('')

  useEffect(() => {
    api.get(`/getquestionbyid/${questionID}`).then((res) => {
      setTitle(res.data.title)
      setLoading(false)
      setFormID(res.data.form)
    })
  }, [questionID])

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
    api.put(`/updatequestion/${questionID}`, data).then((res) => {
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

          <h1>Editar questão texto</h1>

          <input placeholder="Título" type="text" className="input" value={title} onChange={e => { setTitle(e.target.value) }} />
          <p> {titleError} </p>

          <button onClick={handleSubmit} className="submit-button"> Editar </button>
          <p> {error} </p>

        </div>
      </main>
    );
  }

}