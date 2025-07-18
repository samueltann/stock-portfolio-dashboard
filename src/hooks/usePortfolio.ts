// hooks/usePortfolio.ts
import { useEffect, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useAuth } from "./useAuth";

export function usePortfolio() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "portfolios", user.uid), (docSnap) => {
      if (docSnap.exists()) {
        setPortfolio(docSnap.data().stocks || []);
      } else {
        setPortfolio([]);
      }
    });

    return () => unsub();
  }, [user]);

  return { portfolio };
}
