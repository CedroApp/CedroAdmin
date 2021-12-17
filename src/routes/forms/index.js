import './forms.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api/api'
import FormCard from '../../components/form_card'

export default function Forms() {
    const [forms, setForms] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        api.get('/getallforms').then((res)=>{
            console.log(res.data)
            setForms(res.data)
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
                        forms.map((form)=>{
                              return <FormCard _id={form._id} name={form.name} description={form.description} project_id={form.project}/>
                        })
                    }
                </div>
            </div>
        )
    }

}