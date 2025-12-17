import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = "http://localhost:8080/api/tasks";

  useEffect(() => {
    axios.get(API).then(res => setTasks(res.data));
  }, []);

  const addTask = () => {
    if (!title.trim()) return;

    axios.post(API, { title, completed: false })
      .then(res => setTasks([...tasks, res.data]));

    setTitle("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Task Manager</h1>

        <div style={styles.inputGroup}>
          <input
            style={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button style={styles.button} onClick={addTask}>
            Add
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map(t => (
            <li key={t.id} style={styles.listItem}>
              {t.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #340d4bff, #0f1325ff)",
    fontFamily: "Arial, sans-serif"
  },
  card: {
    background: "#1b250aff",
    padding: "2rem",
    borderRadius: "0",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 10px 25px rgba(19, 15, 15, 0.15)"
  },
  title: {
    textAlign: "center",
    marginBottom: "1.5rem"
  },
  inputGroup: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem"
  },
  input: {
    flex: 1,
    padding: "0.6rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },
  button: {
    padding: "0.6rem 1rem",
    borderRadius: "6px",
    border: "none",
    background: "#667eea",
    color: "#fff",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginTop: "1rem"
  },
  listItem: {
    padding: "0.6rem",
    borderBottom: "1px solid #eee"
  }
};
