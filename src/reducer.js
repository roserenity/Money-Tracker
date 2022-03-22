
const initialState = {
    totalincome: 0,
    totalexpenses: 0,
    totalbalance: 0,
    moneyLog: {}
}

function generateID() {
    return "id" + Math.random().toString(16).slice(7)
}

function calcAdd(state, payload, payloadType){
    var [year, month,] = payload.date.split('-')

    state["moneyLog"][`year-${year}`][`month-${month}`][`total${payloadType}`] += parseInt(payload.amount)
    state[`total${payloadType}`] += parseInt(payload.amount)
    state["totalbalance"] = state["totalincome"] - state["totalexpenses"]

    return state
}

function calcDel(state, payload, payloadType, amount){
    var [year, month, ] = payload.date.split('-')

    state["moneyLog"][`year-${year}`][`month-${month}`][`total${payloadType}`] -= parseInt(amount)
    state[`total${payloadType}`] -= parseInt(amount)
    state["totalbalance"] = state["totalincome"] - state["totalexpenses"]

    return state
}

function add(state, payload, payloadType) {

    var [year, month, date] = payload.date.split('-')
    
    if (!state["moneyLog"].hasOwnProperty(`year-${year}`)) {
        Object.assign(state["moneyLog"], { [`year-${year}`] : {} })
    }
    if (!state["moneyLog"][`year-${year}`].hasOwnProperty(`month-${month}`)) {
        Object.assign(state["moneyLog"][`year-${year}`], {[`month-${month}`]:{}})
    }
    if (!state["moneyLog"][`year-${year}`][`month-${month}`].hasOwnProperty("totalexpenses")) {
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`], {totalexpenses: 0})
    }
    if (!state["moneyLog"][`year-${year}`][`month-${month}`].hasOwnProperty("totalincome")) {
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`], {totalincome: 0})
    }
    if (!state["moneyLog"][`year-${year}`][`month-${month}`].hasOwnProperty("dayLog")) {
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`], {totalincome: 0})
    }
    if (!state["moneyLog"][`year-${year}`][`month-${month}`].hasOwnProperty("dayLog")) {
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`], {"dayLog": { }})  
    }
    if (!state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"].hasOwnProperty(`date-${date}`)) {
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"], { [`date-${date}`]: {}})   
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`], {expenses: []})   
        Object.assign(state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`], {income: []})   
    }
    var generatedID = generateID()

    state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${payloadType}`].map(obj => {
        while(obj["id"] === generatedID) {
            generatedID = generateID() 
        }
    })

    state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${payloadType}`].push({
        id: generatedID,
        item: payload.item,
        amount: payload.amount, 
        notes:  payload.notes
    })

    return state = calcAdd(state, payload, payloadType)
}

function del(state, payload, payloadType, id) {
    var [year, month, date] = payload.date.split('-')
    var index = 0

    Object.entries(state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${payloadType}`]).map(log => {
        if(log[1]["id"] === id) {
           index = log[0]
        }
    })

    state = calcDel(state, payload, payloadType, payload.amount)
    state["totalbalance"] = state["totalincome"] - state["totalexpenses"]
    state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${payloadType}`].splice(index, 1)
    return state
}

function edit(state, payload, payloadType, id) {
    var [year, month, date] = payload.date.split('-')
    var prevAmount = 0

    Object.entries(state["moneyLog"][`year-${year}`][`month-${month}`]["dayLog"][`date-${date}`][`${payloadType}`]).map(log => {
        if(log[1]["id"] === id) {
            prevAmount = log[1]["amount"]
            log[1]["item"] = payload.item
            log[1]["amount"] = payload.amount
            log[1]["notes"] = payload.notes
        }
    })

    state = calcDel(state, payload, payloadType, prevAmount)
    state = calcAdd(state, payload, payloadType)

    return state
}

function reducer(state = initialState, action) {	
    switch(action.type){
        case "add": 
            return add(state, action.payload, action.payloadType)
        case "del": 
            return del(state, action.payload, action.payloadType, action.payloadID)
        case "edit":
            return edit(state, action.payload, action.payloadType, action.payloadID)
        default:
            return state
    }
        
}

export default reducer;