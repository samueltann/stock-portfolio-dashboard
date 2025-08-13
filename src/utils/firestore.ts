// utils/firestore.ts
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export async function getPortfolio(userId: string) {
  const docRef = doc(db, "portfolios", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : { stocks: [] };
}

export async function savePortfolio(userId: string, portfolio: any) {
  const docRef = doc(db, "portfolios", userId);
  await setDoc(docRef, { stocks: portfolio }, { merge: true });
}

export async function updateStock(userId: string, stock: { symbol: string; quantity: number }) {
  const docRef = doc(db, "portfolios", userId);
  const current = await getPortfolio(userId);

  const existing = current.stocks.find((s: any) => s.symbol === stock.symbol);
  if (existing) {
    existing.quantity = stock.quantity;
  } else {
    current.stocks.push(stock);
  }

  await setDoc(docRef, { stocks: current.stocks });
}
