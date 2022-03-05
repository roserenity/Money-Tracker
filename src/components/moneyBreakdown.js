import store from '../store'
import { useState } from 'react'

const MoneyBreakdown = () => {
    var date = new Date()
    var month = date.getMonth() < 10 && `0${date.getMonth()+1}`
    var [moneyLog, setMoneyLog] = useState(store.getState().moneyLog[`year-${date.getFullYear()}`])
    var [filterType, setFilterType] = useState("Expenses")
    var [filterDate, setFilterDate] = useState(`${date.getFullYear()}-${month}`)
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const getFilter = (e) => {
        setFilterType(e.target.value)
        getMoneyLog()
    }
    const getFilterDate = (e) => {
        alert(e.target.value)
        setFilterDate(e.target.value)
        getMoneyLog()
    }

    const getMoneyLog = () => {
        var year = filterDate.split('-')[0]
        setMoneyLog(store.getState().moneyLog[`year-${year}`])
    }

    function dateFormatter(date) {
        return `${monthArr[parseInt(filterDate.split('-')[1])-1]} ${date.split('-')[1]}`;
    }

    function breakDown(dayBreakdown, type) {
        return Object.entries(dayBreakdown[1][type]).map(log =>
            <div key={log[1]["item"]} className="breakdown p-3 mb-4 rounded-lg">
                <div className="flex justify-between font-bold">
                    <p> {log[1]["item"]} </p>
                    <p> {log[1]["amount"]} php </p>
                </div>
            </div>
        )
    }

    return (
        <div>
            <div className="p-3 justify-around flex">
                <select name="filter" id="breakdownFilter" onChange={getFilter} className="flex-1 p-2 m-1 text-white">
                    <option value="Expenses" className="p-1">Expenses</option>
                    <option value="Income" className="p-1">Income</option>
                </select>
                <input className="flex-1 p-2 m-1 text-white" type="month" id="start" name="start" value={filterDate} onChange={getFilterDate}></input>
            </div>
            {  (filterType === "Expenses") &&
                moneyLog[`month-${filterDate.split('-')[1]}`].map(dayLog => 
                    Object.entries(dayLog).map(dayBreakdown => 
                        <div className="m-4 ">
                            <p>{dateFormatter(dayBreakdown[0])}</p>
                            {breakDown(dayBreakdown, "expenses")}
                        </div>
                    )
                ) 
            }
            {  (filterType === "Income") &&
                moneyLog[`month-${filterDate.split('-')[1]}`].map(dayLog => 
                    Object.entries(dayLog).map(dayBreakdown => 
                        <div className="m-4">
                            <p>{dateFormatter(dayBreakdown[0])}</p>
                            {breakDown(dayBreakdown, "income")}
                        </div>
                    )
                )
            } 
        </div>
    );
}

export default MoneyBreakdown