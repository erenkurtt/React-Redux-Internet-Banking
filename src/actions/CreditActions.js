export const SetCredit = (amount , currency, duedate , repay) =>{
   
    return(dispatch) => {
        dispatch({
            type:"SET_CREDIT",
            payload:{
                amount: amount,
                currency: currency ,
                duedate: duedate ,
                repay :repay  
            }
        })
    }
} 