import React from 'react'
import Aux from '../hoc/AuxHoc'
import classes from './Layout.module.css'
import { Menubar } from 'primereact/menubar'
import { withRouter } from 'react-router-dom'
// import classes from './Layout.module.css'

// let history = createBrowserHistory();

const layout = (props) => {
    const items = [
        {
            label: 'File',
            icon: 'pi pi-fw pi-file',
            items: [
                {
                    label: 'New',
                    icon: 'pi pi-fw pi-plus',
                }
            ],
        },
        {
            label: 'TODOApp',
            command: () => {console.log("PROPS",props); props.history.push('/todoapp');}
        },
        {
            label: 'E-Wallet',
            command: () => {props.history.push('/ewallet');}
        }
    ];
    return (
        <Aux>
            {/* <Router history={history}> */}
                <Menubar model={items} >
                    <div className={classes.todoAppLabel}>TODO APP</div>
                </Menubar>
                {/* <Route strict component={EWallet} path='/ewallet'></Route> */}
                {/* <Route strict component={TODOApp} path='/todoapp'></Route> */}
            {/* </Router> */}
            <main>{props.children}</main>
        </Aux>
    )
};

export default withRouter(layout);