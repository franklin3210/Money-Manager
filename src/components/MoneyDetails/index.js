import './index.css'

const MoneyDetails = props => {
  const {balanceAmount, incomeAmount, expensesAmount} = props

  return (
    <div className="money-details-container">
      <div className="money-detail-item balance-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image-el"
        />
        <div className="money-info money-cont">
          <p>Your Balance</p>
          <p data-testid="balanceAmount">₹{balanceAmount}</p>
        </div>
      </div>
      <div className="money-detail-item income-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image-el"
        />
        <div className="money-info money-cont">
          <p>Your Income</p>
          <p data-testid="incomeAmount">₹{incomeAmount}</p>
        </div>
      </div>
      <div className="money-detail-item expence-cont">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image-el"
        />
        <div className="money-info money-cont">
          <p>Your Expenses</p>
          <p data-testid="expensesAmount">₹{expensesAmount}</p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
