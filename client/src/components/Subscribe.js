import React, { useContext, useEffect } from 'react'
import { AiFillBell } from 'react-icons/ai'
import { BsCheck2 } from 'react-icons/bs'
import { IconContext } from 'react-icons/lib'
import SubscriptionContext from '../context/SubscriptionContext'

const Subscribe = ({userTo, userFrom}) => {

    const {isSubscribed, subscribersNumber, getSubscribersNumber, getIsSubscribed, subscriptionEvent, subscribeMe, unsubscribe} = useContext(SubscriptionContext)

    useEffect(() => {
        getSubscribersNumber(userTo)
        getIsSubscribed(userTo)
    }, [userTo, subscriptionEvent])

        
    const handleSubscribe = () => {

        if(isSubscribed){
            unsubscribe(userTo)
        }
        else {
            subscribeMe(userTo)
        }

    }


  return (
    <IconContext.Provider value={{ size: 20, color: "#FFFFFF" }} >
        <button className={`${isSubscribed ? 'subscribed' : 'btn_primary'}`} onClick={handleSubscribe}>
            <span className='pe-2'>{subscribersNumber}</span>{isSubscribed ? "Subscribed" : "Subscribe"}
            {
                isSubscribed ?
                <BsCheck2 className='ms-2' />
                :
                <AiFillBell className='ms-2'/>
            } 
        </button>
    </IconContext.Provider>
  )
}

export default Subscribe