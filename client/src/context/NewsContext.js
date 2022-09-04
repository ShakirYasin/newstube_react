import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'

import UserContext from '../context/UserContext'

const NewsContext = createContext()

const NEWS_API = '/posts'

export const NewsProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [news, setNews] = useState(null)
    const [updateNews, setUpdateNews] = useState(false)
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

    const DeleteAPost = async (id) => {
        try {
            const response = await axios.delete(`${NEWS_API}/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            setUpdateNews(prev => !prev)
            // console.log(response.data)
            // setAllCollections(response?.data)
            return await response?.data
        } catch (error) {
            throw new Error(error)
        }
    }

    
    const UpdateAPost = async (id, data) => {
        try {
            const response = await axios.put(`${NEWS_API}/${id}`,
                JSON.stringify(data),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            // console.log(response.data)
            // setAllCollections(response?.data)
            setUpdateNews(prev => !prev)
            return response?.data
        } catch (error) {
            throw new Error(error)
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
        news, 
        updateNews,
        getSingleNews,
        DeleteAPost,
        UpdateAPost
        
    }}>
        {children}
    </NewsContext.Provider>
}

export default NewsContext