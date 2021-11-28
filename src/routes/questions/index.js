import { Link, Outlet } from 'react-router-dom'

import './questions.css'

export default function Questions() {
    return (
        <div className="container">
            <div className="option-container">
                <Link to="/questions/multiple-choice" className="options"> Múltipla Escolha </Link>
                <Link to="/questions/text-choice" className="options"> Texto </Link>
            </div>
            <Outlet />
        </div>
    )

}