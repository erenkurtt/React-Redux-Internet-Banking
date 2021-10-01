const CreditReducer = (  state = { amount: 0 , currency: "", duedate:0 , repay:0} , action  ) => {

    switch(action.type){
        case 'SET_CREDIT':
            return  { amount: action.payload.amount , currency: action.payload.currency, 
                duedate:action.payload.duedate , repay: action.payload.repay };
        
        default :
            return state;
    }

}

export default CreditReducer