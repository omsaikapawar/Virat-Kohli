export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  emoji: string;
  description: string;
  maxQuantity?: number;
  fictional?: boolean;
}

export const CATEGORIES = [
  'All',
  'Food & Daily Life',
  'Tech',
  'Bikes',
  'Cars',
  'Real Estate',
  'Travel',
  'Cricket',
  'Entertainment',
  'Luxury',
  'Absurd & Meme'
];

export const products: Product[] = [
  {
    "id": "cutting_chai",
    "name": "Cutting Chai",
    "category": "Food & Daily Life",
    "price": 20,
    "emoji": "☕",
    "description": "A tiny glass of perfectly brewed Indian street chai"
  },
  {
    "id": "samosa",
    "name": "Samosa",
    "category": "Food & Daily Life",
    "price": 20,
    "emoji": "🔺",
    "description": "Crispy, spicy, and absolutely perfect"
  },
  {
    "id": "vada_pav",
    "name": "Vada Pav",
    "category": "Food & Daily Life",
    "price": 30,
    "emoji": "🥔",
    "description": "Mumbai's iconic street snack"
  },
  {
    "id": "pizza",
    "name": "Pizza (Large)",
    "category": "Food & Daily Life",
    "price": 800,
    "emoji": "🍕",
    "description": "One large pizza with all toppings"
  },
  {
    "id": "family_dinner",
    "name": "Family Dinner",
    "category": "Food & Daily Life",
    "price": 5000,
    "emoji": "🍽️",
    "description": "A nice dinner out for the whole family"
  },
  {
    "id": "monthly_groceries",
    "name": "Monthly Grocery Shopping",
    "category": "Food & Daily Life",
    "price": 20000,
    "emoji": "🛒",
    "description": "A full month of groceries for a family"
  },
  {
    "id": "premium_dinner",
    "name": "Premium Restaurant Dinner",
    "category": "Food & Daily Life",
    "price": 25000,
    "emoji": "🥂",
    "description": "Fine dining at a 5-star restaurant"
  },
  {
    "id": "airpods",
    "name": "AirPods Pro",
    "category": "Tech",
    "price": 25000,
    "emoji": "🎧",
    "description": "Noise cancelling so good you won't hear the haters"
  },
  {
    "id": "cricket_bat",
    "name": "Premium Cricket Bat",
    "category": "Cricket",
    "price": 25000,
    "emoji": "🏏",
    "description": "English Willow, perfectly balanced"
  },
  {
    "id": "goa_trip",
    "name": "Weekend Goa Trip",
    "category": "Travel",
    "price": 50000,
    "emoji": "✈️",
    "description": "The trip that finally made it out of the group chat"
  },
  {
    "id": "concert_tickets",
    "name": "Front Row Concert Tickets",
    "category": "Entertainment",
    "price": 50000,
    "emoji": "🎵",
    "description": "Best seats in the house for your favorite artist"
  },
  {
    "id": "ps5",
    "name": "PlayStation 5",
    "category": "Tech",
    "price": 55000,
    "emoji": "🎮",
    "description": "Looks like a router, plays games beautifully"
  },
  {
    "id": "lifetime_maggi",
    "name": "Lifetime Supply of Maggi",
    "category": "Food & Daily Life",
    "price": 100000,
    "emoji": "🍜",
    "description": "You'll never run out of 2-minute noodles"
  },
  {
    "id": "cricket_kit",
    "name": "Professional Cricket Kit",
    "category": "Cricket",
    "price": 100000,
    "emoji": "🏏",
    "description": "Everything you need to step onto the pitch"
  },
  {
    "id": "netflix_lifetime",
    "name": "Lifetime Netflix Subscription",
    "category": "Entertainment",
    "price": 100000,
    "emoji": "📺",
    "description": "Never worry about sharing passwords again"
  },
  {
    "id": "ipad",
    "name": "iPad Pro",
    "category": "Tech",
    "price": 120000,
    "emoji": "📲",
    "description": "Basically a laptop, but you can't run real desktop apps on it"
  },
  {
    "id": "iphone",
    "name": "iPhone",
    "category": "Tech",
    "price": 150000,
    "emoji": "📱",
    "description": "The latest fruit company phone"
  },
  {
    "id": "drone",
    "name": "Premium Drone",
    "category": "Tech",
    "price": 200000,
    "emoji": "🚁",
    "description": "For capturing those cinematic vlog shots"
  },
  {
    "id": "kashmir_trip",
    "name": "Kashmir Luxury Trip",
    "category": "Travel",
    "price": 200000,
    "emoji": "🏔️",
    "description": "Experience heaven on earth"
  },
  {
    "id": "macbook",
    "name": "MacBook Pro",
    "category": "Tech",
    "price": 250000,
    "emoji": "💻",
    "description": "The developer's dream machine"
  },
  {
    "id": "royal_enfield",
    "name": "Royal Enfield Classic",
    "category": "Bikes",
    "price": 250000,
    "emoji": "🏍️",
    "description": "Dug-dug-dug-dug your way through traffic"
  },
  {
    "id": "gaming_pc",
    "name": "Gaming PC",
    "category": "Tech",
    "price": 500000,
    "emoji": "🖥️",
    "description": "RGB everything, capable of running Crysis"
  },
  {
    "id": "cricket_coaching",
    "name": "Year of Pro Coaching",
    "category": "Cricket",
    "price": 500000,
    "emoji": "🏏",
    "description": "Master the perfect cover drive"
  },
  {
    "id": "home_theatre",
    "name": "Premium Home Theatre",
    "category": "Tech",
    "price": 1000000,
    "emoji": "🎬",
    "description": "Make your neighbors complain about the bass"
  },
  {
    "id": "streaming_setup",
    "name": "Complete Streaming Setup",
    "category": "Tech",
    "price": 1000000,
    "emoji": "📡",
    "description": "Go live in 4K with multiple camera angles"
  },
  {
    "id": "business_world_tour",
    "name": "Business Class World Tour",
    "category": "Travel",
    "price": 1000000,
    "emoji": "✈️",
    "description": "See the world with extra legroom"
  },
  {
    "id": "smart_home",
    "name": "Full Smart Home Setup",
    "category": "Tech",
    "price": 1500000,
    "emoji": "🏠",
    "description": "Control your curtains with your voice"
  },
  {
    "id": "designer_watch",
    "name": "Luxury Designer Watch",
    "category": "Luxury",
    "price": 2000000,
    "emoji": "⌚",
    "description": "Tells the same time as a regular watch, but costs a lot more"
  },
  {
    "id": "private_chef",
    "name": "Personal Chef (1 Year)",
    "category": "Luxury",
    "price": 2400000,
    "emoji": "👨‍🍳",
    "description": "Michelin-star quality food in your own kitchen"
  },
  {
    "id": "wedding_catering",
    "name": "Grand Wedding Catering",
    "category": "Food & Daily Life",
    "price": 2500000,
    "emoji": "💒",
    "description": "Feed 1,000 guests like royalty"
  },
  {
    "id": "europe_trip",
    "name": "Luxury Europe Trip",
    "category": "Travel",
    "price": 2500000,
    "emoji": "🌍",
    "description": "Backpacking, but with 5-star hotels instead of hostels"
  },
  {
    "id": "diamond_necklace",
    "name": "Diamond Necklace",
    "category": "Luxury",
    "price": 5000000,
    "emoji": "💎",
    "description": "Shiny rocks that cost a fortune"
  },
  {
    "id": "luxury_wardrobe",
    "name": "Complete Luxury Wardrobe",
    "category": "Luxury",
    "price": 5000000,
    "emoji": "👔",
    "description": "Designer clothes for every occasion"
  },
  {
    "id": "lifetime_chai",
    "name": "Entire Lifetime Supply of Chai",
    "category": "Absurd & Meme",
    "price": 5000000,
    "emoji": "☕",
    "description": "Approximately 3 cups a day until you're 100"
  },
  {
    "id": "mumbai_2bhk",
    "name": "Mumbai 2BHK Flat",
    "category": "Real Estate",
    "price": 20000000,
    "emoji": "🏢",
    "description": "A cozy apartment where the living room is also the dining room"
  },
  {
    "id": "lamborghini",
    "name": "Lamborghini Huracán",
    "category": "Cars",
    "price": 50000000,
    "emoji": "🏎️",
    "description": "Warning: struggles with Indian speed breakers"
  },
  {
    "id": "golden_cricket_bat",
    "name": "Solid Gold Cricket Bat",
    "category": "Absurd & Meme",
    "price": 50000000,
    "emoji": "🏏",
    "description": "Completely unusable. Absolutely beautiful."
  },
  {
    "id": "gold_collection",
    "name": "Gold Collection (10kg)",
    "category": "Luxury",
    "price": 70000000,
    "emoji": "🥇",
    "description": "Safe and shiny investment"
  },
  {
    "id": "goa_villa",
    "name": "Goa Beach Villa",
    "category": "Real Estate",
    "price": 100000000,
    "emoji": "🏖️",
    "description": "Perfect for those weekend getaways"
  },
  {
    "id": "cricket_academy",
    "name": "Build a Cricket Academy",
    "category": "Cricket",
    "price": 100000000,
    "emoji": "🏫",
    "description": "Train the next generation of superstars"
  },
  {
    "id": "movie_theatre",
    "name": "Build a Movie Theatre",
    "category": "Entertainment",
    "price": 100000000,
    "emoji": "🎬",
    "description": "IMAX screen, reclining seats, just for you"
  },
  {
    "id": "delhi_house",
    "name": "Luxury Delhi House",
    "category": "Real Estate",
    "price": 150000000,
    "emoji": "🏡",
    "description": "A sprawling property in South Delhi"
  },
  {
    "id": "mumbai_apartment",
    "name": "Luxury Mumbai Apartment",
    "category": "Real Estate",
    "price": 200000000,
    "emoji": "🏢",
    "description": "Where the elite of Bollywood live"
  },
  {
    "id": "bollywood_movie",
    "name": "Produce a Bollywood Movie",
    "category": "Entertainment",
    "price": 200000000,
    "emoji": "🎥",
    "description": "Starring you in the lead role, obviously"
  },
  {
    "id": "mumbai_penthouse",
    "name": "Mumbai Sea-View Penthouse",
    "category": "Real Estate",
    "price": 500000000,
    "emoji": "🌆",
    "description": "Wake up to the ocean every day"
  },
  {
    "id": "cricket_franchise",
    "name": "Own a Cricket Franchise",
    "category": "Cricket",
    "price": 500000000,
    "emoji": "🏏",
    "description": "Fictional/illustrative estimate — actual franchise costs vary wildly",
    "fictional": true
  },
  {
    "id": "tv_channel",
    "name": "Create Your Own TV Channel",
    "category": "Entertainment",
    "price": 500000000,
    "emoji": "📺",
    "description": "Broadcast whatever you want, 24/7",
    "fictional": true
  },
  {
    "id": "private_resort",
    "name": "Private Beach Resort",
    "category": "Real Estate",
    "price": 1000000000,
    "emoji": "🏝️",
    "description": "Your own vacation destination",
    "maxQuantity": 3
  },
  {
    "id": "private_jet",
    "name": "Private Jet",
    "category": "Luxury",
    "price": 3000000000,
    "emoji": "✈️",
    "description": "The ultimate status symbol",
    "maxQuantity": 3
  },
  {
    "id": "private_island",
    "name": "A Private Island",
    "category": "Absurd & Meme",
    "price": 3000000000,
    "emoji": "🏝️",
    "description": "Okay, Mr. Billionaire."
  },
  {
    "id": "cricket_stadium",
    "name": "Giant Cricket Stadium",
    "category": "Cricket",
    "price": 5000000000,
    "emoji": "🏟️",
    "description": "A 100,000 capacity colosseum of cricket",
    "fictional": true,
    "maxQuantity": 2
  }
];
