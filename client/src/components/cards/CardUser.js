import { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap"
import { useLocation } from "react-router-dom"
import { IconContext } from 'react-icons'
import { BiBell } from 'react-icons/bi';
import { FaBellSlash } from 'react-icons/fa';

const CardUser = ({ data, orientation, handleMuting, isMute, checkFollow }) => {

    const location = useLocation();
    const [path, setPath] = useState(location.pathname)
    const [mute, setMute] = useState(false)
    const [follow, setFollow] = useState(true)

    useEffect(() => {
        setPath(location.pathname)
    }, [location])

    function handleMute(name) {
        setMute(prev => !prev)
        handleMuting(name)
    }
    useEffect(() => {
        isMute && isMute(mute)
    }, [mute])

    useEffect(() => {
        !follow && checkFollow && checkFollow(follow, data.id)
    }, [follow])


    return (
        <div className='p-3 bg-white radius_15 card_box_shadow'>
            <Row>
                <Col xs='12' xl={orientation === 'portrait' ? '12' : '6'}>
                    <Image src={data.image} alt={data.name} className={path === '/subscriptions' ? 'card_user_thumb_full' : 'card_user_thumb'} />
                </Col>
                <Col xs='12' xl={orientation === 'portrait' ? '12' : '6'} className='p-3 py-0'>
                    <span className="m-0 font_12 color-highlight">#Featured</span>
                    <h3 className='primary bold montserrat_regular font_22'>
                        {data.name}
                    </h3>
                    <p className='secondary font_15 mt-2'>
                        {data.designation}
                    </p>
                    <div className='d-flex align-items-center radius_15 justify-content-between mt-2 text-center secondary_bg p-3'>
                        <div>
                            <p className="secondary font_15 mb-2">Posts</p>
                            <h4 className="primary bold">{data.posts}</h4>
                        </div>
                        <div>
                            <p className="secondary font_15 mb-2">Followers</p>
                            <h4 className="primary bold">{data.followers}</h4>
                        </div>
                        <div>
                            <p className="secondary font_15 mb-2">Rating</p>
                            <h4 className="primary bold">{data.rating}</h4>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between aling-items-center mt-3">
                        {
                            path === '/subscriptions' &&
                            <button className="btn_secondary" onClick={() => (handleMute(data.name))}>
                                <IconContext.Provider value={{ size: '25' }}>
                                    {
                                        mute ? <FaBellSlash /> : <BiBell />
                                    }
                                </IconContext.Provider>
                            </button>
                        }
                        <button className="btn_primary" onClick={() => (setFollow(prev => !prev))}>
                            {
                                follow ? 'Unfollow' : 'Follow'
                            }
                        </button>
                    </div>
                </Col>
            </Row>
        </div >
    )
}

export default CardUser