import { useState } from 'react';
import { UserProvider } from "./components/Users/UserContext";

function App() {
  return (
    <>
      <UserProvider>
      </UserProvider>
    </>
  )
}

export default App
