import store from '../store'
import { useState, useContext } from 'react'
import { onShowMoneyLog } from '../App';

const MoneyBreakdown = () => {
    var date = new Date()
    var [filterType, setFilterType] = useState("expenses")
    var [filterDate, setFilterDate] = useState(`${date.getFullYear()}-${date.getMonth() < 10 && `0${date.getMonth()+1}`}`)
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    var [, setShowMoneyLog] = useContext(onShowMoneyLog)
    var [year, month] = filterDate.split('-')

    const updateEntry = (e) => {
        console.log(e.target)
        setShowMoneyLog({ display: true, mode: 2, id: e.target.id})
    }

    const getFilter = (e) => {
        setFilterType(e.target.value)
    }
    const getFilterDate = (e) => {
        setFilterDate(e.target.value)
    }

    function dateFormatter(date) {
        return `${monthArr[parseInt(month)-1]} ${date.split('-')[1]}`;
    }
    
    function monthlySummary () {
        const monthLog = store.getState().moneyLog[`year-${year}`][`month-${month}`]
        if (monthLog) {
            return <div className="flex justify-around p-3 m-4 mb-4 rounded-lg border-2 border-y-gray-400  border-x-transparent">
                { monthLog.totalincome !== 0 && <p>Month's Income: {monthLog.totalincome} php</p>}
                { monthLog.totalexpenses !== 0 && <p>Month's Expenses: {monthLog.totalexpenses} php</p>}
            </div>
        }
    }

    function showLogs () {
        const monthLog = store.getState().moneyLog[`year-${year}`][`month-${month}`]
        if(monthLog) {
            return Object.entries(monthLog.dayLog).map(dayBreakdown =>
                (dayBreakdown[1][`${filterType}`].length !== 0 ) && <div key={dayBreakdown[0]} className="m-4 ">
                    <p>{dateFormatter(dayBreakdown[0])}</p>
                    {breakDown(dayBreakdown, `${filterType}`, dayBreakdown[0].split('-')[1])}
                </div>
            )
        }
    }

    function breakDown(dayBreakdown, type, date) {
        let idTemp = `${year}-${month}-${date}-${filterType}`
        return Object.entries(dayBreakdown[1][type]).map(log =>
            <div key={log[1]["id"]} id={`${idTemp}-${log[1]["id"]}`}  onClick={updateEntry} className="breakdown p-3 mb-4 rounded-lg hover:cursor-pointer">
                <div id={`${idTemp}-${log[1]["id"]}`} className="flex justify-between font-bold">
                    <p id={`${idTemp}-${log[1]["id"]}`}> {log[1]["item"]} </p>
                    <p id={`${idTemp}-${log[1]["id"]}`}> {log[1]["amount"]} php </p>
                </div>
                <p id={`${idTemp}-${log[1]["id"]}`}> { log[1]["notes"] !== "" && log[1]["notes"] } </p> 
            </div>
        )
    }

    return (
        <div>
            <div className="p-3 justify-around flex">
                <select name="filter" id="breakdownFilter" onChange={getFilter} className="flex-1 p-2 m-1 text-white">
                    <option value="expenses" className="p-1">Expenses</option>
                    <option value="income" className="p-1">Income</option>
                </select>
                <input className="flex-1 p-2 m-1 text-white" type="month" id="start" name="start" value={filterDate} onChange={getFilterDate}></input>
            </div>
            { Object.keys(store.getState().moneyLog).length !== 0 && monthlySummary() }
            { Object.keys(store.getState().moneyLog).length !== 0 && showLogs()}
        </div>
    );
}

export default MoneyBreakdown