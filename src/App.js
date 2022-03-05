import { Provider } from 'react-redux'
import { useState } from 'react'
import store from './store'
import MoneySummary from './components/moneySummary';
import MoneyBreakdown from './components/moneyBreakdown';
import InputExpenseAndIncome from './components/inputExpenseAndIncome';
import "./styles/index.css";

const App = () => {
  var [addEntry, setAddEntry] = useState(false)

  const btnAddClicked = () => {
    setAddEntry(true)
  }

  const btnBackClicked = () => {
    setAddEntry(false)
  }
  
  function showAddEntryBtn () {
    return <div className="z-10 fixed bottom-0 right-0 m-5">
      <button class="round pr-5 pl-5 pt-3 pb-3 bg-amber-500 drop-shadow-lg text-2xl font-bold text-white" onClick={btnAddClicked}>+</button>
    </div>
  }

  function showBackBtn () {
    return <div className="z-10 fixed bottom-0 right-0 m-5">
      <button class="rounded-full pt-3 pb-3 pl-4 pr-4 bg-amber-500 drop-shadow-lg text-1xl font-bold text-white" onClick={btnBackClicked}>BACK</button>
    </div>
  }

  return (
    <Provider store={store}>
      <div className="App h-screen p-4">
        <div className="h-full shadow-md rounded-b-lg overflow-y-auto">
           <MoneySummary/>
           { addEntry ? <InputExpenseAndIncome/> : <MoneyBreakdown/>}
           { addEntry ? showBackBtn() : showAddEntryBtn()}
        </div>
      </div>
    </Provider>
    
  );
}

export default App;
