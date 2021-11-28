export default function getUserInfo (){
    return {
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        userID: localStorage.getItem('userID')
    }
}