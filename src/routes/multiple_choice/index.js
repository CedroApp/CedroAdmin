import './multiple_choice.css'
import { useEffect, useState } from 'react'

import api from '../../api/api'
import MultipleChoiceCard from '../../components/multiple_choice_card'

export default function MultipleChoice() {
    const [questions, setQuestions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get('/getallquestions').then((res)=>{
            console.log(res.data)
            setQuestions(res.data)
            setLoading(false)
            }
        ).catch(()=>{
            console.log("OI")
        })
    },[])

    if(loading){
        return(
            <div className="container">
                <h1>
                    Carregando
                </h1>
            </div>
        )
    } else{
        return (
            <div className="container">

                <div className="questions-container">
                    {
                        questions.map((question)=>{
                            if(question.options.length > 1){
                                return <MultipleChoiceCard title={question.title} options={question.options} form={question.form} id={question.id}/>
                            }
                            return null
                        })
                    }
                </div>
            </div>
        )
    }

}