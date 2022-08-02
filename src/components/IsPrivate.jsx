import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/auth.context'


export default function IsPrivate(props) {
    const { isLoggedIn } = useContext(AuthContext)
    const navigate = useNavigate;

    if(isLoggedIn){
        return props.children
    }else{
        navigate("/login")
    }  
}