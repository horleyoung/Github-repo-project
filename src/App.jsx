import { useState } from "react";
import RepoList from "./components/RepoList";
import SearchBar from "./components/SearchBar";

function App() {
  const [input, setInput] = useState("")
  const [user, setUser] = useState("gaearon")

  function handleChange(e) {
    setInput (e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    const text = input.trim()
    if (text === "") return;

    setUser(text)
  }
  

  return (
    <main className="mx-auto max-w-3xl p-6">
      <SearchBar onChange={handleChange} value={input} onSubmit={handleSubmit}/>
      <RepoList user={user} />
    </main>
  );
}

export default App;