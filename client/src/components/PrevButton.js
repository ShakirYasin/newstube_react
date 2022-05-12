import { MdKeyboardArrowLeft } from 'react-icons/md'

const PrevButton = ({ onClick }) => {
    return (
        <div className='angle_buttons' onClick={onClick}>
            <MdKeyboardArrowLeft size={50} color='#879299' />
        </div>
    )
}

export default PrevButton