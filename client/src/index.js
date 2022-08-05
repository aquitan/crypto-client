import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import AppPicker from "./AppPicker/AppPicker";
import Store from "./AppOne/store/store";

export const store = new Store()
export const AuthContext = createContext({store})

ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={{store}}>
        <AppPicker />
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);