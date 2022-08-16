import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'

import UserContext from '../context/UserContext'

const NewsContext = createContext()

const NEWS_API = '/posts'

export const NewsProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [news, setNews] = useState(null)
    // const [userNews, setUserNews] = useState(null)
    // const [newUserPost, setNewUserPost] = useState(null)

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

    // async function getAllUserNews() {
    //     try {
    //         const response = await axios.get(`${NEWS_API}/${auth?._id}`,
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     authorization: `Bearer ${auth?.token}`
    //                 }
    //             }
    //         )
    //         // console.log("UserNews: ", response.data);
    //         setUserNews(response.data)
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    async function getSingleNews(id) {
        try {
            const response = await axios.get(`${NEWS_API}/${id}`)
            console.log("User News: ", response.data);
            return response?.data
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllNews()
        // getUserNews()
    }, [auth])

    // useEffect(() => {
    //     getUserNews()
    // }, [auth, newUserPost])



    return <NewsContext.Provider value={{
        news, getSingleNews //userNews, setNewUserPost
    }}>
        {children}
    </NewsContext.Provider>
}

export default NewsContext