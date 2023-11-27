import { Route, Routes } from "react-router-dom";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<UsersList />} />
        <Route path="/:id" element={<UserDetails />} />
      </Routes>
    </div>
  );
}

export default App;
