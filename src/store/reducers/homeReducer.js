import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";


export const get_category = createAsyncThunk(
    'product/get_category',
    async(_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.get('/home/get-categorys')
            // console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 
export const get_products = createAsyncThunk(
    'product/get_products',
    async(_, { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.get('/home/get-products')
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 


export const price_range_product = createAsyncThunk(
    'product/price_range_product',
    async(_, { fulfillWithValue, rejectWithValue }) => {
        try {
            const {data} = await api.get('/home/price-range-latest-product')
             console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const query_products = createAsyncThunk(
    'product/query_products',
    async(query , { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.get(`/home/query-products?category=${query.category}&&rating=${query.rating}&&lowPrice=${query.low}&&highPrice=${query.high}&&sortPrice=${query.sortPrice}&&pageNumber=${query.pageNumber}&&searchValue=${query.searchValue ? query.searchValue : ''} `)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const product_details = createAsyncThunk(
    'product/product_details',
    async(slug, { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.get(`/home/product-details/${slug}`)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const customer_review = createAsyncThunk(
    'review/customer_review',
    async(info, { fulfillWithValue,rejectWithValue }) => {
        try {
            const {data} = await api.post('/home/customer/submit-review',info)
            //  console.log(data)
            return fulfillWithValue(data)
        } catch (error) {
            console.log(error.response)
            return rejectWithValue(error)
        }
    }
)
// End Method 

export const get_reviews = createAsyncThunk(
    "review/get_reviews",
    async ({ productId, pageNumber }, { rejectWithValue }) => {
      try {
        const { data } = await api.get(
          `/home/customer/get-reviews/${productId}?pageNo=${pageNumber}`
        );
        return data; // No need for fulfillWithValue
      } catch (error) {
        console.error(error.response?.data || "Error fetching reviews");
        return rejectWithValue(error.response?.data || "Something went wrong");
      }
    }
  );
// End Method 

export const get_banners = createAsyncThunk(
    "banner/get_banners",
    async (_, { fulfillWithValue,rejectWithValue }) => {
      try {
        const { data } = await api.get(
          `/banners`
        );
        return fulfillWithValue(data)
      } catch (error) {
        console.log(error.response);
        return rejectWithValue(error)
      }
    }
  );
// End Method 




export const homeReducer = createSlice({
    name: 'home',
    initialState:{
        categorys : [],
        products : [],
        totalProduct : 0,
        parPage: 3,
        latestProducts : [],
        topRatedProducts : [],
        discountedProducts : [],
        priceRange : {
            low: 0,
            high: 100
        },
        product: {},
        relatedProducts: [],
        moreProducts: [],
        errorMessage : '',
        successMessage: '',
        totalReview: 0,
        rating_review: [],
        reviews : [],
        banners: [] 
    },
    reducers : {

        messageClear : (state,_) => {
            state.errorMessage = ""
            state.successMessage = ""
        }
 
    },
    extraReducers: (builder) => {
        builder
        .addCase(get_category.fulfilled, (state, { payload }) => {
            state.categorys = payload.categorys;
        })
        .addCase(get_products.fulfilled, (state, { payload }) => {
            state.products = payload.products;
            state.latestProducts = payload.latestProducts;
            state.topRatedProducts = payload.topRatedProducts;
            state.discountedProducts = payload.discountedProducts;
        })
        .addCase(price_range_product.fulfilled, (state, { payload }) => { 
            state.latest_product = payload.latest_product;
            state.priceRange = payload.priceRange; 
        })
        .addCase(query_products.fulfilled, (state, { payload }) => { 
            state.products = payload.products;
            state.totalProduct = payload.totalProduct;
            state.parPage = payload.parPage; 
        })

        .addCase(product_details.fulfilled, (state, { payload }) => { 
            state.product = payload.product;
            state.relatedProducts = payload.relatedProducts;
            state.moreProducts = payload.moreProducts; 
        })

        .addCase(customer_review.fulfilled, (state, { payload }) => {
            state.successMessage = payload.message;
        })

        .addCase(get_reviews.fulfilled, (state, { payload }) => {
            state.reviews = payload.reviews;
            state.totalReview = payload.totalReview;
            state.rating_review = payload.rating_review;
        })

        .addCase(get_banners.fulfilled, (state, { payload }) => {
            state.banners = payload.banners;
        })


    }
})
export const {messageClear} = homeReducer.actions
export default homeReducer.reducer