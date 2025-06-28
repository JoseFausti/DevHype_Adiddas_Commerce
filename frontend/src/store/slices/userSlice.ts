import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

const savedUsers = localStorage.getItem("users");

const initialState: {users: IUser[], userActive: IUser | null} = {
    users: savedUsers ? JSON.parse(savedUsers) : [],
    userActive: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<IUser[]>) => {
            state.users = action.payload
            localStorage.setItem("users", JSON.stringify(action.payload));
        },
        setUserActive: (state, action: PayloadAction<IUser | null>) => {state.userActive = action.payload},
        clearUsers: (state) => {
            state.users = []
            localStorage.removeItem("users");
        },
        addUser: (state, action: PayloadAction<IUser>) => {
            state.users.push(action.payload);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        editUser: (state, action: PayloadAction<IUser>) => {
            state.users = state.users.map((user: IUser) => user.id === action.payload.id ? action.payload : user);
            localStorage.setItem("users", JSON.stringify(state.users));
        },
        removeUser: (state, action: PayloadAction<IUser>) => {
            state.users = state.users.filter((user: IUser) => user.id !== action.payload.id);
            localStorage.setItem("users", JSON.stringify(state.users));
        }
    },
});

export const { setUsers, setUserActive, clearUsers, addUser, editUser, removeUser } = userSlice.actions;
export default userSlice.reducer;