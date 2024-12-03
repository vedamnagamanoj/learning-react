import { combineReducers, createStore } from "redux";

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};
const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      return state.loan
        ? state
        : {
            ...state,
            loan: action.payload.amount,
            loanPurpose: action.payload.purpose,
            balance: state.balance + action.payload.amount,
          };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
    // throw new Error(`Invalid Option ${action.type}`);
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });
// store.dispatch({ type: "account/deposit", payload: 500 });

// console.log("Hey Redux");
// console.log(store.getState());
// store.dispatch({ type: "account/withdraw", payload: 50 });
// console.log(store.getState());

// store.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1200, purpose: "Buy a car" },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payLoan" });

// console.log(store.getState());

// function deposit(amount) {
//   return { type: "account/deposit", payload: amount };
// }
const deposit = (amount) => {
  return { type: "account/deposit", payload: amount };
};

const withdraw = (amount) => {
  return { type: "account/withdraw", payload: 50 };
};
const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
};

const payLoan = () => {
  return {
    type: "account/payLoan",
  };
};

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(50));
console.log(store.getState());

store.dispatch(requestLoan(1200, "For Movie Tickets"));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());

const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
};

const updateName = (fullName) => {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
};

store.dispatch(createCustomer("Naga Manoj", "123-456-789"));
console.log(store.getState());

store.dispatch(updateName("Naga Manoj Vedam"));
console.log(store.getState());
