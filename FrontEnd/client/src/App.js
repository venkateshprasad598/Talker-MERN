import "./App.css";
import User from "./components/users/User";
import Chat from "./components/Chat/Chat";
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
