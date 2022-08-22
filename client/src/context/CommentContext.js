import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const CommentContext = createContext()

const COMMENT_API = '/comments'


export const CommentProvider = ({ children }) => {

    const { auth } = useContext(UserContext)

    const setComment = async (values) => {
        try {
            const response = await axios.post(COMMENT_API,
                JSON.stringify(values),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )

            console.log(response?.data)


        } catch (error) {
            console.log(error)
        }
    }

    const getAllComments = async (id) => {
        try {
            const response = await axios.get(`${COMMENT_API}/${id}`)
            console.log(response?.data)
            return response?.data

        } catch (error) {
            console.log(error)
        }
    }

    return <CommentContext.Provider value={{
        setComment,
        getAllComments
    }}>
        {children}
    </CommentContext.Provider>
}

export default CommentContext