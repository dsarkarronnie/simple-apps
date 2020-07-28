import React, { Component } from 'react'
import Aux from '../hoc/AuxHoc'
import Cards from '../components/Cards/Cards'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/themes/rhea/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
class TODOApp extends Component {
    state = {
        counter: 1,
        cards: [],
        cardDetailInput: ''
    }
     
    componentWillMount(){
        const cardsData = window.localStorage.getItem('cardsData');
        if(cardsData && cardsData.length>0){
            this.setState({cards: [...this.state.cards, ...JSON.parse(cardsData)] });
            var newCount = JSON.parse(cardsData).reduce((p,c)=>p.id>c.id?p:c, []).id;
            if(newCount)
                this.setState({counter: newCount});
        }
    }

    addCard = (heading, detail) => {
        if (detail) {
            const oldCount = this.state.counter;
            const updatedCount = oldCount + 1;
            const newCard = {
                id: updatedCount,
                heading: heading,
                detail: detail
            }
            this.setState({ counter: updatedCount, cards: [...this.state.cards, newCard] });
            this.setState({ cardDetailInput: ''});
            
            window.localStorage.setItem('cardsData', JSON.stringify([...this.state.cards, newCard]));
        }
        else {
            alert('Enter Detail');
        }
    }
    removeCard = (id) => {
        var cards = [...this.state.cards];
        const index = cards.indexOf(cards.find(x => x.id === id));
        console.log(index);

        if (index !== -1) {
            cards.splice(index, 1);
            this.setState({ cards: cards });
        }
        window.localStorage.setItem('cardsData', JSON.stringify(cards));
    }
    render() {
        return (
            <Aux>
                <div>
                    Hello TODO APP
                </div>
                <div>
                    <Cards cards={this.state.cards} removeCard={this.removeCard}></Cards>
                </div>
                <InputText
                    value={this.state.cardDetailInput}
                    onChange={(e) => this.setState({ cardDetailInput: e.target.value })}>
                </InputText>
                <Button label='Add Card' icon='pi pi-check' iconPos='right' onClick={
                    () => this.addCard('#' + this.state.counter, this.state.cardDetailInput)
                }></Button>
            </Aux>
        )
    }
}

export default TODOApp;