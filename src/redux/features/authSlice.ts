import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import {LOCAL_STORAGE} from '../../constants/localstorage';
import {socket} from '../../socket';

interface AuthState {
    authToken?: string | null;
    isConnected?: boolean;
    isDarkMode?: boolean;
    socket?: any;
    user: {
        id: string;
        username: string;
        isAdmin: boolean;
        isAvailable: boolean;
        phone: string;
        bank: string;
        note: string;
        badges: string[];
        ranks: string[];
        services: string[];
    };
}

const initialState: AuthState = {
    authToken: null,
    isConnected: false,
    isDarkMode: localStorage.getItem(LOCAL_STORAGE.DARK_MODE) === 'true',
    socket: undefined,
    user: {
        id: '',
        username: '',
        isAdmin: false,
        isAvailable: false,
        phone: '',
        bank: '',
        note: '',
        badges: [],
        ranks: [],
        services: [],
    },
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            state.authToken = action.payload.authToken;
            state.user = action.payload.user;
            state.isConnected = true;

            socket.auth = {token: action.payload.authToken};
            socket.connect();
        },
        updateUser: (state, action: PayloadAction<AuthState>) => {
            state.user = {
                ...state.user,
                ...action.payload,
            };
        },
        logout: (state) => {
            localStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN);
            sessionStorage.removeItem(LOCAL_STORAGE.AUTH_TOKEN);
            return {
                ...initialState,
                isDarkMode: state.isDarkMode,
            };
        },
        toggleDarkMode: (state) => {
            state.isDarkMode = !state.isDarkMode;
            localStorage.setItem(
                LOCAL_STORAGE.DARK_MODE,
                state.isDarkMode ? 'true' : 'false',
            );
        },
        setIsAvailable: (state, action: PayloadAction<boolean>) => {
            state.user.isAvailable = action.payload;
        },
    },
});

export const {login, logout, toggleDarkMode, setIsAvailable, updateUser} =
    authSlice.actions;

export default authSlice.reducer;
