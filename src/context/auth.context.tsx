import { createContext, useEffect, useState } from "react";
import authSvc from "../services/Auth.service";
import { getLocalStroage } from "../utilities/helpers";

 export const AuthContext = createContext({})

const AuthProvider = ({Children}: {Children:any}) => {
    const [loggedInUser, setLoggedInUser] = useState<any>()
    const [loading, setLoading] = useState<boolean>(true);
    
    const getLoggedInUser = async () => {
        try {
            const response = await authSvc.getRequest('/auth/me');
            setLoggedInUser(response.data)
        } catch (exception) {
            
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
       let token = getLocalStroage("token") || null;
       if(token) {
        getLoggedInUser()
       } else {
        setLoading(false)
       }
    }, [])

    return (<>
    {loading ? (
        <>Loading</>
    ):(
        <AuthContext.Provider value={{
            loggedInUser: loggedInUser,
            setLoggedInUser:setLoggedInUser
        }}>  
        {Children}     
        </AuthContext.Provider>
    )}
    </>)
}

export default AuthProvider