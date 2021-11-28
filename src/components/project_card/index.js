import AlertDialog from '../dialog'
import './project_card.css'
import { Link } from 'react-router-dom'

export default function ProjectCard({ _id, name, description, handleRemove }) {
  return (
    <div className="project-card">
      <Link to={`/projects/${_id}`} className="link" style={{ margin: 0 }}>
        {name}
      </Link>
      <p>
        {description}
      </p>
      {
        !!handleRemove ?
          <AlertDialog
            openText="Remover projeto"
            question="Você tem certeza que quer apagar esse projeto?"
            handleConfirm={() => {
              handleRemove(_id)
            }} />
          :
          null

      }
    </div>
  )
}