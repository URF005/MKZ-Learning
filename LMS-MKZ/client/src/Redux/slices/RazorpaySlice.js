import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axiosInstance from "../../helpers/AxiosInstance";

const initialState = {
  transactions: [],
  revenue: 0,
  expiredCount: 0,
  approvedCount: 0,
  rejectedCount: 0,
};

export const uploadReceipt = createAsyncThunk(
  "/uploadReceipt",
  async (formData) => {
    try {
      const response = await axiosInstance.post("/payments/upload", formData);
      toast.success(response.data.message);
      return response.data.payment;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const getAllTransactions = createAsyncThunk(
  "/getAllTransactions",
  async () => {
    try {
      const response = await axiosInstance.get("/payments");
      return response.data;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const updateTransactionStatus = createAsyncThunk(
  "/updateTransactionStatus",
  async ({ transactionId, status }) => {
    try {
      const response = await axiosInstance.post(
        `/payments/update/${transactionId}`,
        { status }
      );
      toast.success(response.data.message);
      return response.data.payment;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

export const expireTransaction = createAsyncThunk(
  "/expireTransaction",
  async (transactionId) => {
    try {
      const response = await axiosInstance.post(`/payments/expire/${transactionId}`);
      toast.success(response.data.message);
      return response.data.payment;
    } catch (error) {
      toast.error(error?.response?.data?.message);
      throw error;
    }
  }
);

const razorpaySlice = createSlice({
  name: "razorpay",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload.payments;
      state.revenue = action.payload.stats.revenue;
      state.expiredCount = action.payload.stats.expired;
      state.approvedCount = action.payload.stats.approved;
      state.rejectedCount = action.payload.stats.rejected;
    });
    builder.addCase(updateTransactionStatus.fulfilled, (state, action) => {
      const idx = state.transactions.findIndex((t) => t._id === action.payload._id);
      if (idx !== -1) state.transactions[idx] = action.payload;
    });
    builder.addCase(expireTransaction.fulfilled, (state, action) => {
      const idx = state.transactions.findIndex((t) => t._id === action.payload._id);
      if (idx !== -1) state.transactions[idx] = action.payload;
      state.expiredCount += 1;
    });
  },
});

export default razorpaySlice.reducer;
