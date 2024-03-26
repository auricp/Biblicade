import React,{createContext,useReducer,useContext} from 'react';
const FormDataContext= createContext();
const initialState={
    formData:{
        gameTitle: '',
        description: '',
        genre: '',
        id:'',
    },
    savedForms:[],
    duplicateTitleError:null,
    pulledFormIndex: null,
};
const formReducer = (state,action)=>{
    switch(action.type){
        case 'UPDATE_DATA':
            return {...state,formData:{...state.formData,...action.payload},
            duplicateTitleError: null
        };
        
        case 'LOGOUT':
            return initialState;
            
        case 'SUBMIT':
            const {savedForms,pulledFormIndex,...rest} =state;
            const submittedForms = {
                gameTitle: '',
                description: '',
                genre: '',
                id:'',
            }
            return{
                ...rest,
                formData: submittedForms,
                savedForms:savedForms.filter((form,index)=>index!==pulledFormIndex),
                duplicateTitleError: null,
                pulledFormIndex:null,
            }
        case 'SAVE_FORM':
            if(state.formData.title===''){
                return{
                    ...state,
                    duplicateTitleError: 'Must have a title for a saved form'
                }
            }
            const updatedForms = state.savedForms.slice();
            if(state.pulledFormIndex != null){
                updatedForms[state.pulledFormIndex] = state.formData;
                return{
                    ...state,
                    savedForms:updatedForms,
                    duplicateTitleError:null,
                    pulledFormIndex: null,
                };
            }
            else{
                return{
                    ...state,
                    savedForms:[...state.savedForms,state.formData],
                    duplicateTitleError:null,
                }
            }

        case 'PULL_SAVED_FORM':
            const index = action.payload;
            const selectedForm = state.savedForms[index];
            if(selectedForm){
                return{
                    ...state,
                    formData:{...state.formData,...selectedForm},
                    duplicateTitleError:null,
                    pulledFormIndex: index,
                }
            }
            else{
                return state;
            }
        case 'REMOVE_SAVED_FORM':
            const indexToRemove = action.payload;
            const updatedSavedForms = state.savedForms.filter((form,index)=> index !== indexToRemove);
            return{
                ...state,
                savedForms:updatedSavedForms,
            };
        default:
            return state;
    }
};
const  FormDataProvider =({children}) =>{
    const[formData,dispatch]= useReducer(formReducer,initialState);

    return(
        <FormDataContext.Provider value={{formData,dispatch}}>
        {children}
        </FormDataContext.Provider>
    );
};
const useFormData=()=>{
    const context= useContext(FormDataContext);
    return context;
};
export{FormDataProvider,useFormData};