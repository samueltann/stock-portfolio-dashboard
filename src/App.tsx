// import { useState } from "react";
import Navbar from "./components/Navbar";
import Index from "./Index";

function App() {
  // const [count, setCount] = useState(0);
  //     id: string;
  //   symbol: string;
  //   name: string;
  //   price: number;
  //   change: number;
  //   changePercent: number;
  //   shares: number;
  // }

  return (
    <>
      <Navbar />
      <Index />
      {/* <StockCard stock={s} onRemove={() => null} /> */}
    </>
  );
}

export default App;
