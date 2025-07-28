import {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  useLiveStockData,
  type LiveStockData,
} from "../hooks/useLiveStockData";
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  getFirestore,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

export interface Stock {
  id: string;
  symbol: string;
  name: string;
  shares: number;
}

interface StockContextType {
  stocks: Stock[];
  addStock: (stock: Stock) => void;
  removeStock: (id: string) => void;
  updateStock: (id: string, updatedStock: Partial<Stock>) => void;
  stockData: { [symbol: string]: LiveStockData };
}

const StockContext = createContext<StockContextType | undefined>(undefined);

export function StockProvider({ children }: { children: ReactNode }) {
  const auth = getAuth();
  const db = getFirestore();

  const [user, setUser] = useState<User | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  // Listen to Auth State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetch stocks from Firestore when user changes
  useEffect(() => {
    if (!user) {
      setStocks([]);
      return;
    }

    const portfolioRef = collection(db, "users", user.uid, "portfolio");

    const unsubscribe = onSnapshot(portfolioRef, (snapshot) => {
      const stockList: Stock[] = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          symbol: data.symbol,
          name: data.name,
          shares: data.shares,
        };
      });
      setStocks(stockList);
    });

    return () => unsubscribe();
  }, [user, db]);

  // Firestore operations
  const addStock = async (stock: Stock) => {
    if (!user) return;
    const stockRef = doc(db, "users", user.uid, "portfolio", stock.symbol);
    await setDoc(stockRef, {
      symbol: stock.symbol,
      name: stock.name,
      shares: stock.shares,
    });
  };

  const removeStock = async (id: string) => {
    if (!user) return;
    const stockRef = doc(db, "users", user.uid, "portfolio", id);
    await deleteDoc(stockRef);
  };

  const updateStock = async (id: string, updatedStock: Partial<Stock>) => {
    if (!user) return;
    const stockRef = doc(db, "users", user.uid, "portfolio", id);
    await updateDoc(stockRef, updatedStock);
  };

  const symbols = useMemo(() => stocks.map((s) => s.symbol), [stocks]);
  const stockData = useLiveStockData(symbols);

  return (
    <StockContext.Provider
      value={{ stocks, addStock, removeStock, updateStock, stockData }}
    >
      {children}
    </StockContext.Provider>
  );
}

export function useStock() {
  const context = useContext(StockContext);
  if (!context) throw new Error("useStock must be used within StockProvider");
  return context;
}
