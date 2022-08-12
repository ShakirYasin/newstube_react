import { createContext, useEffect, useState } from 'react'
import axios from '../components/axios';

const UserContext = createContext();

export function UserProvider({ children }) {

    const [auth, setAuth] = useState({})
    const [newToken, setNewToken] = useState({})


    useEffect(() => {
        // localStorage.clear()
        // setAuth(localStorage.getItem('user'))
        // console.log(auth)
        // console.log(isUserAuthenticated())
        // console.log(isCreator())
    }, [auth])


    useEffect(() => {

        const value = JSON.parse(localStorage.getItem('user'));
        if (value) {
            const { _id, name, email, token, isACreator } = value
            setAuth({
                _id,
                name,
                email,
                token,
                isACreator
            })
        }

    }, [newToken])

    const getMe = async () => {
        try {
            const response = await axios.get('/users/me',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            const data = await response.data._doc
            return data
        } catch (error) {
            // throw new Error("Fault in getMe Function 'Client Side'")
            console.log(error)
        }
    }

    const setUserAuthInfo = (user) => {
        localStorage.setItem("user", JSON.stringify(user));
        setNewToken(user)
    };

    const isUserAuthenticated = () => {
        if (!auth.token) {
            return false;
        } else {
            return true
        }
    };

    const isCreator = () => {
        if (auth?.isACreator) {
            return true
        } else {
            return false
        }
    }

    const resetAuth = () => {
        localStorage.clear()
        setAuth({})
    }

    return (
        <UserContext.Provider
            value={{
                auth,
                setAuth: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
                isUserAuthenticated,
                resetAuth,
                isCreator,
                getMe
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext