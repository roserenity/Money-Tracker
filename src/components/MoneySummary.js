import store from '../store'
import MoneySummaryItem from "./MoneySummaryItem"

const MoneySummary = () => {
  const { totalincome, totalexpenses, totalbalance } = store.getState()
  const STATEMENTS = [
    { statement: "INCOME", value: totalincome },
    { statement: "EXPENSES", value: totalexpenses },
    { statement: "BALANCE", value: totalbalance },
  ]
  const summaryCardList = STATEMENTS.map(item => {
    /**
     * 
     *  full summary of statements
     *  
     */
      return ( 
        <MoneySummaryItem 
          key = {item.statement}
          statement = {item.statement}
          value = {item.value}
        />
      )
    })

  return(
    <div id="MoneySummary" className="sticky top-0 flex justify-evenly pt-5 pb-5 rounded-t-lg">
      { summaryCardList }
    </div>
  );
}

export default MoneySummary
