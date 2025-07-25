import authReducer  from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import chatReducer from "./reducers/chatReducer";
import dasboardReducer from "./reducers/dashboardReducer";
import homeReducer  from "./reducers/homeReducer";
import orderReducer from "./reducers/orderReducer";


const rootReducer = {
    home: homeReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    dashboard: dasboardReducer,
    chat: chatReducer

}

export default rootReducer;