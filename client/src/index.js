import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import App from './components/App/App'
import Store from "./store/store";


const store = new Store()

export const Context = createContext({
    store
})

ReactDOM.render(
  <React.StrictMode>
    <Context.Provider value={{store}}>
        <App />
    </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);