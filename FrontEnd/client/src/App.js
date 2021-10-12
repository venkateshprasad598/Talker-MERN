import "./App.css";
import User from "./components/users/User";
import Chat from "./components/Chat/Chat";

// The Home page is divided into two components, user on left and chat on right.
function App() {
  return (
    <div className="app">
      <div className="app__body">
        <User />
        <Chat />
      </div>
    </div>
  );
}

export default App;
