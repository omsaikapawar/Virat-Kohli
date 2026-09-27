import { create } from 'zustand';
import networthData from '../data/networth.json';

const DEFAULT_NET_WORTH = networthData.estimatedNetWorthINR;

export interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlockedAt?: number; // timestamp
}

interface SpendingState {
  // Core state
  totalMoney: number;
  moneyLeft: number;
  items: Record<string, number>; // productId -> quantity
  achievements: Achievement[];
  
  // UI state
  searchQuery: string;
  selectedCategory: string;
  sortBy: 'cheapest' | 'expensive' | 'popular' | 'random';
  showReceipt: boolean;
  showShareModal: boolean;
  showZeroScreen: boolean;
  lastAction: 'buy' | 'sell' | null;
  easterEggClicks: number;
  
  // Actions
  initializeMoney: (amount: number) => void;
  buyItem: (productId: string, price: number, maxQty?: number) => void;
  sellItem: (productId: string, price: number) => void;
  setQuantity: (productId: string, price: number, newQty: number, maxQty?: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSortBy: (sort: 'cheapest' | 'expensive' | 'popular' | 'random') => void;
  toggleReceipt: () => void;
  toggleShareModal: () => void;
  setShowZeroScreen: (show: boolean) => void;
  unlockAchievement: (achievement: Achievement) => void;
  incrementEasterEgg: () => void;
  resetGame: () => void;
  
  // Computed helpers
  getQuantity: (productId: string) => number;
  getTotalSpent: () => number;
  getSpentPercentage: () => number;
}

export const useSpendingStore = create<SpendingState>((set, get) => {
  return {
    totalMoney: DEFAULT_NET_WORTH, 
    moneyLeft: DEFAULT_NET_WORTH,
    items: {},
    achievements: [],
    
    searchQuery: '',
    selectedCategory: 'All',
    sortBy: 'cheapest',
    showReceipt: false,
    showShareModal: false,
    showZeroScreen: false,
    lastAction: null,
    easterEggClicks: 0,
    
    initializeMoney: (amount: number) => set((_state) => {
      return { totalMoney: amount, moneyLeft: amount };
    }),
    
    buyItem: (productId: string, price: number, maxQty?: number) => set((state) => {
      if (state.moneyLeft < price) return state;
      
      const currentQty = state.items[productId] || 0;
      if (maxQty !== undefined && currentQty >= maxQty) return state;
      
      const newMoneyLeft = state.moneyLeft - price;
      const newItems = { ...state.items, [productId]: currentQty + 1 };
      const showZero = newMoneyLeft === 0;
      
      const newState = {
        moneyLeft: newMoneyLeft,
        items: newItems,
        lastAction: 'buy' as const,
        showZeroScreen: state.showZeroScreen || showZero,
      };
      
      return newState;
    }),
    
    sellItem: (productId: string, price: number) => set((state) => {
      const currentQty = state.items[productId] || 0;
      if (currentQty <= 0) return state;
      
      const newMoneyLeft = state.moneyLeft + price;
      const newItems = { ...state.items, [productId]: currentQty - 1 };
      
      const newState = {
        moneyLeft: newMoneyLeft,
        items: newItems,
        lastAction: 'sell' as const,
      };
      
      return newState;
    }),
    
    setQuantity: (productId: string, price: number, newQty: number, maxQty?: number) => set((state) => {
      const currentQty = state.items[productId] || 0;
      if (newQty < 0) return state;
      if (maxQty !== undefined && newQty > maxQty) return state;
      
      const diff = newQty - currentQty;
      const cost = diff * price;
      
      if (cost > 0 && state.moneyLeft < cost) {
        const maxAffordableDiff = Math.floor(state.moneyLeft / price);
        const actualNewQty = currentQty + maxAffordableDiff;
        const actualCost = maxAffordableDiff * price;
        
        if (maxAffordableDiff > 0) {
           const newMoneyLeft = state.moneyLeft - actualCost;
           const newItems = { ...state.items, [productId]: actualNewQty };
           return {
             moneyLeft: newMoneyLeft,
             items: newItems,
             lastAction: diff > 0 ? 'buy' : 'sell',
             showZeroScreen: state.showZeroScreen || newMoneyLeft === 0
           };
        }
        return state;
      }
      
      const newMoneyLeft = state.moneyLeft - cost;
      const newItems = { ...state.items, [productId]: newQty };
      
      return {
        moneyLeft: newMoneyLeft,
        items: newItems,
        lastAction: diff > 0 ? 'buy' : 'sell',
        showZeroScreen: state.showZeroScreen || newMoneyLeft === 0
      };
    }),
    
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setSelectedCategory: (category: string) => set({ selectedCategory: category }),
    setSortBy: (sort) => set({ sortBy: sort }),
    toggleReceipt: () => set((state) => ({ showReceipt: !state.showReceipt })),
    toggleShareModal: () => set((state) => ({ showShareModal: !state.showShareModal })),
    setShowZeroScreen: (show: boolean) => set({ showZeroScreen: show }),
    
    unlockAchievement: (achievement: Achievement) => set((state) => {
      if (state.achievements.some(a => a.id === achievement.id)) return state;
      const newAchievements = [...state.achievements, { ...achievement, unlockedAt: Date.now() }];
      return { achievements: newAchievements };
    }),
    
    incrementEasterEgg: () => set((state) => ({ easterEggClicks: state.easterEggClicks + 1 })),
    
    resetGame: () => set((state) => {
      const newState = {
        moneyLeft: state.totalMoney,
        items: {},
        achievements: [],
        showZeroScreen: false,
        showReceipt: false,
        lastAction: null as 'buy' | 'sell' | null,
      };
      return newState;
    }),
    
    getQuantity: (productId: string) => {
      return get().items[productId] || 0;
    },
    
    getTotalSpent: () => {
      const state = get();
      return state.totalMoney - state.moneyLeft;
    },
    
    getSpentPercentage: () => {
      const state = get();
      if (state.totalMoney <= 0) return 0;
      return ((state.totalMoney - state.moneyLeft) / state.totalMoney) * 100;
    }
  };
});
