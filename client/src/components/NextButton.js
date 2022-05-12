import { MdKeyboardArrowRight } from 'react-icons/md'

const NextButton = ({ onClick }) => {
    return (
        <div className='angle_buttons' onClick={onClick}>
            <MdKeyboardArrowRight size={50} color='#879299' />
        </div>
    )
}

export default NextButton