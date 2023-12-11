import React from 'react'

const InputField = ({ type,name,id, placeholder, onChange, error, className, value }) => {
    return (
        <div>   
            <input
                type={type}
                name={name}
                id={id}
                className={` ${error ? "border-danger" : className}`}
                placeholder={placeholder}
                value={value}       
                onChange={onChange}
            />
        </div>
    )
}

export default InputField;