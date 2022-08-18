import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const SubscriptionContext = createContext()

const SUBSCRIPTION_API = '/subscription'


export const SubscriptionProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [subscriptionEvent, setSubscriptionEvent] = useState("");
    const [subscribersNumber, setSubscribersNumber] = useState(false);


    const getSubscribersNumber = async (userId) => {
        try {
            const response = await axios.get(`${SUBSCRIPTION_API}/subscribersNumber/${userId}`)
            // console.log(response.data)
            setSubscribersNumber(response?.data?.subscribersNumber)
            // return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const getIsSubscribed = async (userId) => {
        try {
            const response = await axios.get(`${SUBSCRIPTION_API}/subscribed/${userId}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            // console.log(response?.data)
            setIsSubscribed(response?.data?.isSubscribed)
            // return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const subscribeMe = async (userId) => {
        try {
            const response = await axios.post(`${SUBSCRIPTION_API}/subscribe`, JSON.stringify({userId}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            // console.log(response?.data)
            setSubscriptionEvent("subscribed")
            // return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const unsubscribe = async (userId) => {
        try {
            const response = await axios.post(`${SUBSCRIPTION_API}/unsubscribe`, JSON.stringify({userId}),
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }
            )
            // console.log(response?.data)
            setSubscriptionEvent("unsubscribed")
            // return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    // useEffect(() => {
    //     getUserChannel(auth?._id)
    // }, [auth])
    
    return <SubscriptionContext.Provider value={{
        isSubscribed,
        getIsSubscribed,
        subscribersNumber,
        getSubscribersNumber,
        subscriptionEvent,
        subscribeMe,
        unsubscribe
    }}>
        {children}
    </SubscriptionContext.Provider>
}

export default SubscriptionContext