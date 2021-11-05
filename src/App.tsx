import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import checkAuth from "./components/checkAuth";
import Login from "./pages/auth/login";
import Log from "./pages/log";
import Plan from "./pages/plan/index";
import User from "./pages/user";
import UserDetail from "./pages/user/user-detail";
import ErrorCampaign from "./pages/errorCampaign/index";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={Login} />
        <Route path="/users" exact component={checkAuth(User)} />
        <Route path="/users/:userId" exact component={checkAuth(UserDetail)} />
        <Route path="/log" exact component={checkAuth(Log)} />
        <Route path="/plan" exact component={checkAuth(Plan)} />
        <Route path="/error-campaign" exact component={checkAuth(ErrorCampaign)} />
        <Route exact>
          <Redirect to="/users" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
