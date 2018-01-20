import { SELECT_API_KEY, CANCEL_ORDER, SELECT_MARKET,
  PLACE_ORDER, GET_MY_ORDERS, UPDATE_RATINGS, UPDATE_TICKER, UPDATE_ORDER_BOOK } from '../actions/terminal';
import { ADD_API_KEY, DELETE_API_KEY } from '../actions/apiKeys';
import { generateId } from '../demoData/util';

export default function(state = {
  selectedApiKey: null,
  selectedMarket: 'USDT-BTC',
  orders: {open: [], completed: []},
  ratings: [],
  ticker: {},
  orderBook: {sell: [], buy: []},
}, action) {
  switch(action.type) {
    case UPDATE_TICKER:
      return {...state, ticker: action.ticker};
    case SELECT_API_KEY: {
      return {...state, selectedApiKey: action.key};
    }
    case UPDATE_ORDER_BOOK:
      return {...state, orderBook: action.orderBook};
    case CANCEL_ORDER: {
      const id = action.order._id;
      const openOrders = state.orders.open.filter(o => o._id !== id);
      return {...state, orders: {open: openOrders, completed: state.orders.completed}};
    }
    case SELECT_MARKET: {
      if(action.selectedMarket === state.selectedMarket) {
        return state;
      } else {
        return {...state, selectedMarket: action.market, ticker: {}, orderBook: {sell: [], buy: []}};
      }
    }
    case PLACE_ORDER: {
      const order = action.order;
      order._id = generateId();
      const open = state.orders.open;
      return {...state, orders: {completed: state.orders.completed, open: [order].concat(open)}}; 
    }
    case ADD_API_KEY:
      if(!state.selectedApiKey) {
        return {...state, selectedApiKey: action.apiKey};
      } else {
        return state;
      }
    case GET_MY_ORDERS: {
      const {openTrades: open, closedTrades: completed} = action.orders;
      return {...state, orders: {open, completed}};
    }
    case DELETE_API_KEY:
      if(state.selectedApiKey && state.selectedApiKey._id === action.apiKey._id) {
        return {...state, selectedApiKey: null};
      } else {
        return state;
      }
    case UPDATE_RATINGS:
      return {...state, ratings: action.ratings};
    default:
      return state;
  }
}
