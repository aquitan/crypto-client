import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import App from './components/App/App'
import Store from "./store/store";


export const store = new Store()
export const AuthContext = createContext({store})

ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={{store}}>
        <App />
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);