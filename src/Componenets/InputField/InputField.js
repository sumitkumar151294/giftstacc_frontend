import React from 'react'

const InputField = ({ type, placeholder, onChange, error, className }) => {
    return (
        <div>
            <input
                type={type}
                className={` ${error ? "border-danger" : className}`}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    )
}

export default InputField;