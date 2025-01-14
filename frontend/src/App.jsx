import UserProvider from "./components/Users/UserContext";
import Router from "./routes/router";

function App() {
  return (
    <>
      <UserProvider>
        <Router />
      </UserProvider>
    </>
  )
}

export default App
