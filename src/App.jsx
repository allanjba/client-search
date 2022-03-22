import { useState, useEffect } from 'react'
import './App.css'

function useClientSearch(){
  const [clients, setClients] = useState([]);
  
  useEffect(()=>{
    const lastQuery = localStorage.getItem('lastQuery');
    search(lastQuery);
  },[]);

  const search = async (q) => {
    const response = await fetch(
      'http://localhost:8080?' + new URLSearchParams({q})
    );
    const data= await response.json();
    setClients(data);
    localStorage.setItem('lastQuery', q);
  };
  return {search, clients}
}
function App() {
  const {search, clients } = useClientSearch();
  return (
    <main>
      <h1>Cliet Search</h1>
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => search(e.target.value)}
      />

      <ul>
        {clients.map((client) => (
          <Client key={client.id} {...client} />
        ))}
        {clients.length === 0 && "No clients Found"}
      </ul>
    </main>
  )
}

function Client({gender, name, age}){
  return(
    <li>
      <strong>{name}</strong> {age} {gender}
    </li>
  )
}



export default App
