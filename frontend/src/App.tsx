// Imports
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { type ApiResponse } from "./types";

function App() {
  // React TS Hooks
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [count, setCount] = useState(0);

  // Fetch Effect Function
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/message");
        if (!response.ok) {
          throw new Error(`HTTP error ! status : ${response.status}`);
        }
        const result: ApiResponse = await response.json();
        setApiResponse(result);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknwon error occured"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  if (loading) {
    return (
      <>
        <div>Loading</div>;
      </>
    );
  }
  if (error) {
    return <div>Error : {error}</div>;
  }

  // Returned Body
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>Message from the Fast API : {apiResponse?.message}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

// Exports
export default App;
