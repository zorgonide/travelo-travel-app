import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from "./Components/Pages/Main";
import { useState, createContext } from "react";
const UserContext = createContext()

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <UserContext.Provider value={{loggedIn, setLoggedIn}}>
      <Main/>
    </UserContext.Provider>
  );
}

export default App;
