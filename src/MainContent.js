import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Col } from 'reactstrap';
import qs from 'qs';

import Login from './containers/login/LoginContainer';
import Dashboard from './containers/dashboard';
import Terminal from './containers/terminal/Terminal';
import History from './containers/history';
import Profile from './containers/profile/ProfileContainer';
import Leaderboard from './containers/leaderboard/Leaderboard';
import Hashlog from './containers/hashlog/Hashlog';
import ActionList from './containers/hashlog/ActionList';
import Staking from './containers/staking/Staking';
import Tariffs from './containers/tariffs/TariffsContainer';
import FAQ from './containers/faq';
import Payments from './containers/payments/PaymentsContainer';
import './MainContent.css';
import NotificationBar from './components/NotificationBar';
import { ApiNotification } from './generic/api';
import { redirectToAuthorization } from './actions/auth';

const NotificationApi = new ApiNotification();

const defaultRoute = '/terminal';

class MainContent extends React.Component {

  componentDidMount() {
    this.getNotificationData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  getNotificationData = async () => {
    const { showNotificationBar } = this.props;
    try {
      const data = await NotificationApi.fetch();
      data.forEach(({id, message, type, url}) => {
        showNotificationBar(type, id, message, url);
      });
    } catch(e) {
      console.error(e);
    }
  }

  renderNotificationBar = () => {
    const {
      isNotificationOpen,
      closeNotificationBar,
      notificationMessage,
      notificationUrl,
      notificationType,
      notificationID,
    } = this.props;
    return (
      isNotificationOpen &&
      <NotificationBar
        closeNotification={closeNotificationBar}
        url={notificationUrl}
        message={notificationMessage}
        notificationType={notificationType}
        notificationID={notificationID}
      />
    );
  }

  render() {
    const {loggedIn, profile} = this.props;
    return (
      <Col xs="12" md>
        {this.renderNotificationBar()}
        <Switch>
          <LoginRoute exact path="/login" loggedIn={loggedIn}/>
          <ProtectedRoute path="/dashboard" component={Dashboard} loggedIn={loggedIn}/>
          <Route exact path="/terminal" component={Terminal} loggedIn={loggedIn}/>
          <Route exact path="/terminal/:exchange" component={Terminal} loggedIn={loggedIn}/>
          <Route exact path="/terminal/:exchange/:market" component={Terminal} loggedIn={loggedIn}/>
          <ProtectedRoute path="/history" component={History} loggedIn={loggedIn}/>
          <Route path="/staking" component={Staking} loggedIn={loggedIn}/>
          <Route exact path="/tariffs" component={Tariffs} loggedIn={loggedIn}/>
          <Route exact path="/howitworks" component={FAQ} />
          <ProtectedRoute exact path="/payments/" component={Payments} loggedIn={loggedIn}/>
          <Redirect exact from="/ratings" to="/leaderboard"/>
          <Route exact path="/hashlog" component={Hashlog} loggedIn={loggedIn}/>
          <Route exact path="/hashlog/actions/" component={ActionList} loggedIn={loggedIn}/>
          <Route exact path="/leaderboard" component={Leaderboard}/>
          <Route exact path="/rating" component={Leaderboard}/>
          <Route exact path="/selection" component={Leaderboard}/>
          <ProfileRoute exach path="/profile" loggedIn={loggedIn} profile={profile} />
          <Route exact path="/:id" component={Profile}/>
          <Redirect exact from="/" to={defaultRoute}/>
        </Switch>
      </Col>
    );
  }
}

const ProfileRoute = ({ loggedIn, profile, ...props }) => {
  if (loggedIn) {
    return <Redirect to={`/${profile.name}`} />;
  } else {
    redirectToAuthorization(props.path);
    return null;
  }
};

const LoginRoute = ({ loggedIn, ...props }) => {
  if(loggedIn) {
    const { location } = props;
    const { redirectTo } = qs.parse(location.search.slice(1));
    const route = redirectTo || defaultRoute;
    return (<Redirect to={route} />);
  } else {
    return (<Route  {...props} component={Login} />);
  }
};

const ProtectedRoute = ({ component, loggedIn, ...props }) => {
  if(!loggedIn) {
    redirectToAuthorization(props.path);
    return null;
  } else {
    return (<Route {...props} component={component} />);
  }
};

export default MainContent;
