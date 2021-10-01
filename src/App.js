
import './App.css';
import Accounts from './components/accounts/Accounts';
import Payments from './components/payments/Payments';
import DetailedAcc from './components/accounts/DetailedAcc';
import Transfer from './components/transfer/Transfer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import CreateAcc from './components/accounts/CreateAcc';
import Cards from './components/cards/Cards';
import DetailedCard from './components/cards/altComps/DetailedCard';
import Credit from './components/credits/Credit';
import Currency from './components/currency/Currency';
import PickPayment from './components/payments/altComps/PickPayment';
import ChooseAcc from './components/credits/altComps/ChooseAcc';
import CreateCard from './components/cards/altComps/CreateCard';

function App() {
  return (
    <Router>

      <div>

        <Switch>
          <Route path="/accounts" exact>
            <Accounts />
          </Route>

          <Route path="/accounts/:acc_no" children={<DetailedAcc />} />

          <Route path="/payment" exact>
            <Payments />
          </Route>

          <Route path="/payment/:payment_type" children={<PickPayment />} />

         
          <Route path="/create-account" exact >
            <CreateAcc />
          </Route>

          <Route path="/transfer" exact >
            <Transfer />
          </Route>

          <Route path="/cards" exact >
            <Cards />
          </Route>

          <Route path="/cards/:card_no" children={<DetailedCard />} />

          <Route path="/create-new-card" children={<CreateCard />} />

          <Route path="/credits" exact >
            <Credit />
          </Route>

          <Route path="/credits/chooseAcc/:currency_type" children={<ChooseAcc />} />
          

          <Route path="/currency" exact >
            <Currency />
          </Route>
          
        </Switch>


      </div>

    </Router >
  );
}

export default App;
