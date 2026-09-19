/**
 * js/data.js - Strict user-facing data arrays for Two Lanes to New Orleans
 */

export const SCREENS = [
  { id: 'cover', number: 0, mile: 0, title: 'New Orleans SemiFormal 2026', subtitle: "Greenlee, Jake invites you to join him September 25-27 on a road trip to New Orleans.", atmosphere: 'dusk' },
  { id: 'plan', number: 1, mile: 50, title: 'The plan', subtitle: 'When & where', atmosphere: 'dusk' },
  { id: 'suitcase', number: 2, mile: 120, title: 'What to pack', subtitle: 'Saturday night & pack list', atmosphere: 'dusk' },
  { id: 'cooler', number: 3, mile: 190, title: 'The cooler', subtitle: 'Back seat drinks', atmosphere: 'night' },
  { id: 'vibe', number: 4, mile: 260, title: 'The vibe', subtitle: 'Radio dial', atmosphere: 'night' },
  { id: 'playlist', number: 5, mile: 330, title: 'The aux', subtitle: 'Road trip playlist', atmosphere: 'night' },
  { id: 'postcards', number: 6, mile: 400, title: 'Things to do', subtitle: 'Activities', atmosphere: 'night' },
  { id: 'menu', number: 7, mile: 440, title: 'Where we eat', subtitle: 'Food options', atmosphere: 'neon' },
  { id: 'saturdayNight', number: 8, mile: 465, title: 'After dinner', subtitle: 'Saturday night plans', atmosphere: 'neon' },
  { id: 'notes', number: 9, mile: 470, title: 'Anything else', subtitle: 'Notes & send', atmosphere: 'neon' },
  { id: 'confirmation', number: 10, mile: 470, title: 'See you Friday.', subtitle: '3:45 @ The Connector', atmosphere: 'neon' }
];

export const MAP_PINS_DATA = [
  { id: 'atlanta', name: 'Atlanta, GA', sub: 'Starting point', desc: 'Leaving Friday afternoon after class.' },
  { id: 'midway', name: 'Montgomery, AL', sub: 'Pit stop', desc: 'Clocks turn back 1 hour here into Central Time.' },
  { id: 'nola', name: 'New Orleans, LA', sub: 'Destination', desc: 'Hampton Inn, French Quarter Market Area.' }
];

export const PACKING_ITEMS = [
  "Walking shoes",
  "Going-out shoes",
  "Something for dinner",
  "Sunglasses",
  "Rain jacket",
  "Swimsuit",
  "Charger",
  "Battery pack",
  "Snacks",
  "Car pillow",
  "Blanket",
  "Advil",
  "Camera"
];

export const COOLER_ITEMS = [
  "White wine",
  "Red wine",
  "Rosé",
  "Prosecco",
  "Tito's",
  "Tequila",
  "Jack and Coke",
  "High Noon",
  "White Claw",
  "Truly",
  "Modelo",
  "Miller Lite",
  "Cider",
  "Mixers",
  "Red Bull",
  "Gatorade",
  "Water"
];

export const VIBE_CHIPS = [
  "Tipsy sightseeing",
  "Trying different foods",
  "Walking and talking",
  "Exploring neighborhoods",
  "Live music & drinks",
  "Relaxed & unhurried"
];

export const RADIO_STATIONS = [
  { freq: "88.1", callSign: "WSLO", name: "Nothing planned", desc: "", atmosphere: "dusk" },
  { freq: "92.3", callSign: "WPRT", name: "Mostly wandering", desc: "", atmosphere: "dusk" },
  { freq: "96.7", callSign: "WNOL", name: "Balanced", desc: "", atmosphere: "night" },
  { freq: "101.5", callSign: "WLIV", name: "Out all day", desc: "", atmosphere: "neon" },
  { freq: "106.9", callSign: "WMAX", name: "Full send", desc: "", atmosphere: "neon" }
];

export const GENRE_CHIPS = [
  "2000s",
  "Country",
  "Rap",
  "Indie",
  "Sad",
  "Sing-along",
  "R&B",
  "Your call"
];

export const POSTCARDS_DATA = [
  { id: 'beignets', title: 'Café du Monde', meta: '12 min walk', icon: 'balcony' },
  { id: 'jackson-square', title: 'Jackson Square', meta: '12 min walk', icon: 'balcony' },
  { id: 'streetcar', title: 'St. Charles streetcar', meta: 'Uptown · 1 hr', icon: 'streetcar' },
  { id: 'garden-district', title: 'Garden District walk', meta: 'Garden District · 1.5 hr', icon: 'oak' },
  { id: 'magazine-st', title: 'Magazine Street', meta: 'Uptown · 2 hr', icon: 'balcony' },
  { id: 'frenchmen-jazz', title: 'Frenchmen Street', meta: '4 min walk', icon: 'trumpet' },
  { id: 'preservation-hall', title: 'Preservation Hall', meta: 'French Quarter · 45 min', icon: 'trumpet' },
  { id: 'city-park', title: 'City Park', meta: 'Mid-City · 2 hr', icon: 'oak' },
  { id: 'crescent-park', title: 'Crescent Park', meta: 'Bywater · 1 hr', icon: 'oak' },
  { id: 'cemetery-tour', title: 'Cemetery tour', meta: '1.5 hr', icon: 'balcony' },
  { id: 'ghost-tour', title: 'Ghost tour', meta: 'French Quarter · 2 hr', icon: 'balcony' },
  { id: 'swamp-tour', title: 'Swamp tour', meta: 'Out of town · half day', icon: 'oak' },
  { id: 'ww2-museum', title: 'WWII Museum', meta: 'Warehouse District · 3 hr', icon: 'balcony' },
  { id: 'bywater-art', title: 'Bywater murals', meta: '15 min walk', icon: 'balcony' },
  { id: 'riverboat', title: 'Riverboat cruise', meta: 'Riverfront · 2 hr', icon: 'trumpet' },
  { id: 'bourbon-once', title: 'Bourbon Street', meta: '15 min walk', icon: 'balcony' },
  { id: 'palm-reading', title: 'Palm reading', meta: 'Jackson Square · 20 min', icon: 'balcony' }
];

export const FOOD_DATA = {
  fridayDinner: [
    { id: 'montgomery-sitdown', title: 'Sit-down in Montgomery' },
    { id: 'bbq-interstate', title: 'Barbecue' },
    { id: 'auburn-diner', title: 'Auburn diner' },
    { id: 'chick-fil-a-zaxbys', title: "Chick-fil-A or Zaxby's and keep driving" },
    { id: 'bucees', title: "Buc-ee's" },
    { id: 'whatever-looks-good', title: "Whatever looks good on the road" }
  ],
  satLunch: [
    { id: 'turkey-wolf', title: 'Turkey and the Wolf', meta: 'Sandwiches · Irish Channel' },
    { id: 'parkway-bakery', title: 'Parkway Bakery', meta: 'Po-boys · Mid-City' },
    { id: 'cochon-butcher', title: 'Cochon Butcher', meta: 'Cajun deli · Warehouse' },
    { id: 'willie-maes', title: "Willie Mae's", meta: 'Fried chicken · Treme' },
    { id: 'killer-poboys', title: 'Killer PoBoys', meta: 'Po-boys · French Quarter' },
    { id: 'mothers', title: "Mother's", meta: 'Old-school · CBD' },
    { id: 'lillys-cafe', title: "Lilly's Café", meta: 'Vietnamese · Lower Garden' }
  ],
  groupDinner: [
    { id: 'cochon', title: 'Cochon', meta: 'Cajun · Warehouse' },
    { id: 'jacques-imos', title: "Jacques-Imo's", meta: 'Creole · Uptown' },
    { id: 'peche', title: 'Peche', meta: 'Seafood · Warehouse' },
    { id: 'gris-gris', title: 'Gris-Gris', meta: 'Southern · Lower Garden' },
    { id: 'cafe-sbisa', title: 'Café Sbisa', meta: 'Creole · French Quarter' },
    { id: 'sylvain', title: 'Sylvain', meta: 'Small plates · French Quarter' },
    { id: 'commanders-palace', title: "Commander's Palace", meta: 'Fine dining · jacket required' },
    { id: 'coquette', title: 'Coquette', meta: 'Bistro · Garden District' },
    { id: 'acme-oyster', title: 'Acme Oyster House', meta: 'Oysters · French Quarter' }
  ]
};

export const SATURDAY_PLANS_CHIPS = [
  "Frenchmen Street",
  "A cocktail bar",
  "Dueling pianos",
  "Dancing",
  "Bourbon once",
  "A dive bar",
  "Late-night beignets",
  "Walk by the river",
  "Back to the hotel"
];

export const NIGHT_DIAL_STOPS = [
  "10:00 PM",
  "11:00 PM",
  "Midnight",
  "1:00 AM",
  "2:00 AM"
];
