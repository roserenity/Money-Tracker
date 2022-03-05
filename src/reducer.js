function reducer(state, action) {	
    switch(action){
        case "getSummary":
            return [state.totalIncome, state.totalExpenses, state.totalBalance]
        default:
            return state
    }
        
}

export default reducer;