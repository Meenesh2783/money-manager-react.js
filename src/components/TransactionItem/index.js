import './index.css'

const TransactionItem = props => {
  const {transaction, onDelete} = props
  const {id, title, amount, type} = transaction

  return (
    <li className="transaction-item">
      <p className="transaction-title">{title}</p>
      <p className="transaction-amount">Rs {amount}</p>
      <p className="transaction-type">
        {type === 'INCOME' ? 'Income' : 'Expenses'}
      </p>
      <button
        type="button"
        className="delete-btn"
        data-testid="delete"
        onClick={() => onDelete(id)}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default TransactionItem
