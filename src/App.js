import "./App.css";
import Layout from "./components/layout";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { color } = useTheme();
  return (
    <div className="App" style={{ backgroundColor: color }}>
      <Layout />
    </div>
  );
}

export default App;
