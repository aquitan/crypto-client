import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import Store from "./store/store";
import AppPicker from "./AppPicker/AppPicker";

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