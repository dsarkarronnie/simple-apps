import React from 'react'
import Card from './Card/Card'
const cards = (props)=>{
    const cards = props.cards.map(el=>(
        <Card
            key={el.id}
            heading={el.heading}
            detail={el.detail}    
            remove={()=>props.removeCard(el.id)}    
        ></Card>
    ))
    return (
        <div>
            {cards}
        </div>
    )
}

export default cards;