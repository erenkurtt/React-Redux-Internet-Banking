const TransferReducer = (  state = { sender:[], taker:[], amount:0 } , action  ) => {

        switch(action.type){
            case 'SET_SENDER':
                return { sender:action.payload , taker:state.taker, amount:state.amount };
            
            case 'SET_TAKER' :
                return  { sender:state.sender , taker: action.payload, amount:state.amount };

            case 'SET_AMOUNT' : 
                return  { sender:state.sender , taker:state.taker, amount:action.payload };

            default :
                return state;
        }

}

export default TransferReducer