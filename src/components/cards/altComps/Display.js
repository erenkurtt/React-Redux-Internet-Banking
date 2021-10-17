
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },

  Come: {
    backgroundColor: '#bce6c8',

    color: '#575757'
  },
  Go: {
    backgroundColor: '#e6bcbc',

    color: '#575757'
  }
}));



export default function Display({ creditPayments }) {
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

          creditPayments.map((data) =>
            <ListItem button key={data.id}>
           
              <ListItemText primary={ DateSimpler(data.date) } />
              <ListItemText primary={ data.to_where } />
              <ListItemText primary={" -" + data.cost} />
            </ListItem>

          )

        }
      </List>
    </div>
  );
}