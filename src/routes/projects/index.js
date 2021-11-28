import './projects.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../api/api'
import ProjectCard from '../../components/project_card'

export default function Projects() {
    const [url, setUrl] = useState('')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    const getProjects = () => {
        api.get('/getallprojects').then((res)=>{
            console.log(res.data)
            setProjects(res.data)
            setLoading(false)
            }
        ).catch(()=>{
            console.log("OI")
        })
    }

    useEffect(()=>{
        api.get('/driveauth').then((res)=>{
            console.log(res.data.url)
            setUrl(res.data.url)
        })
        getProjects()
    },[])

    const handleRemove = (_id) => {
        api.delete(`/deleteproject/${_id}`).then(()=>{
            getProjects()
        })
    }

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
                <Link to='/projects/create' className="link"> Criar Projeto </Link>
                <a className="link" href={url}> Update Google Drive </a>
                <div className="questions-container">
                    {
                        projects.map((project)=>{
                              return <ProjectCard _id={project._id} name={project.name} description={project.description} handleRemove={handleRemove}/>
                        })
                    }
                </div>
            </div>
        )
    }

}