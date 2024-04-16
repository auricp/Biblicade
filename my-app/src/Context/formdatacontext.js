import React,{createContext,useReducer,useContext} from 'react';
const FormDataContext= createContext();
const initialState={
    formData:{
        gameID: '',
        title: '',
        description: '',
        releaseYear: '',
        releaseMonth: '',
        releaseDay: '',
        ratingScore: '',
        ageRestriction: '',
        developerID: '',
        publisherID: '',
        genre: ''
    },
    duplicateTitleError:null,
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