import React, { Component } from 'react'
import HOC from '../hoc/AuxHoc'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputNumber } from 'primereact/inputnumber'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
class EWallet extends Component {
    state = {
        transactionID: 0,
        balance: 0,
        depositDiag: false,
        withdrawDiag: false,
        transactionAmount: 0,
        transactions: []
    };


    // componentDidMount(){
    // }

    componentDidMount() {
        console.log("EWallet - APP - PROPS", this.props);
        console.log("EWallet - APP - STATE", this.state);
        let transactionData = JSON.parse(window.localStorage.getItem('transactions'));
        if(!Array.isArray(transactionData)){
            transactionData = [];
        }
        const transactionID = JSON.parse(window.localStorage.getItem('transactionID'));
        let balance = JSON.parse(window.localStorage.getItem('balance'));
        if (transactionData && transactionData.length === 0) {
            balance = 0;
        }
        this.setState({ transactionID: transactionID, transactions: [...transactionData], balance: balance })
    }

    handleTransactionAdditionAction = (isAddOperation) => {
        if (this.state.transactionAmount) {
            let balance = this.state.balance;
            let transactionID = this.state.transactionID + 1;
            balance = isAddOperation == true ? balance + this.state.transactionAmount : balance - this.state.transactionAmount;
            this.setState({ balance: balance });

            let transaction = new Object;
            let amount = this.state.transactionAmount
            transaction.transactionAmount = amount;
            transaction.transactionType = isAddOperation ? 'D' : 'W';
            transaction.balance = balance;
            transaction.transactionID = transactionID;

            var transactionTemp = this.state.transactions;
            transactionTemp.push(transaction);
            this.setState({ transaction: transactionTemp, transactionID: transactionID });
            window.localStorage.setItem('transactionID', transactionID);
            window.localStorage.setItem('balance', balance);
            window.localStorage.setItem('transactions', JSON.stringify([...transactionTemp]));
        }
    }

    deleteTransaction = (transactionID) => {
        let transactions = this.state.transactions;
        const index = transactions.findIndex((x) => x.transactionID == transactionID);
        if (index !== -1) {
            let balance = this.state.balance;
            const removedTransactions = transactions.splice(index, 1);
            removedTransactions.forEach(x => {
                balance = x.transactionType === 'D' ? balance - x.transactionAmount : balance + x.transactionAmount;
                transactions.forEach(transactionTemp => {
                    if (transactionTemp.transactionID >= transactionID) {
                        transactionTemp.balance = x.transactionType === 'D' ?
                            transactionTemp.balance - x.transactionAmount :
                            transactionTemp.balance + x.transactionAmount;
                    }
                })

            })
            this.setState({ balance: balance, transactions: transactions });
            window.localStorage.setItem('balance', balance);
            window.localStorage.setItem('transactions', JSON.stringify([...transactions]));
        }
    }

    render() {
        const balancestyle = this.state.balance < 0 ? { color: 'red' } : null;
        return (
            <HOC>
                <div>
                    <p><strong>BALANCE :: <label style={balancestyle}>{this.state.balance}</label></strong></p>
                </div>
                <div>
                    <Button label='Deposit' onClick={() => this.setState({ depositDiag: true })}></Button>
                    <Button label='Withdraw' onClick={() => this.setState({ withdrawDiag: true })}></Button>
                    <Dialog header="Deposit" visible={this.state.depositDiag}
                        onHide={() => { this.setState({ depositDiag: false, transactionAmount: 0 }) }}
                        closeOnEscape={true}
                        dismissableMask={true}
                    >
                        <Button label='Deposit'
                            onClick={() => { this.handleTransactionAdditionAction(true); this.setState({ depositDiag: false }) }}>
                        </Button>
                        <InputNumber value={this.state.transactionAmount} locale='en-IN' currency='INR'
                            onChange={(e) => { this.setState({ transactionAmount: e.value }) }} focusOnShow={true} />
                    </Dialog>
                    <Dialog header="Withdraw" visible={this.state.withdrawDiag}
                        onHide={() => { this.setState({ withdrawDiag: false, transactionAmount: 0 }) }}
                        closeOnEscape={true}
                        dismissableMask={true}
                    >
                        <Button label='Withdraw'
                            onClick={() => { this.handleTransactionAdditionAction(false); this.setState({ withdrawDiag: false }) }}></Button>
                        <InputNumber value={this.state.transactionAmount} locale='en-IN' currency='INR'
                            onChange={(e) => this.setState({ transactionAmount: e.value })} focusOnShow={true} />
                    </Dialog>
                </div>
                <div>
                    Component for showing Ledger
                    <DataTable value={this.state.transactions} responsive={true}>
                        <Column field={(x) => x['transactionType'] === 'D' ?
                            <strong style={{ color: 'green' }}>Deposit</strong> :
                            <strong style={{ color: 'red' }}>Withdraw</strong>}
                            header="TRANSACTION TYPE"></Column>
                        <Column field="transactionAmount" header="AMOUNT"></Column>
                        <Column field="balance" header="BALANCE"></Column>
                        <Column header="DELETE" field={x => {
                            return <Button label='X' onClick={() => this.deleteTransaction(x.transactionID)} />
                        }}>
                        </Column>
                    </DataTable>
                </div>
            </HOC>
        );
    }
}

export default EWallet;