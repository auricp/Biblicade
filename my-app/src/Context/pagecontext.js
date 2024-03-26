import{createContext,useState} from 'react';
export const PageContext = createContext({});
export function PageProvider ({children}) {
    const [LoginRegisterPage,setLoginRegister] = useState(false);
   
    return(
        <PageContext.Provider value={{LoginRegisterPage,setLoginRegister}}>
            {children}
        </PageContext.Provider>
    );
}