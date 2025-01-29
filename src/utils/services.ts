export interface Service {
  price: number;
  description: string;
  duration: number; // Shuold be in minutes
  image?: string;
}

export const services: Record<string, Service> = {
  haircut: {
    price: 25.0,
    description: "A professional haircut and styling.",
    duration: 30,
    image: "https://example.com/haircut.jpg",
  },
  massage: {
    price: 60.0,
    description: "A relaxing 1-hour full-body massage.",
    duration: 60,
  },
  facial: {
    price: 50.0,
    description: "A deep-cleansing facial treatment.",
    duration: 45,
  },
};
