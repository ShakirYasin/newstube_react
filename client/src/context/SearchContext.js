import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const SearchContext = createContext()

const SEARCH_API = '/search'


export const SearchProvider = ({ children }) => {

    // const { auth } = useContext(UserContext)
    const getAllResults = async (value) => {
        try {
            const response = await axios.post(SEARCH_API, { value },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }    
            )
            return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    // useEffect(() => {
    //     getUserChannel(auth?._id)
    // }, [auth])
    
    return <SearchContext.Provider value={{
        getAllResults
    }}>
        {children}
    </SearchContext.Provider>
}

export default SearchContext