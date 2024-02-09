import UserState from "./contexts/UserState";
import AllRoutes from "./Routes";

function App() {
  return (
    <div>
      <UserState>
        <AllRoutes />
      </UserState>
    </div>
  );
}

export default App;
