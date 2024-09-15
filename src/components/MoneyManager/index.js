import {useState} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails/index'
import TransactionItem from '../TransactionItem/index'
import './index.css'

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

const MoneyManager = () => {
  const [transactions, setTransactions] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [transactionType, setTransactionType] = useState(
    transactionTypeOptions[0].optionId,
  )

  const totalIncome = transactions
    .filter(transaction => transaction.type === 'INCOME')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalExpenses = transactions
    .filter(transaction => transaction.type === 'EXPENSES')
    .reduce((acc, curr) => acc + curr.amount, 0)

  const totalBalance = totalIncome - totalExpenses

  const onAddTransaction = event => {
    event.preventDefault()
    if (title === '' || amount === '') return

    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: transactionType,
    }

    setTransactions([...transactions, newTransaction])
    setTitle('')
    setAmount('')
    setTransactionType(transactionTypeOptions[0].optionId)
  }

  const deleteTransaction = id => {
    const updatedTransactions = transactions.filter(
      transaction => transaction.id !== id,
    )
    setTransactions(updatedTransactions)
  }

  return (
    <div className="money-manager">
      <div className="header">
        <h1>Hi, Richard</h1>
        <p>
          Welcome back to your <span className="highlight">Money Manager</span>
        </p>
      </div>

      <MoneyDetails
        balance={totalBalance}
        income={totalIncome}
        expenses={totalExpenses}
      />

      <div className="transaction-container">
        <form className="transaction-form" onSubmit={onAddTransaction}>
          <h2 className="form-title">Add Transaction</h2>

          <label htmlFor="title">TITLE</label>
          <input
            type="text"
            id="title"
            placeholder="TITLE"
            className="input-field"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <label htmlFor="amount">AMOUNT</label>
          <input
            type="number"
            id="amount"
            placeholder="AMOUNT"
            className="input-field"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />

          <select
            className="input-field"
            value={transactionType}
            onChange={e => setTransactionType(e.target.value)}
          >
            {transactionTypeOptions.map(option => (
              <option key={option.optionId} value={option.optionId}>
                {option.displayText}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            Add
          </button>
        </form>

        <div className="history">
          <h2>History</h2>
          <li className="transaction-item">
            <p className="transaction-title">Title</p>
            <p className="transaction-amount">Amount</p>
            <p className="transaction-type">Type</p>
            <p>&quot</p>
          </li>
          <ul className="transaction-list">
            {transactions.map(transaction => (
              <TransactionItem
                key={transaction.id}
                transaction={transaction}
                onDelete={deleteTransaction}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MoneyManager
