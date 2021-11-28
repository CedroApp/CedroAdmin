import { Link } from 'react-router-dom'

import './user_card.css'

export default function UserCard ({_id, name, email}){
    return(
        <div className="user-card">
            <Link to={`/users/${_id}`} className="link">
                {name}
            </Link>
            <div>
                <p>
                    {email}
                </p>
            </div>
        </div>
    )
}