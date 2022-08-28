import { createContext, useContext, useEffect, useState } from 'react'
import axios from '../components/axios';
import ChannelContext from './ChannelContext';


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
            const data = await response.data
            return data
        } catch (error) {
            // throw new Error("Fault in getMe Function 'Client Side'")
            console.log(error)
        }
    }

    const updateMe = async (values) => {
        try {
            const response = await axios.put('/users/me', JSON.stringify(values), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )

            console.log(response?.data)
            const updatedUser = await getMe()
            const { _id, name, email, isACreator } = updatedUser
            setUserAuthInfo({ _id, name, email, isACreator, token: auth?.token })
            return response?.data

        } catch (error) {
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
                getMe,
                updateMe
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext