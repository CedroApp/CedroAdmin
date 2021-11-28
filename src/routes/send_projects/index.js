import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../api/api'

export default function SendProjects() {
    let navigate = useNavigate()

    const params = new URLSearchParams(window.location.search)
    console.log(params)
    const code = params.get('code')

    useEffect(()=>{
        const data = {
            code: code
        }
        api.post('/uploadprojects', data).then((res)=>{
            console.log(res)
            navigate('/projects')
        }).catch(()=> console.log("oi"))
    },[code, navigate])

    return(
        <div className="container">
            <h1>
                Enviando dados
            </h1>
        </div>
    )

}