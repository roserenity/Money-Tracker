import store from '../store'
import { useState } from 'react'

const InputExpenseAndIncome = () => {
    return (
        <div className="flex justify-center">
            <div className="flex flex-col w-screen md:w-4/5 pt-2 drop-shadow-md">
                <select name="filter" id="breakdownFilter" className="p-2 m-2 text-white">
                    <option value="Expenses" className="p-1">Expenses</option>
                    <option value="Income" className="p-1">Income</option>
                </select>
                <input className="border-0 p-2 m-2 appearance-none drop-shadow-md" type="text" placeholder="Item" required/>
                <input className="border-0 p-2 m-2 appearance-none drop-shadow-md" type="number" placeholder="Amount" required/>
                <textarea className="border-0 p-2 m-2 drop-shadow-md" type="text" placeholder="Notes"/>
                <button className="rounded-full drop-shadow-lg w-auto p-2 m-2 bg-amber-500 text-white" type="Submit">Add Entry</button>
            </div>
        </div>

    )
}

export default InputExpenseAndIncome