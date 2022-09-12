import React, { useContext, useEffect, useState } from 'react'
import { Image, Card, Placeholder, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import '../../css/tile.css'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import WishlistContext from '../../context/WishListContext'
import axios from '../axios'
import UserContext from '../../context/UserContext'



const Tile = ({ data, dataFor }) => {

    const [add, setAdd] = useState(false)
    const {setUserWishlist, getSingleWishListState, removeSingleWishList} = useContext(WishlistContext)
    const {isCreator, auth} = useContext(UserContext)

    const setAddWishlist = async (id) => {
        const response = await setUserWishlist(id);
        console.log(response);
        if(response){
            setAdd(true)
        }
    }

    const setRemoveWishlist = async (id) => {
        const response = await removeSingleWishList(id);
        console.log(response);
        if(response){
            setAdd(false)
        }
    }

    useEffect(() => {   
        async function getStatus(id){
            setAdd(await getSingleWishListState(id))
        }

        getStatus(data?._id)
    }, [data])

    useEffect(() => {
        console.log(add)
    }, [add])

    

    return (
        <div className='tile'>
            <Card className='custom-card card_box_shadow' style={{overflow: "hidden"}}>
                <Link to={`${dataFor === "collection" ? '/collection/' : '/news/'}${data?._id}`}>
                    {
                        data?.image || data?.thumbnail ?
                        <Card.Img variant='top' width='100%' height='50%' style={{height: "200px", maxHeight: "200px", objectFit: "cover", objectPosition: "top"}} src={data?.image || data?.thumbnail} />
                        :
                        <Card.Img variant='top' src='/placeholder_image.png' width='100%' height='50%' />
                    }
                </Link>
                <Card.Body style={{position: "relative",maxHeight: "90px", }}>
                    {
                        !isCreator() &&
                        <div style={{position: "absolute", top: "15px", right: "10px"}}>
                            {
                                add ?
                                <AiFillHeart size={25} color="red" onClick={() => (setRemoveWishlist(data?._id))} />
                                :
                                <AiOutlineHeart size={25} onClick={() => (setAddWishlist(data?._id))} />
                            }
                        </div>
                    }
                    <Link to={`${dataFor === "collection" ? '/collection/' : '/news/'}${data?._id}`}>
                        {
                            data?.title ?
                            <Card.Title style={{width: "70%"}}>{data?.title}</Card.Title>
                            :
                            <Placeholder as={Card.Title} animation="glow">
                                    <Placeholder xs={6} />
                                </Placeholder>
                        }
                        {
                            data?.description ?
                            <Card.Text>{data?.description}</Card.Text>
                            :
                            <Placeholder as={Card.Text} animation="glow">
                                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                                    <Placeholder xs={6} /> <Placeholder xs={8} />
                            </Placeholder>
                        }
                    </Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Tile