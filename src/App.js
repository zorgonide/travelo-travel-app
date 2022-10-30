import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Main from "./Components/Pages/Main";
import { UserProvider } from "./Components/Shared/user-context";

function App() {
  return (
    <UserProvider>
      <Main />;
    </UserProvider>
  );
}

export default App;
