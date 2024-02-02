import React from 'react'
import classes from './Card.module.css'
import { Button } from 'primereact/button'
const card = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.card}>
                <div className={classes.header}>{props.heading}</div>
                <div className={props.props.cardState.key==='done'?classes.strike:''}>{props.detail}</div>
                <br></br>
                <Button label={props.props.cardState.userLabel} onClick={props.cardButtonAction}/>
            </div>
        </div>
    )
}
export default card;