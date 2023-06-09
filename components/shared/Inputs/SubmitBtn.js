import React from 'react'

const SubmitBtn = ({ value }) => {
    return (
        <input 
            type="submit"
            className="bg-yellow-500 w-full my-2 p-2 text-white uppercase hover:bg-yellow-500 cursor-pointer"
            value={value}
        />
    )
}

export default SubmitBtn