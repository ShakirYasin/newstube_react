import { createContext, useEffect, useState, useContext } from "react";
import axios from '../components/axios'
import UserContext from "./UserContext";

const WishlistContext = createContext()

const Wishlist_API = '/wishlist/'


export const WishlistProvider = ({ children }) => {

    const { auth } = useContext(UserContext)
    const [wishlistData, setWishlistData] = useState(null)

    const getUserWishlist = async () => {
        try {
            const response = await axios.get(Wishlist_API, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const setUserWishlist = async (id) => {
        try {
            const response = await axios.post(Wishlist_API,
                JSON.stringify({
                    id
                }), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            setWishlistData(response?.data)
            return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const getSingleWishListState = async (id) => {
        try {
            const response = await axios.get(Wishlist_API+id, 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            // console.log("Status: ", response?.data?.status)
            return response?.data?.status
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    const removeSingleWishList = async (id) => {
        try {
            const response = await axios.put(Wishlist_API,
                JSON.stringify({id}), 
                {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${auth?.token}`
                    }
                }   
            )
            console.log("Status: ", response?.data)
            return response?.data
        } catch (error) {
            throw new Error(error?.message)
        }
    }

    // useEffect(() => {
    //     getUserWishlist(auth?._id)
    // }, [auth])
    
    return <WishlistContext.Provider value={{
        getUserWishlist,
        setUserWishlist,
        getSingleWishListState,
        removeSingleWishList,
        wishlistData
        
    }}>
        {children}
    </WishlistContext.Provider>
}

export default WishlistContext