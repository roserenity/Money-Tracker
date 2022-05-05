import store from '../store'
import { useState, useContext, useRef } from 'react';
import { onShowMoneyLog } from '../App';

const LogForm = () => {
    const [loading, setLoading] = useState()
    var [showMoneyLog, setShowMoneyLog] = useContext(onShowMoneyLog)
    var {id, type, item, amount, notes, year, month, date} = useRef()
    var mode = useRef("Add")
    
    function getDefaultValue() {
        /**
         * 
         *  get selected log info
         *  
         */
        let [_year, _month, _date, _type, _id]= showMoneyLog.id.split('-')
        id = _id
        type = _type
        year = _year
        month = _month
        date = _date
        Object.entries(store.getState().moneyLog[`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${type}`]).forEach(logs=>{
            if(logs[1]["id"] === id) {
                 ({id, item, amount, notes} = logs[1])
            }
        }) 
    }

    function showLoading() {
        /**
         * 
         *  loading screen 
         *  
         */
        return <div className="z-50 fixed flex flex-row justify-center bg-neutral-300/50 absolute top-0 h-full w-full">
          <div id="loading-1" className=" h-3 w-3 m-4 bg-rose-600 my-auto animate-ping" viewBox="0 0 30 30"> </div>
          <div id="loading-2" className=" h-3 w-3 m-4 bg-rose-600 my-auto" viewBox="0 0 30 30"> </div>
          <div id="loading-3" className=" h-3 w-3 m-4 bg-rose-600 my-auto" viewBox="0 0 30 30"> </div>
        </div>
    }

    function formSubmit(e) {
        /**
         * 
         *  on form submit
         *  
         */
        e.preventDefault();
        var date = e.target.date.value
        var type = e.target.type.value
        var item = e.target.item.value
        var amount = e.target.amount.value
        var notes = e.target.notes.value
        var log = {
            "date": date,
            "item": item,
            "amount": amount,
            "notes": notes
        }
        try {
            switch(mode.current) {
                case "add": 
                    store.dispatch({ 
                        type: 'add', 
                        payload: log, 
                        payloadType:type
                    })
                    break;
                case "edit": 
                    store.dispatch({ 
                        type: 'edit', 
                        payload: log, 
                        payloadType:type, 
                        payloadID: id
                    })
                    break;
                case "delete": 
                    store.dispatch({ 
                        type: 'del', 
                        payload: log, 
                        payloadType:type, 
                        payloadID: id
                    })
                    break;
                default:
            }
            setLoading(true)
            setTimeout(()=> {
                setLoading(false)
                setShowMoneyLog({
                    display: false, 
                    mode: 1, 
                    id: null
                })
            }, 5000)
        } catch(e) {
            console.log(e)
        }
    }

    if(showMoneyLog.mode === 2){
        /**
         * 
         *  EDIT MODE = 2
         *  
         */
        getDefaultValue()
    }

    return (
        <div className="flex justify-center">
            { loading === true && showLoading()}
            <div className="w-screen md:w-2/5 pt-2 drop-shadow-md">
                <form onSubmit={formSubmit} className="grid justify-items-center">
                    <input id="date" type="date" defaultValue={showMoneyLog.mode === 2 && `${year}-${month}-${date}`} className="form-input" readOnly={showMoneyLog.mode === 2 && true} required/>
                    <select id="type" defaultValue={showMoneyLog.mode === 2 ? type : "expenses"} className="form-input text-white">
                        <option value="expenses" className="p-1">Expenses</option>
                        <option value="income" className="p-1">Income</option>
                    </select>
                    <input id="item" defaultValue={showMoneyLog.mode === 2 ? item : ""} className="form-input appearance-none drop-shadow-md" type="text" placeholder="Item"  readOnly={loading && true} required/>
                    <input id="amount" defaultValue={showMoneyLog.mode === 2 ? amount : ""} className="form-input appearance-none drop-shadow-md" type="number" placeholder="Amount" readOnly={loading && true} required/>
                    <textarea id="notes" defaultValue={showMoneyLog.mode === 2 ? notes : ""} className="form-input drop-shadow-md" type="text" placeholder="Notes" readOnly={loading && true} />
                    {
                        showMoneyLog.mode === 1 ? <button id="btn" value="add" onClick={()=>mode.current = "add"} className="form-btn btn" type="Submit" disabled={loading && true}>Add Entry</button>
                            : <div className="mb-3">
                                <button id="btn" value="delete" onClick={()=>mode.current = "delete"} className="form-btn btn" type="Submit" disabled={loading && true}>Delete</button>
                                <button id="btn" value="edit" onClick={()=>mode.current = "edit"} className="form-btn btn" type="Submit" disabled={loading && true}>Update</button> 
                            </div>
                    }
                </form>
            </div>
        </div>
    )
}

export default LogForm
