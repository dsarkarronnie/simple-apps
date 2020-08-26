import React from 'react'
import Card from './Card/Card'
import classes from './Cards.module.css'
const cards = (props) => {
    const cards = props.cards.map(el => (
        <Card
            key={el.id}
            heading={el.heading}
            detail={el.detail}
            remove={() => props.removeCard(el.id)}>
        </Card>
    ))
    return (
        <div className={classes.Cards}>
            {cards}
        </div>
    )
}

export default cards;