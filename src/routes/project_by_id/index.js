import './form_by_id.css'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'

import api from '../../api/api'
import ProjectCard from '../../components/project_card'
import FormCard from '../../components/form_card'

export default function ProjectByID() {
    let navigate = useNavigate()
    let params = useParams()

    const projectID = params.projectID
    const [project, setProject] = useState([])
    const [loading, setLoading] = useState(true)

    const getProject = () => {
        api.get(`/getprojectbyid/${projectID}`).then((res) => {
            console.log(res.data)
            setProject(res.data)
            setLoading(false)
        }
        ).catch(() => {
            console.log("OI")
        })
    }

    useEffect(() => {
        getProject()
    }, [])

    const handleRemove = (id) => {
        api.delete(`/deleteform/${id}`).then(()=>{
            getProject()
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
                    <Link to={`/forms/create/${projectID}`} className="link"> Criar form </Link>
                </div>
                <ProjectCard _id={project._id} name={project.name} description={project.description}/>
                <h2> Forms associados </h2>
                <div className="forms-projects-container">
                    {
                        project.forms.map((form)=>{
                            return <FormCard _id={form._id} name={form.name} description={form.description} handleRemove={handleRemove}/>
                        })
                    }
                </div>
            </div>
        )
    }
}