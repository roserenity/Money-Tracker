import store from '../store'

const MoneySummary = () => {
  const STATEMENTS = ["income", "expenses", "balance"]

  return(
    <div id="MoneySummary" className="sticky top-0 flex justify-evenly pt-5 pb-5 rounded-t-lg">
      {
        STATEMENTS.map(statement => {
          return ( <div className="flex-initial w-fit bg-white p-3 rounded-lg drop-shadow-md font-bold">
              <p className="text-center text-base uppercase">{statement}</p>
              <p className="text-center text-lg">{store.getState()[`total${statement}`]}</p>
            </div>
          )
        })
      }
    </div>
  );
}

export default MoneySummary
