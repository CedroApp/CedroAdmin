import './form_by_id.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import api from '../../api/api'
import MultipleChoiceCard from '../../components/multiple_choice_card'
import FormCard from '../../components/form_card'

export default function Forms() {
    let navigate = useNavigate()
    let params = useParams()

    const formID = params.formID
    const [form, setForm] = useState([])
    const [loading, setLoading] = useState(true)

    const getForm = () => {
        api.get(`/getformbyid/${formID}`).then((res) => {
            console.log(res.data)
            setForm(res.data)
            setLoading(false)
        }
        ).catch(() => {
            console.log("OI")
        })
    }

    useEffect(() => {
        getForm()
    }, [])

    const handleRemove = (id) => {
        api.delete(`/deletequestion/${id}`).then(()=>{
            getForm()
        }).catch(()=>{
            console.log("OI")
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
            <div className="container">
                <div>
                    <button className="create-button" onClick={() => navigate(`/questions/multiple-choice/create/${formID}`)}> Criar questão múltipla escolha</button>
                    <button className="create-button" onClick={() => navigate(`/questions/text/create/${formID}`)}> Criar questão texto</button>
                </div>
                <FormCard name={form.name} description={form.description} _id={form._id} project_id={form.project} />
                {
                    form.questions.map((question) => {
                        return <MultipleChoiceCard title={question.title} options={question.options} form='' id={question._id} handleRemove={handleRemove}/>
                    })
                }
            </div>
        )
    }

}