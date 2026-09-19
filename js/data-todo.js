// Things to do in New Orleans — 40 options
// fromHotel: measured from 501 Elysian Fields Ave (approximate)
// Categories: classic | music | drinks | art | outdoors | offbeat

export const CATEGORIES = [
    { id: "all", label: "All" },
    { id: "classic", label: "Classic" },
    { id: "music", label: "Music" },
    { id: "drinks", label: "Drinks" },
    { id: "art", label: "Art" },
    { id: "outdoors", label: "Outdoors" },
    { id: "offbeat", label: "Offbeat" }
];

const M = (q, id) =>
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}&query_place_id=${id}`;

export const THINGS_TO_DO = [

    // ─── CLASSIC ────────────────────────────────────────────────
    {
        id: "cafe-du-monde",
        name: "Café du Monde",
        category: "classic",
        blurb: "Beignets and chicory coffee at the same open-air stand since 1862. Open until midnight Friday and Saturday.",
        neighborhood: "French Quarter",
        duration: "45 min",
        fromHotel: "12 min walk",
        lat: 29.9576044, lng: -90.0617687,
        mapsUrl: M("Cafe Du Monde, 800 Decatur St, New Orleans", "ChIJTT5Hm-ClIIYR97Y1jn7-aA0")
    },
    {
        id: "jackson-square",
        name: "Jackson Square",
        category: "classic",
        blurb: "The square in front of the cathedral — portrait artists, tarot tables, brass bands, all day.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "13 min walk",
        lat: 29.9574024, lng: -90.0629495,
        mapsUrl: M("Jackson Square, New Orleans", "ChIJaS5FoBGmIIYRj77fFz8J_94")
    },
    {
        id: "st-louis-cathedral",
        name: "St. Louis Cathedral",
        category: "classic",
        blurb: "The oldest continuously active cathedral in the country. Free to walk through, ten minutes inside.",
        neighborhood: "French Quarter",
        duration: "20 min",
        fromHotel: "13 min walk",
        lat: 29.9579735, lng: -90.0637281,
        mapsUrl: M("St. Louis Cathedral, New Orleans", "ChIJTzYBmBGmIIYRroU93FagPTY")
    },
    {
        id: "french-market",
        name: "French Market",
        category: "classic",
        blurb: "Open-air market six blocks long — produce, hot sauce, souvenirs, gator on a stick. Closes at six.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "8 min walk",
        lat: 29.959742, lng: -90.0595812,
        mapsUrl: M("French Market, New Orleans", "ChIJqdiBRxGmIIYRgRBbwourAJ4")
    },
    {
        id: "royal-street",
        name: "Royal Street",
        category: "classic",
        blurb: "One street over from Bourbon and a different planet — galleries, antique shops, and street musicians.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "12 min walk",
        lat: 29.9591402, lng: -90.0637548,
        mapsUrl: M("Royal Street, New Orleans", "Eh5Sb3lhbCBTdCwgTmV3IE9ybGVhbnMsIExBLCBVU0EiLiosChQKEgmnnMaFO6YghhGLPTf7qIld1xIUChIJf5407BGmIIYROiKyvb07vZg")
    },
    {
        id: "bourbon-street",
        name: "Bourbon Street",
        category: "classic",
        blurb: "Loud, sticky, and worth seeing once. We can be in and out in half an hour.",
        neighborhood: "French Quarter",
        duration: "30 min",
        fromHotel: "16 min walk",
        lat: 29.9547066, lng: -90.0691532,
        mapsUrl: M("Bourbon Street, New Orleans", "ChIJXYWi1hGmIIYRvVjha9AX2LY")
    },
    {
        id: "streetcar",
        name: "St. Charles streetcar",
        category: "classic",
        blurb: "The 1920s green streetcar down the oak avenue. Ride it out and walk back through the Garden District.",
        neighborhood: "Uptown",
        duration: "1 hr each way",
        fromHotel: "Catch it at Canal St",
        lat: 29.9266844, lng: -90.0996963,
        mapsUrl: M("St. Charles Streetcar Line, New Orleans", "ChIJTSu5I7ulIIYRUHrT1bhM5IU")
    },
    {
        id: "garden-district",
        name: "Garden District",
        category: "classic",
        blurb: "Twenty blocks of 1800s mansions under live oaks. Best done slowly with no particular route.",
        neighborhood: "Garden District",
        duration: "1.5 hr",
        fromHotel: "18 min drive",
        lat: 29.9292146, lng: -90.0828533,
        mapsUrl: M("Garden District, New Orleans", "ChIJYQa_pNKlIIYRUO_wizbrjFo")
    },
    {
        id: "magazine-street",
        name: "Magazine Street",
        category: "classic",
        blurb: "Six miles of independent shops, coffee, and vintage. We'd realistically do eight blocks of it.",
        neighborhood: "Uptown",
        duration: "2 hr",
        fromHotel: "15 min drive",
        lat: 29.9516963, lng: -90.067336,
        mapsUrl: M("Magazine Street, New Orleans", "ChIJNdKmALGlIIYRbt2Z3DYOm7Q")
    },
    {
        id: "steamboat-natchez",
        name: "Steamboat Natchez",
        category: "classic",
        blurb: "Actual paddlewheel steamboat on the Mississippi with a live jazz band. Two hours, book ahead.",
        neighborhood: "Riverfront",
        duration: "2 hr",
        fromHotel: "18 min walk",
        lat: 29.9552704, lng: -90.0627252,
        mapsUrl: M("Steamboat Natchez, New Orleans", "ChIJq6q6IHOmIIYRLmTkIJGVqvY")
    },

    // ─── MUSIC ──────────────────────────────────────────────────
    {
        id: "frenchmen-street",
        name: "Frenchmen Street",
        category: "music",
        blurb: "Three blocks of live music clubs where the locals go instead of Bourbon. Around the corner from us.",
        neighborhood: "Marigny",
        duration: "evening",
        fromHotel: "4 min walk",
        lat: 29.9641512, lng: -90.0578074,
        mapsUrl: M("Frenchmen Street, New Orleans", "ChIJh4KdlbyoIIYR4WbWAgc52bs")
    },
    {
        id: "spotted-cat",
        name: "The Spotted Cat",
        category: "music",
        blurb: "Tiny, packed, live jazz from mid-afternoon until two in the morning. Small cover, no seats.",
        neighborhood: "Marigny",
        duration: "1–2 hr",
        fromHotel: "4 min walk",
        lat: 29.9640556, lng: -90.0576889,
        mapsUrl: M("The Spotted Cat Music Club, New Orleans", "ChIJC6SBNximIIYRyxwtvjBTDyE")
    },
    {
        id: "dba",
        name: "d.b.a.",
        category: "music",
        blurb: "The other anchor on Frenchmen — bigger room, deep beer list, music every night until late.",
        neighborhood: "Marigny",
        duration: "1–2 hr",
        fromHotel: "4 min walk",
        lat: 29.9639463, lng: -90.0578801,
        mapsUrl: M("d.b.a. New Orleans, 618 Frenchmen St", "ChIJg2cVSBimIIYRSaF65GcBxsw")
    },
    {
        id: "preservation-hall",
        name: "Preservation Hall",
        category: "music",
        blurb: "Forty-five minutes of traditional jazz on wooden benches. No phones, no drinks, no bad seats.",
        neighborhood: "French Quarter",
        duration: "45 min",
        fromHotel: "16 min walk",
        lat: 29.9582893, lng: -90.0653897,
        mapsUrl: M("Preservation Hall, New Orleans", "ChIJX3VoIA6mIIYRVddRO2d7njg")
    },
    {
        id: "tipitinas",
        name: "Tipitina's",
        category: "music",
        blurb: "The legendary uptown music hall. Whatever's booked that night is usually worth the cab.",
        neighborhood: "Uptown",
        duration: "evening",
        fromHotel: "20 min drive",
        lat: 29.9172719, lng: -90.1007669,
        mapsUrl: M("Tipitina's, New Orleans", "ChIJU_GdkE-kIIYRRcXzSX0VdfA")
    },
    {
        id: "bacchanal",
        name: "Bacchanal Wine",
        category: "music",
        blurb: "Pick a bottle inside, build a cheese plate, sit in a string-lit backyard with a band playing.",
        neighborhood: "Bywater",
        duration: "2 hr",
        fromHotel: "20 min walk",
        lat: 29.9598033, lng: -90.033265,
        mapsUrl: M("Bacchanal Fine Wine & Spirits, New Orleans", "ChIJuUKPzc2nIIYRu1_EUiao4N4")
    },

    // ─── DRINKS ─────────────────────────────────────────────────
    {
        id: "carousel-bar",
        name: "Carousel Bar",
        category: "drinks",
        blurb: "The bar itself is a carousel and it rotates, slowly, while you sit at it. Hard to get a seat.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "20 min walk",
        lat: 29.9541752, lng: -90.0680322,
        mapsUrl: M("The Carousel Bar & Lounge, New Orleans", "ChIJWyzaUwymIIYRTUN1hvSdkN0")
    },
    {
        id: "lafittes",
        name: "Lafitte's Blacksmith Shop",
        category: "drinks",
        blurb: "1720s building, lit almost entirely by candles, claims to be the oldest bar in the country.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "12 min walk",
        lat: 29.9610414, lng: -90.0636019,
        mapsUrl: M("Lafitte's Blacksmith Shop Bar, New Orleans", "ChIJQ2LnQhCmIIYRaiHN581oLWY")
    },
    {
        id: "pat-obriens",
        name: "Pat O'Brien's",
        category: "drinks",
        blurb: "Dueling pianos, a flaming courtyard fountain, and the Hurricane, which was invented here.",
        neighborhood: "French Quarter",
        duration: "1–2 hr",
        fromHotel: "16 min walk",
        lat: 29.9582008, lng: -90.0652973,
        mapsUrl: M("Pat O'Brien's, New Orleans", "ChIJDyC9Ig6mIIYRDWmrSR08N54")
    },
    {
        id: "napoleon-house",
        name: "Napoleon House",
        category: "drinks",
        blurb: "Crumbling 200-year-old courtyard, classical music, Pimm's Cups, a muffuletta if we're hungry.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "17 min walk",
        lat: 29.9558754, lng: -90.065056,
        mapsUrl: M("Napoleon House, New Orleans", "ChIJZYGmBhKmIIYRPBmyGfELFTs")
    },
    {
        id: "columns",
        name: "The Columns",
        category: "drinks",
        blurb: "A drink on the porch of an 1883 mansion, looking out at the streetcar. Golden hour is the move.",
        neighborhood: "Uptown",
        duration: "1 hr",
        fromHotel: "20 min drive",
        lat: 29.9272464, lng: -90.0961206,
        mapsUrl: M("The Columns, 3811 St Charles Ave, New Orleans", "ChIJm4jDLkukIIYRXcvJiNMB9Uk")
    },
    {
        id: "sazerac-house",
        name: "Sazerac House",
        category: "drinks",
        blurb: "Three floors on the history of the cocktail, free to enter, and they give you three tastings.",
        neighborhood: "CBD",
        duration: "1 hr",
        fromHotel: "8 min drive",
        lat: 29.9518531, lng: -90.0675529,
        mapsUrl: M("The Sazerac House, New Orleans", "ChIJ2auhMI6nIIYR2KSsZbDEu8s")
    },

    // ─── ART & MUSEUMS ──────────────────────────────────────────
    {
        id: "sculpture-garden",
        name: "Besthoff Sculpture Garden",
        category: "art",
        blurb: "Eleven acres of sculpture under Spanish moss, with bridges and ponds. Free, and genuinely beautiful.",
        neighborhood: "City Park",
        duration: "1.5 hr",
        fromHotel: "12 min drive",
        lat: 29.9859127, lng: -90.0940014,
        mapsUrl: M("Sydney and Walda Besthoff Sculpture Garden, New Orleans", "ChIJ7WG3D2ivIIYR6h9SkhZMXtY")
    },
    {
        id: "noma",
        name: "New Orleans Museum of Art",
        category: "art",
        blurb: "The city's main art museum, at the head of City Park. Closed Monday and Tuesday.",
        neighborhood: "City Park",
        duration: "2 hr",
        fromHotel: "12 min drive",
        lat: 29.9864722, lng: -90.09345,
        mapsUrl: M("New Orleans Museum of Art", "ChIJYRCgqEKvIIYR8SRec2onF50")
    },
    {
        id: "studio-be",
        name: "StudioBE",
        category: "art",
        blurb: "A 35,000-square-foot warehouse filled with Brandan Odums's murals. One of the best things here.",
        neighborhood: "Bywater",
        duration: "1 hr",
        fromHotel: "10 min walk",
        lat: 29.9640765, lng: -90.0475877,
        mapsUrl: M("StudioBE, 2941 Royal St, New Orleans", "ChIJmfcRFSWmIIYRIZjnSuIAeko")
    },
    {
        id: "ogden",
        name: "Ogden Museum of Southern Art",
        category: "art",
        blurb: "Four floors of Southern art — paintings, photography, folk work. Smaller and more personal than NOMA.",
        neighborhood: "Warehouse District",
        duration: "1.5 hr",
        fromHotel: "12 min drive",
        lat: 29.9435833, lng: -90.071335,
        mapsUrl: M("Ogden Museum of Southern Art, New Orleans", "ChIJiWrM6XamIIYRqbK2P0oz8zA")
    },
    {
        id: "wwii-museum",
        name: "The National WWII Museum",
        category: "art",
        blurb: "Consistently rated one of the best museums in the country. Four buildings — it eats a whole day.",
        neighborhood: "Warehouse District",
        duration: "3–5 hr",
        fromHotel: "12 min drive",
        lat: 29.9430711, lng: -90.0705317,
        mapsUrl: M("The National WWII Museum, New Orleans", "ChIJHc6A2namIIYRaibte9NvWoU")
    },
    {
        id: "hnoc",
        name: "Historic New Orleans Collection",
        category: "art",
        blurb: "Free museum on Royal Street covering the city's history. Closed Mondays, worth an hour.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "15 min walk",
        lat: 29.9567983, lng: -90.0657634,
        mapsUrl: M("The Historic New Orleans Collection, 520 Royal St", "ChIJc4kcBA6mIIYRbWz3FiNQ8fQ")
    },
    {
        id: "mardi-gras-world",
        name: "Mardi Gras World",
        category: "art",
        blurb: "The warehouse where the parade floats are actually built. You walk through them mid-construction.",
        neighborhood: "Riverfront",
        duration: "1.5 hr",
        fromHotel: "12 min drive",
        lat: 29.9350317, lng: -90.0614772,
        mapsUrl: M("Mardi Gras World, New Orleans", "ChIJWTjotmWmIIYRjo3SZ8nZck4")
    },

    // ─── OUTDOORS ───────────────────────────────────────────────
    {
        id: "crescent-park",
        name: "Crescent Park",
        category: "outdoors",
        blurb: "A mile of riverfront park on old wharves, with the skyline across the water. Closes at 7:30.",
        neighborhood: "Bywater",
        duration: "1 hr",
        fromHotel: "8 min walk",
        lat: 29.9615877, lng: -90.0461695,
        mapsUrl: M("Crescent Park, New Orleans", "ChIJHdptFTCmIIYRjvhlzHT4XSA")
    },
    {
        id: "city-park",
        name: "City Park",
        category: "outdoors",
        blurb: "Bigger than Central Park, with the oldest stand of live oaks in the world. Rent a bike or just wander.",
        neighborhood: "Mid-City",
        duration: "2 hr",
        fromHotel: "12 min drive",
        lat: 30.0038389, lng: -90.0971939,
        mapsUrl: M("City Park, New Orleans", "ChIJYbSp2T-vIIYRULk_iiYvUR8")
    },
    {
        id: "audubon-park",
        name: "Audubon Park",
        category: "outdoors",
        blurb: "Oak-lined loop path, lagoons, and the zoo at the far end. Streetcar drops you at the entrance.",
        neighborhood: "Uptown",
        duration: "1.5 hr",
        fromHotel: "25 min drive",
        lat: 29.9255966, lng: -90.1286501,
        mapsUrl: M("Audubon Park, New Orleans", "ChIJ_33cZB6lIIYRLkr6QwtCA8A")
    },
    {
        id: "algiers-ferry",
        name: "Algiers Point ferry",
        category: "outdoors",
        blurb: "Free-ish ferry across the Mississippi with the best skyline view in the city. Ten minutes each way.",
        neighborhood: "Riverfront",
        duration: "45 min",
        fromHotel: "22 min walk",
        lat: 29.9498431, lng: -90.06334,
        mapsUrl: M("Canal Street Ferry Terminal, New Orleans", "ChIJLQk0xGymIIYRnYEEfG6_yOI")
    },
    {
        id: "barataria",
        name: "Barataria Preserve",
        category: "outdoors",
        blurb: "National park swamp with boardwalks through the cypress. Alligators, free, no boat required.",
        neighborhood: "Marrero",
        duration: "half day",
        fromHotel: "40 min drive",
        lat: 29.8101232, lng: -90.1337022,
        mapsUrl: M("Jean Lafitte National Historical Park Barataria Preserve", "ChIJ6xwex32YIIYRshnjL-oYt8U")
    },
    {
        id: "audubon-aquarium",
        name: "Audubon Aquarium",
        category: "outdoors",
        blurb: "Aquarium and insectarium in one building at the foot of Canal Street, including a butterfly room.",
        neighborhood: "Riverfront",
        duration: "2–3 hr",
        fromHotel: "22 min walk",
        lat: 29.9504543, lng: -90.0629212,
        mapsUrl: M("Audubon Aquarium, New Orleans", "ChIJtW8fOW2mIIYRSEs0hhyvYCE")
    },
    {
        id: "vue-orleans",
        name: "Vue Orleans",
        category: "outdoors",
        blurb: "Observation deck 34 floors up, 360 degrees over the river and the Quarter. Go near sunset.",
        neighborhood: "CBD",
        duration: "1 hr",
        fromHotel: "8 min drive",
        lat: 29.9491644, lng: -90.0635348,
        mapsUrl: M("Vue Orleans Observation Deck, New Orleans", "ChIJ1c3EE9SnIIYRkEMlvKc1FsQ")
    },

    // ─── OFFBEAT ────────────────────────────────────────────────
    {
        id: "st-louis-cemetery",
        name: "St. Louis Cemetery No. 1",
        category: "offbeat",
        blurb: "Above-ground tombs from 1789, including Marie Laveau's. You can only go in with a licensed guide.",
        neighborhood: "Treme",
        duration: "1 hr",
        fromHotel: "15 min walk",
        lat: 29.9591541, lng: -90.0712523,
        mapsUrl: M("St. Louis Cemetery No. 1, 501 Basin St, New Orleans", "ChIJl8lWMACnIIYRh073KRtVhkk")
    },
    {
        id: "pharmacy-museum",
        name: "Pharmacy Museum",
        category: "offbeat",
        blurb: "The 1823 apothecary of America's first licensed pharmacist. Leeches, voodoo potions, $10. Closed Sun/Mon.",
        neighborhood: "French Quarter",
        duration: "1 hr",
        fromHotel: "17 min walk",
        lat: 29.9560361, lng: -90.0649222,
        mapsUrl: M("New Orleans Pharmacy Museum, 514 Chartres St", "ChIJd3LPBRKmIIYReu4anohZsXo")
    },
    {
        id: "cooking-class",
        name: "Cooking class",
        category: "offbeat",
        blurb: "Two hours learning gumbo and jambalaya, then eating what you made. Demo or hands-on.",
        neighborhood: "French Quarter",
        duration: "2–3 hr",
        fromHotel: "17 min walk",
        lat: 29.9554035, lng: -90.0648504,
        mapsUrl: M("New Orleans School of Cooking, 524 St Louis St", "ChIJd7WWDRKmIIYR-IeBvKVwNqY")
    },
    {
        id: "ghost-tour",
        name: "Ghost and history tour",
        category: "offbeat",
        blurb: "Half real history, half nonsense, entirely fun. They leave from Jackson Square most evenings.",
        neighborhood: "French Quarter",
        duration: "2 hr",
        fromHotel: "13 min walk",
        lat: 29.9574024, lng: -90.0629495,
        mapsUrl: M("Jackson Square, New Orleans", "ChIJaS5FoBGmIIYRj77fFz8J_94")
    },
    {
        id: "palm-reading",
        name: "Palm reading",
        category: "offbeat",
        blurb: "The tables set up along the cathedral fence. Twenty dollars and twenty minutes. I'll go first.",
        neighborhood: "French Quarter",
        duration: "20 min",
        fromHotel: "13 min walk",
        lat: 29.9574024, lng: -90.0629495,
        mapsUrl: M("Jackson Square, New Orleans", "ChIJaS5FoBGmIIYRj77fFz8J_94")
    }
];