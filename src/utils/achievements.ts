export interface AchievementDef {
  id: string;
  name: string;
  description: string;
  emoji: string;
  check: (state: { items: Record<string, number>; totalMoney: number; moneyLeft: number }) => boolean;
}

export const ACHIEVEMENT_DEFS: AchievementDef[] = [
  {
    id: 'first_purchase',
    name: 'First Purchase',
    description: 'Bought your first item!',
    emoji: '🏆',
    check: (state) => Object.values(state.items).some(qty => qty > 0)
  },
  {
    id: 'chai_investor',
    name: 'Chai Investor',
    description: 'Bought 1,000 cups of chai. Who drinks this much?',
    emoji: '☕',
    check: (state) => (state.items['cutting_chai'] || 0) >= 1000
  },
  {
    id: 'car_collector',
    name: 'Car Collector',
    description: 'Bought 10+ cars. Where are you parking all these?',
    emoji: '🚗',
    check: (state) => {
      const carIds = ['swift', 'thar', 'fortuner', 'bmw_car', 'mercedes', 'audi', 'range_rover', 'porsche', 'lamborghini', 'rolls_royce', 'ten_lambos'];
      return carIds.reduce((sum, id) => sum + (state.items[id] || 0), 0) >= 10;
    }
  },
  {
    id: 'crorepati_spender',
    name: 'Crorepati Spender',
    description: 'Spent ₹1 crore. Now we\'re talking.',
    emoji: '💸',
    check: (state) => (state.totalMoney - state.moneyLeft) >= 10000000
  },
  {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Spent ₹10 crore. Getting serious!',
    emoji: '💎',
    check: (state) => (state.totalMoney - state.moneyLeft) >= 100000000
  },
  {
    id: 'absolute_menace',
    name: 'Absolute Menace',
    description: 'Spent ₹100 crore. Financial chaos.',
    emoji: '🔥',
    check: (state) => (state.totalMoney - state.moneyLeft) >= 1000000000
  },
  {
    id: 'money_printer',
    name: 'Money Printer',
    description: 'Spent ₹500 crore. Virat is calling his bank.',
    emoji: '🤑',
    check: (state) => (state.totalMoney - state.moneyLeft) >= 5000000000
  },
  {
    id: 'speed_runner',
    name: 'Speed Runner',
    description: 'Spent 50%+ of the fortune. Halfway to broke!',
    emoji: '⚡',
    check: (state) => {
      if (state.totalMoney <= 0) return false;
      return ((state.totalMoney - state.moneyLeft) / state.totalMoney) >= 0.5;
    }
  },
  {
    id: 'bro_went_broke',
    name: 'Bro Went Broke',
    description: 'Spent 100% of the money. Legend.',
    emoji: '💀',
    check: (state) => state.moneyLeft === 0 && state.totalMoney > 0
  },
  {
    id: 'cricket_fan',
    name: 'Cricket Fan',
    description: 'Bought every cricket-related item.',
    emoji: '🏏',
    check: (state) => {
      const cricketIds = ['cricket_bat', 'cricket_kit', 'cricket_coaching', 'cricket_ground', 'cricket_academy', 'cricket_franchise', 'cricket_stadium'];
      return cricketIds.every(id => (state.items[id] || 0) > 0);
    }
  },
  {
    id: 'foodie',
    name: 'Foodie',
    description: 'Bought 5+ different food items. Hungry much?',
    emoji: '🍔',
    check: (state) => {
      const foodIds = ['cutting_chai', 'vada_pav', 'samosa', 'pani_puri', 'biryani', 'pizza', 'family_dinner', 'premium_dinner', 'monthly_groceries', 'lifetime_maggi', 'wedding_catering'];
      return foodIds.filter(id => (state.items[id] || 0) > 0).length >= 5;
    }
  },
  {
    id: 'tech_bro',
    name: 'Tech Bro',
    description: 'Bought 5+ different tech items. Apple Store loves you.',
    emoji: '💻',
    check: (state) => {
      const techIds = ['airpods', 'iphone', 'ipad', 'macbook', 'gaming_pc', 'ps5', 'drone', 'home_theatre', 'creator_studio', 'streaming_setup', 'smart_home'];
      return techIds.filter(id => (state.items[id] || 0) > 0).length >= 5;
    }
  },
  {
    id: 'real_estate_mogul',
    name: 'Real Estate Mogul',
    description: 'Bought 3+ properties. Landlord vibes.',
    emoji: '🏢',
    check: (state) => {
      const reIds = ['mumbai_2bhk', 'goa_villa', 'delhi_house', 'mumbai_apartment', 'luxury_farmhouse', 'mumbai_penthouse', 'private_resort'];
      return reIds.filter(id => (state.items[id] || 0) > 0).length >= 3;
    }
  },
  {
    id: 'samosa_lord',
    name: 'Samosa Lord',
    description: 'Bought 1 crore samosas. Respect.',
    emoji: '🔺',
    check: (state) => (state.items['crore_samosas'] || 0) > 0
  },
  {
    id: 'island_owner',
    name: 'Island Owner',
    description: 'Bought a private island. Okay, Mr. Billionaire.',
    emoji: '🏝️',
    check: (state) => (state.items['private_island'] || 0) > 0
  }
];

export function checkAchievements(state: { items: Record<string, number>; totalMoney: number; moneyLeft: number }): string[] {
  return ACHIEVEMENT_DEFS.filter(def => def.check(state)).map(def => def.id);
}
