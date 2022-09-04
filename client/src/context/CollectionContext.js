import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const CollectionContext = createContext()

const COLLECTION_API = '/collection'


export const CollectionProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [updateCollections, setUpdateCollections] = useState(false)

    // const getAllCollections = async () => {
    //     try {
    //         const response = await axios.get(COLLECTION_API)
    //         console.log(response.data)
    //         // setAllCollections(response?.data)
    //         return response?.data
    //     } catch (error) {
    //         throw new Error(error)
    //     }
    // }

    const getSingleCollection = async (id) => {
        try {
            const response = await axios.get(`${COLLECTION_API}/${id}`)
            // console.log(response.data)
            // setAllCollections(response?.data)
            return response?.data
        } catch (error) {
            throw new Error(error)
        }
    }

    const AddNewCollection = async (data) => {
        try {
            const response = await axios.post(COLLECTION_API,
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
            setUpdateCollections(prev => !prev)
            return response?.data
        } catch (error) {
            throw new Error(error)
        }
    }

    const UpdateACollection = async (id, data) => {
        try {
            const response = await axios.put(`${COLLECTION_API}/${id}`,
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
            return response?.data
        } catch (error) {
            throw new Error(error)
        }
    }

    const DeleteACollection = async (id) => {
        try {
            const response = await axios.delete(`${COLLECTION_API}/${id}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            setUpdateCollections(prev => !prev)
            // console.log(response.data)
            // setAllCollections(response?.data)
            return await response?.data
        } catch (error) {
            throw new Error(error)
        }
    }

    const DeleteAllCollections = async () => {
        try {
            const response = await axios.delete(COLLECTION_API,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            // console.log(response.data)
            // setAllCollections(response?.data)
            setUpdateCollections(prev => !prev)
            return await response?.data
        } catch (error) {
            throw new Error(error)
        }
    }



    // useEffect(() => {
    //     getUserChannel(auth?._id)
    // }, [auth])
    
    return <CollectionContext.Provider value={{
        // getAllCollections,
        getSingleCollection,
        AddNewCollection,
        UpdateACollection,
        DeleteACollection,
        DeleteAllCollections,
        updateCollections,
    }}>
        {children}
    </CollectionContext.Provider>
}

export default CollectionContext