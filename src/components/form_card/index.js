import { Link } from "react-router-dom"
import './form_card.css'
import AlertDialog from '../dialog'

export default function FormCard ({_id, name, description, handleRemove, project_id}){
    return (
      <div className="form-container">
        <Link to={`/forms/${_id}`} className="link" style={{margin:0}}>
          {name}
        </Link>
        <p>
          {description}
        </p>
        <Link to={`/forms/edit/${_id}`} className="edit-form-button" > Editar Form </Link>
        {
                !!handleRemove ?
                <AlertDialog 
                    openText="Remover form"
                    question="Você tem certeza que quer apagar esse form?"
                    handleConfirm={()=>{
                        handleRemove(_id)
                    }} />
                :
                <Link to={`/projects/${project_id}`} className="edit-form-button" > Projeto </Link>

          }
      </div>
    )
  }