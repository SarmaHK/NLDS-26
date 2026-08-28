/**
 * NLDS'26 Merchandise — Product Data
 *
 * This is the single source of truth for all merchandise products.
 * Add, remove, or modify products here. The UI will automatically reflect changes.
 *
 * To update products for a new collection, edit this file only.
 */

export type ProductCategory =
  | "combo"
  | "tshirt"
  | "wristband"
  | "stickers"
  | "bucket-hat";

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  shortDescription: string;
  price: number; // in LKR
  images: string[]; // paths relative to /public
  sizes: string[]; // empty array = no size selector
  available: boolean;
  itemCode: string;
  badge?: string; // e.g. "BEST VALUE", "LIMITED"
}

export const PRODUCTS: Product[] = [
  {
    id: "combo-001",
    name: "NLDS'26 COMBO PACK",
    category: "combo",
    description:
      "The complete operative kit. Everything you need to gear up for the mission. Includes the official NLDS'26 T-Shirt, wrist band, and sticker pack. Best value for the full NLDS'26 experience.",
    shortDescription: "Complete operative kit — T-Shirt, wrist band & stickers.",
    price: 5500,
    images: [
      "/images/merch/combo-1.jpg",
      "/images/merch/combo-2.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    available: true,
    itemCode: "NLDS26-001",
    badge: "BEST VALUE",
  },
  {
    id: "tshirt-001",
    name: "NLDS'26 T-SHIRT",
    category: "tshirt",
    description:
      "Official mission apparel. Premium quality cotton T-Shirt with the NLDS'26 Mission Impossible graphic. Wear the mission wherever you go. Limited edition, official issue.",
    shortDescription: "Official mission apparel. Premium cotton. Limited edition.",
    price: 3500,
    images: [
      "/images/merch/tshirt-1.jpg",
      "/images/merch/tshirt-2.jpg",
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    available: true,
    itemCode: "NLDS26-002",
  },
  {
    id: "wristband-001",
    name: "NLDS'26 WRIST BAND",
    category: "wristband",
    description:
      "Official silicone wrist band. Compact mission identifier. Wear it as a mark of your commitment to the NLDS'26 mission. One size fits all.",
    shortDescription: "Official mission identifier. One size fits all.",
    price: 350,
    images: [
      "/images/merch/wristband-1.jpg",
    ],
    sizes: [], // no size selector needed
    available: true,
    itemCode: "NLDS26-003",
  },
  {
    id: "stickers-001",
    name: "NLDS'26 STICKER PACK",
    category: "stickers",
    description:
      "Pack of 5 premium high-quality vinyl stickers. NLDS'26 Mission Impossible themed designs. Waterproof. Perfect for laptops, notebooks, and equipment.",
    shortDescription: "5 premium vinyl stickers. Waterproof. Mission themed.",
    price: 450,
    images: [
      "/images/merch/stickers-1.jpg",
    ],
    sizes: [], // no size selector needed
    available: true,
    itemCode: "NLDS26-004",
  },
  {
    id: "bucket-hat-001",
    name: "NLDS'26 BUCKET HAT",
    category: "bucket-hat",
    description:
      "Official NLDS'26 bucket hat. Structured, premium quality. NLDS'26 Mission Impossible embroidered logo. The operative's field headgear. One size fits most.",
    shortDescription: "Official operative headgear. Embroidered logo. One size fits most.",
    price: 2500,
    images: [
      "/images/merch/hat-1.jpg",
    ],
    sizes: [], // one size fits most
    available: true,
    itemCode: "NLDS26-005",
    badge: "LIMITED",
  },
];

/** Helper: get product by id */
export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
