export const SetSender = (item) =>{
   
    return(dispatch) => {
        dispatch({
            type:"SET_SENDER",
            payload:item
        })
    }
} 

export const SetTaker = (item) =>{
   
    return(dispatch) => {
        dispatch({
            type:"SET_TAKER",
            payload:item
        })
    }
} 

export const SetAmount = (item) =>{
   
    return(dispatch) => {
        dispatch({
            type:"SET_AMOUNT",
            payload:item
        })
    }
} 