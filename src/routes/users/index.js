import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import api from "../../api/api"
import getToken from "../../api/token"
import UserCard from "../../components/user_card"
import './users.css'

export default function Users() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = getToken()
    const headers = { Authorization: `Bearer ${token}` }
    api
      .get('/getallusers', { headers: headers })
      .then((res) => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(() => {
        console.log("OI")
      })
  }, [])

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
      <main className="container">
        <Link to="/users/create" className="link"> Criar usuário </Link>
        <div className="user-cards-container">
          {
            users.map((user) => {
              return <UserCard _id={user._id} name={user.name} email={user.email} />
            })
          }
        </div>
      </main>
    );
  }
}