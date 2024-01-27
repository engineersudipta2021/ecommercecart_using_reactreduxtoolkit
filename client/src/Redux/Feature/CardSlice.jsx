import { createSlice } from "@reduxjs/toolkit";

const initialState =[];

const CardSlice = createSlice({
 name:" allCart",
 initialState,
 reducers: {
    addToCart:(state,action)=>{
        // console.log("")
         const IteamIndex = state.findIndex((iteam) => String(iteam.id) === String(action.payload.id));
         console.log("state",state.length);   
         console.log("action.payload",action.payload);   
         console.log("item",IteamIndex);   

        if (IteamIndex >= 0) {
            state[IteamIndex].qnty += 1
        } else {
            const temp = { ...action.payload, qnty: 1 }
            // console.log("temp",temp);
            // console.log("State",...state);
            //  state = [...state, temp]

           
            // console.log("state1", state)
            state.push(temp)

        }
        //  state.push(action.payload)
    },
            // remove perticular iteams
            removeToCart:(state,action)=>{
                console.log("State",state)
                const data = state.filter((ele)=>ele.id !== action.payload);
                return state = data
            },
    
            // remove single iteams
            removeSingleIteams:(state,action)=>{
                const IteamIndex_dec = state.findIndex((iteam) => iteam.id === action.payload.id);
    
                if(state[IteamIndex_dec].qnty >=1){
                    state[IteamIndex_dec].qnty -= 1
                }
    
            },
    
            // clear cart
            emptycartIteam:(state,action)=>{
                state = []
            }
 }
})

export const { addToCart,removeToCart,removeSingleIteams ,emptycartIteam} = CardSlice.actions;

export default CardSlice.reducer;