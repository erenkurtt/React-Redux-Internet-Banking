
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  Come: {

    color:'#27cc5b'
  },
  Go :{
    color:'#cc2727'
  }
}));



export default function Display({transfers, accountInfos}) {
  const classes = useStyles();

  function DateSimpler(date){
    
      if( isNaN(date[0]) ){
        return date.slice(0,24);
      }
      else{
       return date.slice(0,10) + " " + date.slice(12,19);
      }
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        {

          transfers.map((data) => data.from_no === accountInfos.account_no ?
            <ListItem button   >
              <ListItemIcon>
                <ArrowBackIcon />
              </ListItemIcon>
              <ListItemText primary={ DateSimpler(data.date)  } />
              <ListItemText primary={ data.to_no } />
              <ListItemText className={classes.Go} primary={ "  - "+ data.total}  />
            </ListItem>



            :


            <ListItem button  >
              <ListItemIcon>
                <ArrowForwardIcon />
              </ListItemIcon>
              <ListItemText primary={  DateSimpler(data.date) } />
              <ListItemText primary={ data.from_no } />
              <ListItemText className={classes.Come} primary={ "  + "+ data.total}  />
            </ListItem>

          )

        }
      </List>
    </div>
  );
}