import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [food, setFood] = useState("Biriyani");
  const [isLogged, setIsLogged] = useState(false);
  const [items, setItems] = useState([]);

  // GET Request - load data
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setItems(res.data.slice(0, 5))) // take only 5 items
      .catch((err) => console.log(err));
  }, []);

  // POST Request - add item
  const addItem = () => {
    axios
      .post("https://jsonplaceholder.typicode.com/posts", {
        title: food,
        body: "Added by Aswath (Buddy)",
      })
      .then((res) => {
        setItems([...items, res.data]); // add to UI
      })
      .catch((err) => console.log(err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>React + Axios + useState (Simple)</h1>

      {/* Food State */}
      <h2>Food: {food}</h2>
      <button onClick={() => setFood("Pizza")}>Change Food</button>

      <hr />

      {/* Login State */}
      <h2>Status: {isLogged ? "Logged In" : "Logged Out"}</h2>
      <button onClick={() => setIsLogged(true)}>Login</button>
      <button onClick={() => setIsLogged(false)}>Logout</button>

      <hr />

      {/* Axios GET Data */}
      <h2>Items Loaded from API</h2>
      {items.map((item) => (
        <p key={item.id}>{item.title}</p>
      ))}

      <button onClick={addItem}>Add New Item (POST)</button>
    </div>
  );
}

export default App;
