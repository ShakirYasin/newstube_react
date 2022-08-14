import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const channelContext = createContext()

const CHANNEL_API = '/channel/'


export const ChannelProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [channelData, setChannelData] = useState(null)

    const getUserChannel = async (id) => {
        try {
            const response = await axios.get(CHANNEL_API + id)
            // console.log(response.data)
            setChannelData(response?.data)
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    useEffect(() => {
        getUserChannel(auth?._id)
    }, [auth])
    
    return <channelContext.Provider value={{
        channelData
    }}>
        {children}
    </channelContext.Provider>
}

export default channelContext