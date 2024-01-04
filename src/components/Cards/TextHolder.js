import React, { Component } from 'react'

export default class TextHolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    componentDidMount() {
        console.log('componentDidMount of TextHolder');
        /*if -- (this.props.includeRoute){
            tabindex = 
            setState({})
        }*/
    }
    componentDidUpdate() {
        console.log('componentDidUpdate of TextHolder');
//
    }
    shouldComponentUpdate(){
        var f = this.props.text?.split(':')[1]
        if(f){
            return +f%2
        }
        return false
    }
    componentWillUnmount() {
        // console.log('componentWillUnmount of TextHolder');

    }

    render(){
        return (
            <h2>This is text holder's text: {this.props.text}</h2>
        )
    }
}