import { useState, createContext } from 'react'
import MoneySummary from './components/MoneySummary';
import MoneyLog from './components/MoneyLog';
import LogForm from './components/LogForm';
import "./styles/index.css";

export const onShowMoneyLog = createContext()

export const App = () => {
  
  const ADD = '+'
  const BACK = "BACK"

  var [showMoneyLog, setShowMoneyLog] = useState({
    display: false,
    mode: 1,
    id: null
  })

  const btnAddClicked = () => {
    setShowMoneyLog({
      display: true, 
      mode: 1, 
      id: null
    })
  }

  const btnBackClicked = () => {
    setShowMoneyLog({
      display: false, 
      id: null
    })
  }

  function showAddEntryBtn () {
    return <div className="float-right-bottom">
      <button className="btn round pr-5 pl-5 pt-3 pb-3 text-2xl" onClick={btnAddClicked}>
        {ADD}
      </button>
    </div>
  }


  function showBackBtn () {
    return <div className="float-right-bottom">
      <button className="btn rounded-full pt-3 pb-3 pl-4 pr-4 text-1xl" onClick={btnBackClicked}>
        {BACK}
      </button>
    </div>
  }

  return (
    <div className="App h-screen p-4">
      <div className="h-full shadow-md rounded-b-lg overflow-y-auto">
        <MoneySummary/>
          <onShowMoneyLog.Provider value={[showMoneyLog, setShowMoneyLog]}>
            { showMoneyLog.display ? <LogForm/> : <MoneyLog/>}
          </onShowMoneyLog.Provider>
        { showMoneyLog.display ? showBackBtn() : showAddEntryBtn()}
      </div>
    </div>
  );
}
