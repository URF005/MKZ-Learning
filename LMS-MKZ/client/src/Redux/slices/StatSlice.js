import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import axiosInstanse from '../../helpers/AxiosInstance'

const initialState = {
    allUserCount: 0,
    subscribedCount: 0,
    // expiredCount: 0, // (optional) if you want to consume this from /admin/stats/users
}

export const getStats = createAsyncThunk("stats/get", async () => {
    try {
        toast.loading("Getting stats", { position: 'top-center' })
        const response = await axiosInstanse.get("/admin/stats/users")
        toast.dismiss()

        if (response.status === 200) {
            toast.success(response.data.message)
            return response.data
        } else {
            toast.error(response.data.message)
            throw new Error(response.data.message)
        }
    } catch (error) {
        toast.dismiss()
        toast.error(error?.response?.data?.message || "Failed to fetch stats")
        throw error
    }
})

const statSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getStats.fulfilled, (state, action) => {
            state.allUserCount = action.payload.allUserCount
            state.subscribedCount = action.payload.subscribedCount // ← fixed key
            // state.expiredCount = action.payload.expiredCount ?? 0 // (optional)
        })
    }
})

export default statSlice.reducer
