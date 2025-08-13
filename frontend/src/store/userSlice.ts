import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    id: string | null;
    name: string | null;
    email: string | null;
    points: number;
    location?: string;
    loading: boolean;
}

const initialState: UserState = {
    id: null,
    name: null,
    email: null,
    points: 0,
    location: '',
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(
            state,
            action: PayloadAction<{ id: string; name: string; email: string; points: number; location?: string }>
        ) {
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.points = action.payload.points;
            state.location = action.payload.location || '';
            state.loading = false;
        },
        clearUser(state) {
            state.id = null;
            state.name = null;
            state.email = null;
            state.points = 0;
            state.loading = false;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        }
    }
});

export const { setUser, clearUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
