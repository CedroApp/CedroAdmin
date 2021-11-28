import { BiRectangle } from 'react-icons/bi'
import { Link } from 'react-router-dom'

import './multiple_choice_card.css'
import AlertDialog from '../dialog'

export default function MultipleChoiceCard({ title, options, form, id, handleRemove }) {

    return (
        <div className="multiple_choice_container">
            <h2 style={{ margin: "1.2rem" }}>
                {title}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                {
                    options.map((option) => {
                        return (
                            <div className="options-container">
                                <BiRectangle />
                                <h5 style={{ margin: '0.5rem' }} >{option}</h5>
                            </div>
                        )
                    })
                }
            </div>
            {
                !!form ? 
                <Link to={`/forms/${form}`} className="card-button" style={{margin: 0, fontSize:"1rem"}}> Form </Link> :
                null
            }
            {
                options.length > 1 ?
                    <Link to={`/questions/multiple-choice/edit/${id}`} className="card-button" > Editar Questão </Link>
                    :
                    <Link to={`/questions/text/edit/${id}`} className="card-button" > Editar Questão </Link>
            }
            {
                !!handleRemove ?
                <AlertDialog 
                    openText="Remover questão"
                    question="Você tem certeza que quer apagar essa questão?"
                    handleConfirm={()=>{
                        handleRemove(id)
                    }} />
                :
                null

            }
        </div>
    )
}