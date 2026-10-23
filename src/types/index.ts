export type DrinkCategory = 'all' | 'signature' | 'espresso' | 'lattes' | 'cold-brew' | 'matcha';

export type Temperature = 'hot' | 'iced';

export type DrinkSize = 'Small' | 'Regular' | 'Grande';

export type MoodId = 'focus' | 'slow' | 'creative' | 'comfort';

export interface Product {
  id: string;
  name: string;
  price: number; // in INR
  category: Exclude<DrinkCategory, 'all'>;
  description: string;
  longDescription: string;
  image: string;
  availableHot: boolean;
  availableIced: boolean;
  defaultTemp: Temperature;
  flavorNotes: string[];
  ingredients: string[];
  caffeineLevel: 'None' | 'Gentle' | 'Balanced' | 'High';
  roastProfile?: string;
  isSeasonal?: boolean;
  isSignature?: boolean;
  moodPairings: MoodId[];
  calories: string;
  brewMethod: string;
}

export interface CartItem {
  id: string; // composite key: `${productId}-${size}-${temperature}`
  productId: string;
  name: string;
  price: number;
  basePrice: number;
  size: DrinkSize;
  temperature: Temperature;
  quantity: number;
  image: string;
  flavorNotes: string[];
}

export interface MoodOption {
  id: MoodId;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  recommendedDrinkIdHot: string;
  recommendedDrinkIdIced: string;
  tastingVibe: string;
}

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  email: string;
  orderType: 'dine-in' | 'takeaway';
  tableNumber?: string;
  notes?: string;
}
