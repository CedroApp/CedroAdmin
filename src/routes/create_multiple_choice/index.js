import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./create_multiple_choice.css"
import api from "../../api/api";
import Options from "../../components/options";

export default function CreateMultipleChoice() {
  let navigate = useNavigate()
  let params = useParams()
  const formID = params.formID

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [optionsError, setOptionsError] = useState('');
  const [error, setError] = useState('');

  const handlePush = () => {
    let optionsArray = options
    optionsArray.push('')
    console.log(optionsArray)
    setOptions([...optionsArray])
  }

  const handlePop = () => {
    let optionsArray = options
    optionsArray.pop()
    console.log(optionsArray)
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

        <h1>Criar questão múltipla escolha</h1>

        <input placeholder="Título" type="text" className="input" onChange={e => { setTitle(e.target.value) }} />
        <p> {titleError} </p>

        <Options options={options} setOptions={setOptions} />
        <p> {optionsError} </p>

        <div className="option-buttons">
          <button onClick={handlePush} className="submit-button"> Adicionar Opção </button>
          <button onClick={handlePop} className="submit-button"> Retirar Opção </button>
        </div>

        <button onClick={handleSubmit} className="submit-button"> Criar </button>
        <p> {error} </p>

      </div>
    </main>
  );
}