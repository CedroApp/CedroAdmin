import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./edit_multiple_choice.css"
import api from "../../api/api";
import Options from "../../components/options";

export default function EditMultipleChoice() {
  let navigate = useNavigate()
  let params = useParams()
  const questionID = params.questionID

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [optionsError, setOptionsError] = useState('');
  const [error, setError] = useState('');
  const [formID, setFormID] = useState('')

  useEffect(() => {
    api.get(`/getquestionbyid/${questionID}`).then((res)=>{
      setOptions(res.data.options)
      setTitle(res.data.title)
      setLoading(false)
      setFormID(res.data.form)
    })
  }, [])

  const handlePush = () => {
    let optionsArray = options
    optionsArray.push('')
    setOptions([...optionsArray])
  }

  const handlePop = () => {
    let optionsArray = options
    optionsArray.pop()
    setOptions([...optionsArray])
  }

  const validateData = () => {
    if (title.length < 5) {
      setTitleError("Digite um título válido")
      return false
    }
    setTitleError('')
    if (options.includes('')) {
      setOptionsError("Digite todas as opções")
      return false
    }
    setOptionsError('')
    return true
  }

  const handleSubmit = async () => {
    const valid = validateData()
    if (!valid) {
      return
    }
    const data = {
      "title": title,
      "options": options
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

          <h1>Editar questão múltipla escolha</h1>

          <input placeholder="Título" type="text" className="input" value={title} onChange={e => { setTitle(e.target.value) }} />
          <p> {titleError} </p>

          <Options options={options} setOptions={setOptions} />
          <p> {optionsError} </p>

          <div className="option-buttons">
            <button onClick={handlePush} className="submit-button"> Adicionar Opção </button>
            <button onClick={handlePop} className="submit-button"> Retirar Opção </button>
          </div>

          <button onClick={handleSubmit} className="submit-button"> Editar </button>
          <p> {error} </p>

        </div>
      </main>
    );
  }
}