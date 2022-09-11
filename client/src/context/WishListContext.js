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
            const response = await axios.get(Wishlist_API,
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

    // useEffect(() => {
    //     getUserWishlist(auth?._id)
    // }, [auth])
    
    return <WishlistContext.Provider value={{
        getUserWishlist,
        setUserWishlist,
        wishlistData
        
    }}>
        {children}
    </WishlistContext.Provider>
}

export default WishlistContext