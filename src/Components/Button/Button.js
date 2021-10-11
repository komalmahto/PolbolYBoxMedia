import React, { Children } from 'react'
import styles from "./Button.module.css"
const Button = ({children}) => {
    return (
        <span className={styles.btn} >
            {children}
        </span>
    )
}

export default Button
