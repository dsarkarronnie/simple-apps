import React from 'react'
import { Route, Switch } from 'react-router-dom'
import TODOApp from '../containers/TODO'
import TimePicker from '../poc/TimePicker'
import EWallet from '../containers/EWallet'
import Game from '../containers/TicTacToe'

const RouteWrapper = () => {
    return (
            <Switch>
                <Route path='*/todoapp' component={TODOApp} />
                <Route path='*/ewallet' component={EWallet} />
                <Route path='*/datepicker' component={TimePicker} />
                <Route path='*/tictactoe' component={Game} />
            </Switch>
    )
}

export default RouteWrapper
