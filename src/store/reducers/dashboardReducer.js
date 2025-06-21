import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_dashboard_index_data = createAsyncThunk(
    'dashboard/get_dashboard_index_data',
    async(userId, {rejectWithValue,fulfillWithValue}) => {
        try {
            console.log("get dashboar index data")
            const {data} = await api.get(`/home/customer/get-dashboard-index-data/${userId}`)
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

// End method


export const dasboardReducer = createSlice({
    
    name: 'dashboard',
    initialState:{
        recentOrders: [],
        errorMessage: '',
        successMessage: '',
        totalOrders: 0,
        pendingOrders: 0,
        cancelledOrders: 0
    },



    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }

    },
    extraReducers:(builder) => {
        builder
        .addCase(get_dashboard_index_data.fulfilled, (state, {payload}) => {
            state.cancelledOrders = payload.cancelledOrders;
            state.totalOrders = payload.totalOrders;
            state.pendingOrders = payload.pendingOrders;
            state.recentOrders = payload.recentOrders;
        })

    

    }
})

export const {messageClear} = dasboardReducer.actions
export default dasboardReducer.reducer