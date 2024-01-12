import React from 'react'
const InputField = ({ type, name, id, placeholder, onChange, error, className, value, checked }) => {
    return (
        <input
            type={type}
            name={name}
            id={id}
            className={` ${error ? "border-danger" : className}`}
            placeholder={placeholder}
            value={value}
            checked={checked}
            onChange={onChange}
        />
    )
}

export default InputField;