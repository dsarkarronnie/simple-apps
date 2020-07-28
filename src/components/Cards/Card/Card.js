import React from 'react'
import classes from './Card.module.css'
const card = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.header}>{props.heading}</div>
                <div>{props.detail}</div>
                <button onClick={props.remove}>DISMISS</button>
            </div>
        </div>
    )
}
export default card;