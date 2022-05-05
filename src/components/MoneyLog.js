import store from '../store'
import { useState } from 'react'
import MoneyLogItem from './MoneyLogItem'

const MoneyLog = () => {
    var date = new Date()
    var [filterType, setFilterType] = useState("expenses")
    var [filterDate, setFilterDate] = useState(`${date.getFullYear()}-${date.getMonth() < 10 && `0${date.getMonth()+1}`}`)
    const monthArr = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var [year, month] = filterDate.split('-')

    const getFilter = (e) => {
        setFilterType(e.target.value)
    }
    
    const getFilterDate = (e) => {
        setFilterDate(e.target.value)
    }

    function dateFormatter(date) {
        /**
         * 
         *  format date - MMMM DD
         * 
         */
        return `${monthArr[parseInt(month)-1]} ${date.split('-')[1]}`;
    }
    
    function monthlySummary () {
        /**
         * 
         *  display monthly summary of expenses and income
         * 
         */
        const yearLog = store.getState().moneyLog[`year-${year}`]
        if (yearLog && yearLog[`month-${month}`]) {
            const { totalincome, totalexpenses } = yearLog[`month-${month}`]
            if (totalincome !== 0 && totalexpenses !== 0){
                return <div className="flex justify-around p-3 m-4 mb-4 rounded-lg border-2 border-y-gray-400  border-x-transparent">
                    { totalincome !== 0 && <p>Month's Income: {totalincome} php</p> }
                    { totalexpenses !== 0 && <p>Month's Expenses: {totalexpenses} php</p> }
                </div>
            }
        }
    }

    function showLogs () {
        /**
         * 
         *  function to show logs with it's date
         * 
         */
        const yearLog = store.getState().moneyLog[`year-${year}`]
        if(yearLog && yearLog[`month-${month}`]) {
            return Object.entries(yearLog[`month-${month}`].dayLog).map(dayBreakdown =>
                (dayBreakdown[1][`${filterType}`].length !== 0 ) && <div key={dayBreakdown[0]} className="m-4 ">
                    <p>{dateFormatter(dayBreakdown[0])}</p>
                    {breakDown(dayBreakdown, `${filterType}`, dayBreakdown[0].split('-')[1])}
                </div>
            )
        }
    }

    function breakDown(dayBreakdown, type, date) {
        /**
         * 
         *  display each log with MoneyLogItem
         *  
         */
        let idTemp = `${year}-${month}-${date}-${filterType}`
        var arr = Object.entries(dayBreakdown[1][type]).map(log =>
            {return (
                <MoneyLogItem 
                    key={idTemp}
                    logID = {log[1].id}
                    idTemp = {idTemp}
                    item = {log[1].item}
                    amount = {log[1].amount}
                    notes = {log[1].notes}
                />
            )}
        )
        return arr
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

export default MoneyLog