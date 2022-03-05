import store from '../store'

const MoneySummary = () => {
  return(
    <div id="MoneySummary" className="sticky top-0 flex justify-evenly pt-5 pb-5 rounded-t-lg">
      <div className="flex-initial w-fit bg-white p-3 rounded-lg drop-shadow-md font-bold">
        <p className="text-center text-base">INCOME</p>
        <p className="text-center text-lg">{store.getState().totalIncome}</p>
      </div>
      <div className="flex-initial w-fit bg-white p-3 rounded-lg drop-shadow-md font-bold">
        <h5 className="text-center text-base">EXPENSES</h5>
        <h3 className="text-center text-lg">{store.getState().totalExpenses}</h3>
      </div>
      <div className="flex-initial w-fit bg-white p-3 rounded-lg drop-shadow-md font-bold">
        <h5 className="text-center text-base">BALANCE</h5>
        <h3 className="text-center text-lg">{store.getState().totalBalance}</h3>
      </div>
    </div>
  );
}

export default MoneySummary
