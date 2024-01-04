import React, { Component } from 'react'
import Aux from '../hoc/AuxHoc'
import Cards from '../components/Cards/Cards'
import classes from './TODO.module.css'
import { Button } from 'primereact/button'
import { Menubar } from 'primereact/menubar'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'
import 'primereact/resources/themes/rhea/theme.css'
// import 'primereact/resources/themes/nova-dark/theme.css'
// import 'primereact/resources/themes/luna-amber/theme.css'
// import 'primereact/resources/themes/luna-green/theme.css'
import { Dialog } from 'primereact/dialog'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import TextHolder from '../components/Cards/TextHolder'
class TODOApp extends Component {
    state = {
        counter: 1,
        cards: [],
        cardDetailInput: '',
        dialogVisible: false,
        anotherCounter: 0
    }
    
    componentDidMount() {
        console.log("TODO - APP", this.props);
        document.addEventListener('keypress', (event) => {
            if (event.keyCode === 13 || event.which === 13) {
                this.addCard('#' + this.state.counter, this.state.cardDetailInput);
            }
        });
        const cardsData = window.localStorage.getItem('cardsData');
        if (cardsData && cardsData.length > 0) {
            this.setState({ cards: [...this.state.cards, ...JSON.parse(cardsData)] });
            var newCount = JSON.parse(cardsData).reduce((p, c) => p.id > c.id ? p : c, []).id;
            if (newCount)
                this.setState({ counter: newCount });
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
            this.setState({ cardDetailInput: '' });

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

    doAction = (url) => {
        var xml = new XMLHttpRequest();
        xml.open("Get", url, false);
        xml.send(null);
        const response = xml.responseText;
        this.setState({ response: response });
        console.log(this.state.response);
    }
    handleClick = ()=>{
        this.setState(prevState=>({ anotherCounter: prevState.anotherCounter+1 }));
    }
    render() {
        const cardstyle = {
            maxWidth: '250px',
            textAlign: 'center'
        };
        return (
            <Aux>
                {/* <button onClick={this.handleClick}>CLICK ME</button>
                <TextHolder key={this.state.anotherCounter} text={`This is a sample text with counter: ${this.state.anotherCounter}`}></TextHolder> */}
                <div>
                    <Cards cards={this.state.cards} removeCard={this.removeCard}></Cards>
                </div>
                {/* <Card title='Title' subTitle='Subtitle' style={cardstyle}></Card> */}
                <InputText
                    value={this.state.cardDetailInput}
                    onChange={(e) => this.setState({ cardDetailInput: e.target.value })}>
                </InputText>
                <Button label='Add Card' icon='pi pi-check' iconPos='right' onClick={
                    () => this.addCard('#' + this.state.counter, this.state.cardDetailInput)
                }></Button>
                <Dialog header="Header" footer="Footer" visible={this.state.dialogVisible}
                    onHide={() => { this.setState({ dialogVisible: false , cardDetailInput: ''}) }}
                    closeOnEscape={true}
                    dismissableMask={true}
                >
                    <InputText
                        value={this.state.cardDetailInput}
                        onChange={(e) => this.setState({ cardDetailInput: e.target.value })}>
                    </InputText>
                    <Button label='Add Card' icon='pi pi-check' iconPos='right' onClick={
                        () => this.addCard('#' + this.state.counter, this.state.cardDetailInput)
                    }></Button>
                </Dialog>
                <Button label='Show Dialog'
                    onClick={() => { this.setState(p => { return { dialogVisible: !p.dialogVisible } }) }}
                />
            </Aux>
        )
    }
}

export default TODOApp;