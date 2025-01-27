import classNames from 'classnames'
import React from 'react'

export default function Danger({ children, className, on, ...rest }) {    
    const allClasses = classNames("danger", className, on ? "on" : "")
    return (
        <p className={allClasses} {...rest}>{children} </p>
    )
}
