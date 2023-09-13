import "./App.css";
import Addproducts from "./pages/Add products/Addproducts";
import Cartpage from "./pages/Cartpage/Cartpage";
import Displayproducts from "./pages/Displayproducts/Displayproducts";
import { RouterManagement } from "./routes/Routes";

function App() {
  return (
    <div className="App">
      <RouterManagement />
    </div>
  );
}

export default App;
