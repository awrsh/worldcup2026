import type { Venue } from "@/lib/api/types";

/** FIFA World Cup 2026 official host stadiums (16 venues across USA, Canada, Mexico). */
export const MOCK_VENUES: Venue[] = [
  { id: 1, name: "New York New Jersey Stadium", city: "East Rutherford", country: "USA", capacity: 82500 },
  { id: 2, name: "Los Angeles Stadium", city: "Inglewood", country: "USA", capacity: 70240 },
  { id: 3, name: "Dallas Stadium", city: "Arlington", country: "USA", capacity: 80000 },
  { id: 4, name: "Atlanta Stadium", city: "Atlanta", country: "USA", capacity: 71000 },
  { id: 5, name: "Miami Stadium", city: "Miami Gardens", country: "USA", capacity: 65326 },
  { id: 6, name: "Philadelphia Stadium", city: "Philadelphia", country: "USA", capacity: 69596 },
  { id: 7, name: "San Francisco Bay Area Stadium", city: "Santa Clara", country: "USA", capacity: 68500 },
  { id: 8, name: "Seattle Stadium", city: "Seattle", country: "USA", capacity: 68740 },
  { id: 9, name: "Mexico City Stadium", city: "Mexico City", country: "Mexico", capacity: 87523 },
  { id: 10, name: "Estadio Monterrey", city: "Monterrey", country: "Mexico", capacity: 53500 },
  { id: 11, name: "Estadio Guadalajara", city: "Guadalajara", country: "Mexico", capacity: 49850 },
  { id: 12, name: "BC Place Vancouver", city: "Vancouver", country: "Canada", capacity: 54500 },
  { id: 13, name: "Toronto Stadium", city: "Toronto", country: "Canada", capacity: 45000 },
  { id: 14, name: "Houston Stadium", city: "Houston", country: "USA", capacity: 72220 },
  { id: 15, name: "Kansas City Stadium", city: "Kansas City", country: "USA", capacity: 76416 },
  { id: 16, name: "Boston Stadium", city: "Foxborough", country: "USA", capacity: 65878 },
];

export function getVenueById(id: number): Venue | undefined {
  return MOCK_VENUES.find((v) => v.id === id);
}

export const VENUE_BY_KEY: Record<string, number> = {
  MEXICO_CITY: 9,
  GUADALAJARA: 11,
  MONTERREY: 10,
  TORONTO: 13,
  VANCOUVER: 12,
  LA: 2,
  SOFI: 2,
  BOSTON: 16,
  METLIFE: 1,
  NY_NJ: 1,
  LEVIS: 7,
  SF: 7,
  PHILADELPHIA: 6,
  HOUSTON: 14,
  DALLAS: 3,
  ATLANTA: 4,
  MIAMI: 5,
  SEATTLE: 8,
  KANSAS_CITY: 15,
};
