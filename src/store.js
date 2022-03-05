import { createStore } from "redux"; 
import reducer from './reducer' 

var initialState = {
    totalIncome: 0,
    totalExpenses: 0,
    totalBalance: 0,
    moneyLog: {
        "year-2022" : {
            "month-02": [{
                "date-1": {
                    totalExpenses: 0,
                    totalIncome: 0,
                    expenses: [{
                        icon: "",
                        item: "album",
                        amount: 12,
                        notes: ""
                    }, {
                        icon: "",
                        item: "food",
                        amount: 120,
                        notes: ""
                    }],
                    income: [{
                        icon: "",
                        item: "sahod",
                        amount: 13,
                        notes: ""
                    }]
                },
                "date-2": {
                    totalExpenses: 0,
                    totalIncome: 0,
                    expenses: [{
                        icon: "",
                        item: "chicken",
                        amount: 500,
                        notes: ""
                    }],
                    income: [{
                        icon: "",
                        item: "sahod",
                        amount: 1,
                        notes: ""
                    }]
                }
            }],
            "month-03": [{
                "date-1": {
                    totalExpenses: 0,
                    totalIncome: 0,
                    expenses: [{
                        icon: "",
                        item: "icecream",
                        amount: 12,
                        notes: ""
                    }],
                    income: [{
                        icon: "",
                        item: "sahod",
                        amount: 13,
                        notes: ""
                    }]
                },
                "date-2": {
                    totalExpenses: 0,
                    totalIncome: 0,
                    expenses: [{
                        icon: "",
                        item: "chocolate",
                        amount: 500,
                        notes: ""
                    },
                    {
                        icon: "",
                        item: "panggala",
                        amount: 1000,
                        notes: ""
                    }],
                    income: [{
                        icon: "",
                        item: "sahod",
                        amount: 1,
                        notes: ""
                    }]
                }
            }]
        }
    }
}
const store = createStore(reducer, initialState);
export default store