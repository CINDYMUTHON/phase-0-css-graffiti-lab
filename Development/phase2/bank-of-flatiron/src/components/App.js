import React,{useEffect,useState }from "react";
import AccountContainer from "./AccountContainer";

function App() {
  const url = 'http://localhost:3000/transactions'
  const [transactions, setTransactions] = useState()
  
  useEffect(() => {
    fetch("http://localhost:3000/transactions")
    .then(res => res.json())
      
    .then(data => {
      console.log(data)
      setTransactions(data)})
  }, [])

  console.log(transactions)

  function onAddTransaction(data){
    const newData = [...transactions, data]
    setTransactions(newData)
  }

  function handleNewTransaction(newTransaction){
    const formData = {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(newTransaction)
    }

    fetch(url, formData)
      .then(res => res.json())
      .then(data => onAddTransaction(data))
  }
  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <AccountContainer handleNewTransaction={handleNewTransaction} transactions={transactions}/>
    </div>
  );
}

export default App;