import { createContext, useEffect, useState } from 'react'

const UserContext = createContext();

export function UserProvider({ children }) {

    const [auth, setAuth] = useState({})
    const [newToken, setNewToken] = useState({})


    useEffect(() => {
        // localStorage.clear()
        // setAuth(localStorage.getItem('user'))
        console.log(auth)
        console.log(isUserAuthenticated())
        console.log(isCreator())
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
                isCreator
            }}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserContext