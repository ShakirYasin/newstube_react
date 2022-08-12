import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'

import UserContext from '../context/UserContext'

const NewsContext = createContext()

const NEWS_API = '/posts'
const USER_NEWS = '/posts/'

export const NewsProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [news, setNews] = useState(null)
    const [userNews, setUserNews] = useState(null)
    const [newUserPost, setNewUserPost] = useState(null)

    async function getAllNews() {
        try {
            const response = await axios.get(NEWS_API,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            )
            // console.log(response.data);
            setNews(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    async function getUserNews() {
        try {
            const response = await axios.get(USER_NEWS + auth?._id,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            // console.log(response.data);
            setUserNews(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllNews()
        getUserNews()
    }, [auth])

    useEffect(() => {
        getUserNews()
    }, [auth, newUserPost])



    return <NewsContext.Provider value={{
        news, userNews, setNewUserPost
    }}>
        {children}
    </NewsContext.Provider>
}

export default NewsContext