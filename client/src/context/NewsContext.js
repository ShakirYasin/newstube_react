import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'

import UserContext from '../context/UserContext'

const NewsContext = createContext()

const NEWS_API = '/posts'

export const NewsProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [news, setNews] = useState(null)

    async function getNews() {
        try {
            const response = await axios.get(NEWS_API,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            console.log(response.data);
            setNews(response.data)
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getNews()
    }, [auth])



    return <NewsContext.Provider value={news}>{children}</NewsContext.Provider>
}

export default NewsContext