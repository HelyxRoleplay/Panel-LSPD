import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {LOCAL_STORAGE} from '../../constants/localstorage';
import {socket} from '../../socket';

interface DispatchState {
    members: any[];
    badges: any[];
    ranks: any[];
    services: any[];
}

const initialState: DispatchState = {
    members: [],
    badges: [],
    ranks: [],
    services: [],
};

export const dispatchSlice = createSlice({
    name: 'dispatchSlice',
    initialState,
    reducers: {
        setDispatch: (state, action: PayloadAction<DispatchState>) => {
            state.members = action.payload.members;
            state.badges = action.payload.badges;
            state.ranks = action.payload.ranks;
            state.services = action.payload.services;
        },

        setMembers: (state, action: PayloadAction<any[]>) => {
            state.members = action.payload;
        },
        addMember: (state, action: PayloadAction<any>) => {
            state.members?.push(action.payload);
        },
        updateMember: (state, action: PayloadAction<any>) => {
            const index = state.members.findIndex(
                (member) => member.id === action.payload.userId,
            );
            if (index !== -1) {
                state.members[index] = {
                    ...state.members[index],
                    ...action.payload.newData,
                };
            }
        },

        setBadges: (state, action: PayloadAction<any[]>) => {
            state.badges = action.payload;
        },
        addBadge: (state, action: PayloadAction<any>) => {
            state.badges?.push(action.payload);
        },

        setRanks: (state, action: PayloadAction<any[]>) => {
            state.ranks = action.payload;
        },
        addRank: (state, action: PayloadAction<any>) => {
            state.ranks?.push(action.payload);
        },

        setServices: (state, action: PayloadAction<any[]>) => {
            state.services = action.payload;
        },
        addService: (state, action: PayloadAction<any>) => {
            state.services?.push(action.payload);
        },
    },
});

export const {
    setDispatch,
    setMembers,
    addMember,
    updateMember,
    setBadges,
    addBadge,
    setRanks,
    addRank,
    setServices,
    addService,
} = dispatchSlice.actions;

export default dispatchSlice.reducer;
