import { createContext, useReducer } from 'react';

export const AppContext = createContext();

const initialState = {
  name: '',
  surname: '',
  team_id: 0,
  position_id: 0,
  phone_number: '',
  email: '',
  token: process.env.REACT_APP_TOKEN,
  laptop_name: '',
  laptop_image: null,
  laptop_brand_id: 0,
  laptop_cpu: '',
  laptop_cpu_cores: 0,
  laptop_cpu_threads: 0,
  laptop_ram: 0,
  laptop_hard_drive_type: '',
  laptop_state: '',
  laptop_price: 0,
};

const reducer = (state, action) => {
  if (action.type === 'EMPLOYEE_INPUT') {
    return { ...state, ...action.payload };
  }
  if (action.type === 'LAPTOP_INPUT') {
    return { ...state, ...action.payload };
  }
};

const AppContextProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
