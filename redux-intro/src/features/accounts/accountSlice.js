import { createSlice } from "@reduxjs/toolkit";

// Initial State

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: {
            amount,
            purpose,
          },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;

        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    converingCurrency(state) {
      state.isLoading = true;
    },
  },
});

console.log(accountSlice);

export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export const deposit = (amount, currency) => {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async (dispatch, getState) => {
    dispatch({ type: "account/convertingCurrency" });
    // API Call
    const response = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
    );
    const data = await response.json();
    const converted = data.rates.USD;
    console.log(converted);
    // return action

    dispatch({ type: "account/deposit", payload: converted });
  };
};

// // Redcuer function

// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       return state.loan
//         ? state
//         : {
//             ...state,
//             loan: action.payload.amount,
//             loanPurpose: action.payload.purpose,
//             balance: state.balance + action.payload.amount,
//           };
//     case "account/payLoan":
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: "",
//         balance: state.balance - state.loan,
//       };
//     case "account/convertingCurrency":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//     // throw new Error(`Invalid Option ${action.type}`);
//   }
// }

// // Action Creators

// export const deposit = (amount, currency) => {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };

//   return async (dispatch, getState) => {
//     dispatch({ type: "account/convertingCurrency" });
//     // API Call
//     const response = await fetch(
//       `https://api.frankfurter.dev/v1/latest?amount=${amount}&base=${currency}&symbols=USD`
//     );
//     const data = await response.json();
//     const converted = data.rates.USD;
//     console.log(converted);
//     // return action

//     dispatch({ type: "account/deposit", payload: converted });
//   };
// };

// export const withdraw = (amount) => {
//   return { type: "account/withdraw", payload: amount };
// };
// export const requestLoan = (amount, purpose) => {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// };

// export const payLoan = () => {
//   return {
//     type: "account/payLoan",
//   };
// };
