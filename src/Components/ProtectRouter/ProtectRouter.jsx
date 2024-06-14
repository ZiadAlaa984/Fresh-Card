import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectRouter(props) {
    if (localStorage.getItem('tokinUser')) {
        return props.children
    }
    else {
        return <Navigate to={'/Login'} />
    }

}
