import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import LoopIcon from '@material-ui/icons/Loop';
import ReceiptIcon from '@material-ui/icons/Receipt';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import EuroIcon from '@material-ui/icons/Euro';
import StarsIcon from '@material-ui/icons/Stars';
import CreateIcon from '@material-ui/icons/Create';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    //width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  items: {
    borderBottom: "1px solid #e8e8e8"
  },
  bottomItems: {

  }
}));



export default function Navigation() {
  const classes = useStyles();

  return (
    <div className={classes.root}>

      
      <List component="nav" aria-label="main mailbox folders">
        <Link to="/accounts">
          <ListItem button className={classes.items}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
        </Link>

        <Link to="/transfer">
          <ListItem button className={classes.items} >
            <ListItemIcon>
              <LoopIcon />
            </ListItemIcon>
            <ListItemText primary="Money Transfer" />
          </ListItem>
        </Link>

        <Link to="/cards">
          <ListItem button className={classes.items} >
            <ListItemIcon>
              <CreditCardIcon />
            </ListItemIcon>
            <ListItemText primary="Cards" />
          </ListItem>
        </Link>

        <Link to="/payment">
          <ListItem button className={classes.items}  >
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Payments" />
          </ListItem>
        </Link>

        <Link to="/credits">
          <ListItem button className={classes.items} >
            <ListItemIcon>
              <CardTravelIcon />
            </ListItemIcon>
            <ListItemText primary="Credits" />
          </ListItem>
        </Link>

        <Link to="/currency" >
          <ListItem button className={classes.items} >
            <ListItemIcon>
              <EuroIcon />
            </ListItemIcon>
            <ListItemText primary="Currency" />
          </ListItem>
        </Link>


      </List>

      <List component="nav" aria-label="main mailbox folders" className={classes.bottomItems} >

        

        <ListItem button className={classes.items} >
          <ListItemIcon>
            <PowerSettingsNewIcon />
          </ListItemIcon>
          <ListItemText primary="Log out" />
        </ListItem>
      </List>

    </div>
  );
}