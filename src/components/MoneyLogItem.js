import { useContext } from 'react'
import { onShowMoneyLog } from '../App';

export default function MoneyLogItem(prop) {
    
    const { logID, idTemp, item, amount, notes } = prop
    const [, setShowMoneyLog] = useContext(onShowMoneyLog)

    const updateEntry = (e) => {
        /**
         * 
         *  set mode to edit, set selected id
         *  
         */
        setShowMoneyLog({ display: true, mode: 2, id: e.target.id})
    }
    
    return (
        <div key={logID} id={`${idTemp}-${logID}`}  onClick={updateEntry} className="breakdown p-3 mb-4 rounded-lg hover:cursor-pointer">
            <div id={`${idTemp}-${logID}`} className="flex justify-between font-bold">
                <p id={`${idTemp}-${logID}`}> { item } </p>
                <p id={`${idTemp}-${logID}`}> { amount } php </p>
            </div>
            <p id={`${idTemp}-${logID}`}> { notes !== "" && notes } </p> 
        </div>
    )
}