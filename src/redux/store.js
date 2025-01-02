import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/ThemeSlice';
import logoutModalReducer from './features/LogoutModalSlice';
import ordersDataReducer from './features/OrdersDataSlice';
import vendorsDataReducer from './features/VendorsData.js'
import appReducer from './features/appSlice'; // Import the app slice for the reset functionality

// Combine all reducers
const rootReducer = combineReducers({
    theme: themeReducer,
    logoutModal: logoutModalReducer,
    ordersData: ordersDataReducer,
    vendorsData : vendorsDataReducer,
    app: appReducer, // Add the app reducer for reset
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
