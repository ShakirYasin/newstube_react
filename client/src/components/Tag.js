import React from 'react'
import {AiOutlineCloseCircle} from 'react-icons/ai'

const Tag = ({tag, handleRemoveTag}) => {
  return (
    <div className='px-3 py-2 bg-dark text-white radius_15 font_12 d-flex align-items-center gap-2'>
        <span className='px-1'>
          {tag}
        </span>
        <AiOutlineCloseCircle size={18} color="white" className='cursor-pointer' onClick={() => (handleRemoveTag(tag))} />
    </div>
  )
}

export default Tag