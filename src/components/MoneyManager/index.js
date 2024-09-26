import {Component} from 'react'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'
import {v4 as uuidv4} from 'uuid'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionsList: [],
  }

  deleteTransaction = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionsList: updatedTransactionsList})
  }

  addTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const typeOption = transactionTypeOptions.find(
      each => each.optionId === optionId,
    )
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: typeOption.displayText,
    }

    this.setState({
      transactionsList: [...transactionsList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    })
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeOptionId = event => {
    this.setState({optionId: event.target.value})
  }

  getIncomeAmount = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === 'Income') {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === 'Expenses') {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalanceAmount = () => {
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()
    return incomeAmount - expensesAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()

    return (
      <div className="money-manager-container">
        <div className="header-container">
          <h1 className="title">Hi Richard!</h1>
          <p className="description">Welcome back to your money Manager</p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="transaction-container container d-flex flex-row tran-cont">
          <div className="m-5">
            <form className="transaction-form" onSubmit={this.addTransaction}>
              <h2 className="transaction-form-title mb-4">Add Transaction</h2>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={titleInput}
                  onChange={this.onChangeTitleInput}
                  className="form-control"
                  placeholder="Enter transaction title"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="amount">
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  value={amountInput}
                  onChange={this.onChangeAmountInput}
                  className="form-control"
                  placeholder="Enter amount"
                />
              </div>

              <div className="form-group mb-3">
                <label className="form-label" htmlFor="type">
                  Type
                </label>
                <select
                  id="type"
                  value={optionId}
                  onChange={this.onChangeOptionId}
                  className="form-select"
                >
                  {transactionTypeOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Add
              </button>
            </form>
          </div>
          <div className="transactions-list-container">
            <h2 className="transaction-history-title">Transaction History</h2>
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>
                    <p>Title</p>
                  </th>
                  <th>
                    <p>Amount</p>
                  </th>
                  <th>
                    <p>Type</p>
                  </th>
                </tr>
              </thead>
            </table>
            <ul className="transactions-list">
              {transactionsList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
