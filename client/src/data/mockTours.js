export const MOCK_TOURS = [
  {
    id: 'patagonia-trek',
    slug: 'patagonia-glaciers-and-fjords',
    title: 'Patagonia Glaciers & Fjords Expedition',
    category: 'Alpine Trekking',
    location: 'Torres del Paine, Chile & Argentina',
    durationDays: 12,
    maxGroupSize: 10,
    difficulty: 'Challenging',
    price: 4250,
    rating: 4.95,
    reviewsCount: 48,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Trek the legendary W-Circuit through granite spires, ancient ice fields, and azure glacial lakes with master mountain guides.',
    description: 'Immerse yourself in the untamed wilderness of Patagonia. From the sheer granite horns of the Cuernos del Paine to the thundering ice walls of Grey Glacier, this boutique small-group trek combines demanding mountain footpaths with cozy luxury eco-lodges and artisanal Patagonian cuisine.',
    highlights: [
      'Private Zodiac navigation across Grey Lake to the blue ice caves',
      'Sunrise hike to the base of the iconic Torres del Paine spires',
      'Traditional Patagonian asado barbecue with local gaucho herdsmen',
      'Certified UIAGM wilderness mountain guides and carbon-neutral stays'
    ],
    inclusions: [
      '11 nights in premium wilderness eco-lodges',
      'All meals crafted with fresh regional Patagonian produce',
      'National park entry permits and catamaran transfers',
      'High-altitude emergency medical coverage & satellite comms'
    ],
    exclusions: [
      'International flights to Punta Arenas',
      'Personal trekking gear (crampons & poles provided)',
      'Travel insurance & personal gratuities'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Punta Arenas & Scenic Drive to Puerto Natales', details: 'Welcome reception at Punta Arenas airport followed by a scenic drive across the Patagonian steppe. Evening trip briefing and welcome dinner.' },
      { day: 2, title: 'Entry into Torres del Paine National Park', details: 'Hike through Andean scrub and southern beech forests to the turquoise shores of Lake Pehoe.' },
      { day: 3, title: 'The Base of the Towers Trek', details: 'Ascend the Ascencio Valley through ancient lenga forests up to the granite amphitheater beneath the iconic triple towers.' },
      { day: 4, title: 'French Valley & Glacial Hanging Cirques', details: 'Enter the French Valley flanked by towering hanging glaciers and the dramatic granite horns of Los Cuernos.' },
      { day: 5, title: 'Grey Glacier Ice Fields & Navigation', details: 'Trek along Lake Grey to witness thundering calvings of ice blocks, followed by an evening navigation by Zodiac boat.' },
      { day: 6, title: 'Pampa Journey to Los Glaciares (El Chalten)', details: 'Cross the border into Argentina toward Fitz Roy and Cerro Torre with a sunset stop at Lake Viedma.' }
    ]
  },
  {
    id: 'kyoto-temples',
    slug: 'kyoto-zen-ancient-temples',
    title: 'Kyoto Zen & Ancient Heritage Immersions',
    category: 'Cultural Heritage',
    location: 'Kyoto & Nara, Japan',
    durationDays: 8,
    maxGroupSize: 8,
    difficulty: 'Easy',
    price: 3100,
    rating: 4.92,
    reviewsCount: 64,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1492571350019-22de08371fd3?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Private access to UNESCO Zen gardens, traditional tea master ceremonies, and centuries-old wooden ryokan retreats.',
    description: 'Experience the refined spirituality and sublime aesthetics of Japan’s ancient imperial capital. Enjoy private after-hours admissions into Daitoku-ji temple gardens, learn traditional mindfulness meditation from resident Zen monks, and stay in heritage ryokans featuring natural hot spring onsens.',
    highlights: [
      'Private dawn walk through Arashiyama bamboo grove before public opening',
      'Exclusive tea ceremony hosted by an 8th-generation Urasenke master',
      'Handmade soba making and Michelin-starred multi-course kaiseki dinners',
      'Guided strolls through preserved geisha quarters of Gion and Pontocho'
    ],
    inclusions: [
      '7 nights in authentic 5-star ryokans and boutique heritage hotels',
      'Daily breakfast and 5 multi-course kaiseki banquets',
      'Reserved first-class Shinkansen bullet train passes',
      'English-speaking cultural historian guide throughout'
    ],
    exclusions: [
      'International flights to Osaka Kansai (KIX)',
      'Alcoholic beverages outside included dinners',
      'Personal temple souvenirs and amulets'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Kyoto & Kaiseki Welcome', details: 'Check in to a private garden ryokan along the Kamo River. Evening traditional multi-course seasonal dinner.' },
      { day: 2, title: 'Daitoku-ji Zen Gardens & Tea Ceremony', details: 'Explore hidden sub-temples of Daitoku-ji and participate in an authentic Zen tea ceremony.' },
      { day: 3, title: 'Arashiyama Bamboo & Sagano Romance Train', details: 'Sunrise walk through the bamboo grove followed by a private rickshaw tour of secluded hillside shrines.' },
      { day: 4, title: 'Nara Deer Park & Todai-ji Giant Buddha', details: 'Day journey to ancient Nara to visit the world’s largest wooden building and sacred free-roaming sika deer.' }
    ]
  },
  {
    id: 'serengeti-safari',
    slug: 'serengeti-great-migration-safari',
    title: 'Serengeti & Ngorongoro Great Migration',
    category: 'Wildlife Safari',
    location: 'Serengeti, Tanzania',
    durationDays: 10,
    maxGroupSize: 6,
    difficulty: 'Moderate',
    price: 5890,
    rating: 4.98,
    reviewsCount: 52,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Witness over two million wildebeest thunder across the golden plains, accompanied by big cat predators and sunrise balloon flights.',
    description: 'An extraordinary safari expedition into the crown jewel of East Africa. Tracking the Great Migration across the endless plains of the Serengeti and descending 600 meters into the volcanic caldera of the Ngorongoro Crater, home to black rhinos, tree-climbing lions, and colossal elephant herds.',
    highlights: [
      'Custom open-roof 4x4 Land Cruisers with guaranteed window seating',
      'Sunrise hot air balloon flight over the Serengeti with bush champagne breakfast',
      'Full-day game drive across the UNESCO Ngorongoro Crater floor',
      'Ethical cultural exchange with Maasai elder conservationists'
    ],
    inclusions: [
      '9 nights in luxury mobile canvas tented camps following migration herds',
      'All game drives, park conservation fees, and government taxes',
      'Unlimited filtered water, fine wines, and artisanal bush meals',
      'Bush plane flights between Arusha and Serengeti airstrips'
    ],
    exclusions: [
      'International flights to Kilimanjaro (JRO)',
      'Tanzania tourist visa ($50-$100)',
      'Staff gratuities & optional spa treatments'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Arusha & Coffee Plantation Stay', details: 'Land at Kilimanjaro International and transfer to a historic coffee estate in Arusha.' },
      { day: 2, title: 'Tarangire National Park Elephant Sanctuaries', details: 'Drive to Tarangire, famous for ancient baobab trees and massive elephant herds.' },
      { day: 3, title: 'Descent into Ngorongoro Crater', details: 'Full-day safari on the crater floor observing endangered black rhinos and flamingo flocks.' },
      { day: 4, title: 'Fly to Northern Serengeti Migration Front', details: 'Bush plane to Mara River sector to watch dramatic wildebeest river crossings.' }
    ]
  },
  {
    id: 'amalfi-sailing',
    slug: 'amalfi-coast-capri-yachting',
    title: 'Amalfi Coast & Capri Private Yachting',
    category: 'Coastal Sailing',
    location: 'Campania, Italy',
    durationDays: 7,
    maxGroupSize: 8,
    difficulty: 'Easy',
    price: 3750,
    rating: 4.88,
    reviewsCount: 39,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Sail past pastel cliffside villages, anchor in secluded Mediterranean coves, and dine on freshly harvested seafood in Capri.',
    description: 'Cruise along the world’s most dramatic coastline aboard a private skippered catamaran. Explore the vertical towns of Positano and Amalfi from the water, swim inside the sea grottoes of Capri, and hike the panoramic Path of the Gods high above the sparkling Tyrrhenian Sea.',
    highlights: [
      'Private catamaran cruise with professional skipper and onboard chef',
      'Sunset wine tasting overlooking the Faraglioni rock formations in Capri',
      'Guided walk along the Sentiero degli Dei (Path of the Gods)',
      'Limoncello crafting workshop inside a heritage Sorrento lemon grove'
    ],
    inclusions: [
      '6 nights in boutique sea-view cliffside hotels and catamaran berths',
      'All coastal marina dockage fees, fuel, and skipper services',
      'Daily Mediterranean breakfasts, artisan lunches, and local DOC wines',
      'Private transfers between Naples International and the marina'
    ],
    exclusions: [
      'Flights to/from Naples (NAP)',
      'Dinners on free evenings in Positano',
      'Personal shopping in Capri boutiques'
    ],
    itinerary: [
      { day: 1, title: 'Embarkation in Sorrento & Welcome Aperitivo', details: 'Board the catamaran in Sorrento harbor with welcome Prosecco and cruise toward Positano.' },
      { day: 2, title: 'Positano & Secret Li Galli Islands', details: 'Anchor near the mythological Sirenuse islands for swimming and snorkeling in crystalline waters.' },
      { day: 3, title: 'Capri & The Faraglioni Caves', details: 'Full day circumnavigating Capri with private entrance to the White and Green Grottoes.' },
      { day: 4, title: 'Ravello Villa Rufolo & Cliffside Gardens', details: 'Disembark at Amalfi town and take private shuttles to the classical music gardens of Ravello.' }
    ]
  },
  {
    id: 'iceland-aurora',
    slug: 'iceland-aurora-borealis-trek',
    title: 'Iceland Aurora Borealis & Glacier Trek',
    category: 'Arctic Expedition',
    location: 'Vatnajökull & South Coast, Iceland',
    durationDays: 6,
    maxGroupSize: 12,
    difficulty: 'Moderate',
    price: 2950,
    rating: 4.90,
    reviewsCount: 71,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Chasing the Northern Lights across black volcanic sands, luminous ice lagoons, and thundering waterfalls.',
    description: 'Explore the land of fire and ice during the peak aurora season. Trek across Europe’s largest ice cap with crampons and ice axes, marvel at giant floating diamonds on Breiðamerkursandur beach, and relax every evening in geothermally heated mineral lagoons under the dancing green sky.',
    highlights: [
      'Expert astronomer guided night hunts for the Northern Lights',
      'Glacier walk inside natural crystal ice caves of Vatnajökull',
      'Visit to Seljalandsfoss, Skógafoss, and Diamond Beach',
      'Geothermal soak at the Sky Lagoon overlooking ocean cliffs'
    ],
    inclusions: [
      '5 nights in premium geothermal eco-hotels with aurora wake-up calls',
      'Crampons, harnesses, safety helmets for glacier exploration',
      'Specially modified super-jeep transportation across volcanic terrain',
      'All breakfasts and 4 farm-to-table Nordic dinners'
    ],
    exclusions: [
      'Flights to/from Keflavik (KEF)',
      'Alcoholic drinks & thermal spa upgrades',
      'Personal thermal outerwear'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Reykjavik & Geothermal Sky Lagoon', details: 'Transfer from Keflavik to the dramatic infinity edge of the Sky Lagoon.' },
      { day: 2, title: 'The Golden Circle & Geysir Eruptions', details: 'Witness Gullfoss waterfall, Thingvellir rift valley, and Strokkur geyser.' },
      { day: 3, title: 'Vatnajökull Crystal Ice Caves', details: 'Journey into deep subterranean blue ice chambers sculpted by summer meltwaters.' },
      { day: 4, title: 'Jökulsárlón Glacier Lagoon & Aurora Watch', details: 'Watch icebergs drift toward the Atlantic Ocean under the night sky.' }
    ]
  },
  {
    id: 'swiss-alps',
    slug: 'swiss-alps-matterhorn-circuit',
    title: 'Swiss Alps & Matterhorn Alpine Circuit',
    category: 'Alpine Trekking',
    location: 'Zermatt & Jungfrau, Switzerland',
    durationDays: 9,
    maxGroupSize: 10,
    difficulty: 'Challenging',
    price: 4680,
    rating: 4.96,
    reviewsCount: 42,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'High altitude hiking beneath the Matterhorn and Eiger peaks with scenic mountain railways and fondue dinners.',
    description: 'Traverse the majestic peaks of the Valais and Bernese Oberland. Experience the pristine high trails of Zermatt, ride the historic Gornergrat cogwheel train, and stay in classic high-alpine hotels with direct views of the Matterhorn pyramid.',
    highlights: [
      'Gornergrat scenic railway ascent to 3,089 meters',
      'Hike the Five Lakes trail reflecting the Matterhorn summit',
      'Alpine cheese making and traditional Swiss fondue pairing',
      'Jungfraujoch Top of Europe glacier palace exploration'
    ],
    inclusions: [
      '8 nights in historic Swiss alpine chalets',
      'First-class Swiss Travel Pass for all trains, boats, and mountain lifts',
      'Daily Swiss breakfast and 5 gourmet alpine dinners',
      'Certified Swiss Mountain Leader'
    ],
    exclusions: [
      'Flights to Zurich or Geneva',
      'Personal luggage forwarding fees',
      'Optional tandem paragliding in Interlaken'
    ],
    itinerary: [
      { day: 1, title: 'Welcome to Zermatt (Car-free Alpine Village)', details: 'Arrive by train in Zermatt, meet your alpine leader, and admire the Matterhorn.' },
      { day: 2, title: 'Five Lakes High Panoramic Trail', details: 'Walk through alpine meadows reflecting the iconic horn in Stellisee and Grindjisee.' },
      { day: 3, title: 'Gorner Glacier & Monte Rosa Massif', details: 'Ascend to the panoramic Gornergrat ridge to view massive glacial tongues.' },
      { day: 4, title: 'Trans-Alpine Railway to Jungfrau Region', details: 'Scenic train across the Bernese Oberland to Grindelwald beneath the Eiger North Face.' }
    ]
  },
  {
    id: 'galapagos-cruise',
    slug: 'galapagos-wildlife-catamaran-cruise',
    title: 'Galápagos Islands Conservation Cruise',
    category: 'Wildlife Safari',
    location: 'Galápagos, Ecuador',
    durationDays: 8,
    maxGroupSize: 12,
    difficulty: 'Moderate',
    price: 6450,
    rating: 4.97,
    reviewsCount: 31,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Snorkel with marine iguanas, playful sea lions, and giant tortoises alongside resident Charles Darwin scientists.',
    description: 'An intimate wildlife voyage through Darwin’s living laboratory aboard an eco-catamaran. Snorkel in volcanic calderas with sea turtles, observe blue-footed booby courtship rituals, and support active marine preservation programs.',
    highlights: [
      'Level III Naturalist Guide certified by Galápagos National Park',
      'Daily guided snorkeling with sea lions, penguins, and eagle rays',
      'Private visit to the Charles Darwin Giant Tortoise Breeding Sanctuary',
      '100% single-use plastic free expedition catamaran'
    ],
    inclusions: [
      '7 nights aboard a luxury eco-catamaran with ocean-view cabins',
      'All meals, snacks, and non-alcoholic beverages onboard',
      'High-grade snorkeling gear, wetsuits, and ocean kayaks',
      'Transit Control Card and VIP airport assistance in Baltra'
    ],
    exclusions: [
      'Galápagos National Park entrance fee ($200 cash on arrival)',
      'Flights from Quito/Guayaquil to Baltra (GPS)',
      'Crew & guide tips'
    ],
    itinerary: [
      { day: 1, title: 'Arrival in Baltra & Santa Cruz Highlands', details: 'Visit the giant tortoises wandering freely through lush highland pastures.' },
      { day: 2, title: 'Genovesa Island (Bird Island)', details: 'Anchor in Darwin Bay to watch red-footed boobies and Nazca boobies nesting in cliffs.' },
      { day: 3, title: 'Bartolome Island & Pinnacle Rock', details: 'Climb the volcanic summit for iconic views and snorkel with Galápagos penguins.' },
      { day: 4, title: 'Fernandina Island Pristine Lava Fields', details: 'Explore the youngest island with thousands of marine iguanas and flightless cormorants.' }
    ]
  },
  {
    id: 'new-zealand-fjords',
    slug: 'new-zealand-milford-sound-queenstown',
    title: 'New Zealand Southern Alps & Milford Sound',
    category: 'Alpine Trekking',
    location: 'South Island, New Zealand',
    durationDays: 11,
    maxGroupSize: 10,
    difficulty: 'Moderate',
    price: 4350,
    rating: 4.94,
    reviewsCount: 38,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ],
    summary: 'Hike ancient rainforests, kayak misty fiords under towering Mitre Peak, and taste world-renowned Central Otago pinot noirs.',
    description: 'Discover the pure majesty of New Zealand’s South Island. From the snow-capped Southern Alps of Queenstown and Wanaka to the ancient hanging waterfalls of Milford and Doubtful Sounds, this journey brings you face to face with the planet’s cleanest wilderness.',
    highlights: [
      'Overnight nature cruise through the quiet reaches of Doubtful Sound',
      'Helicopter landing on Franz Josef Glacier with crampon ice trek',
      'Day trek on the world-famous Routeburn Track',
      'Private wine degustation in Gibbston Valley vineyard'
    ],
    inclusions: [
      '10 nights in boutique lakeside lodges and luxury wilderness retreats',
      'Private helicopter glacier transfers and boat cruises',
      'All Department of Conservation track permits',
      'Daily gourmet breakfasts and 6 winery degustation dinners'
    ],
    exclusions: [
      'International flights to Queenstown (ZQN)',
      'Optional bungee jumping or skydiving',
      'Travel and cancellation insurance'
    ],
    itinerary: [
      { day: 1, title: 'Queenstown Welcome & Lake Wakatipu', details: 'Arrive in Queenstown and board the vintage TSS Earnslaw steamship for dinner.' },
      { day: 2, title: 'Routeburn Track Day Journey', details: 'Hike through prehistoric beech forests surrounded by mountain vistas and waterfalls.' },
      { day: 3, title: 'Milford Sound Fjordland Cruise', details: 'Drive the scenic Milford Road and cruise beneath Mitre Peak and Stirling Falls.' },
      { day: 4, title: 'Wanaka Lakes & Mount Aspiring Wilderness', details: 'Visit peaceful Lake Wanaka and hike to scenic viewpoints of Mount Aspiring.' }
    ]
  }
];

export const MOCK_CATEGORIES = [
  { name: 'Alpine Trekking', count: 14, icon: 'Mountain', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80', description: 'Conquer legendary peaks, glacier valleys, and remote mountain passes.' },
  { name: 'Wildlife Safari', count: 9, icon: 'Binoculars', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80', description: 'Follow predator migrations and endangered fauna with certified naturalists.' },
  { name: 'Cultural Heritage', count: 12, icon: 'Landmark', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80', description: 'Experience ancient ceremonies, artisanal gastronomy, and UNESCO heritage sites.' },
  { name: 'Coastal Sailing', count: 8, icon: 'Ship', image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80', description: 'Skippered catamaran cruises through secret archipelagos and crystal coves.' },
  { name: 'Arctic Expedition', count: 6, icon: 'Snowflake', image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=600&q=80', description: 'Chasing auroras, traversing crystal ice caves, and voyaging across polar seas.' },
];

export const MOCK_REVIEWS = [
  {
    id: 'rev-1',
    author: 'Sarah Jenkins',
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    tourTitle: 'Patagonia Glaciers & Fjords Expedition',
    rating: 5,
    date: 'February 2026',
    comment: 'The organization of the Patagonia trek was flawless. Our guides knew every ridge, flora species, and wind pattern. Sleeping in eco-domes right under the granite horns was an unforgettable experience.'
  },
  {
    id: 'rev-2',
    author: 'David Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    tourTitle: 'Serengeti & Ngorongoro Great Migration',
    rating: 5,
    date: 'January 2026',
    comment: 'The sunrise balloon flight over the Mara River was transcendent. We watched cheetahs stalking impalas right from our open Land Cruiser. Truly boutique, ethical, and conservation-centered.'
  },
  {
    id: 'rev-3',
    author: 'Camilla Fontana',
    location: 'Milan, Italy',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
    tourTitle: 'Kyoto Zen & Ancient Heritage Immersions',
    rating: 5,
    date: 'March 2026',
    comment: 'Private after-hours access to Daitoku-ji temples was something money alone cannot buy. The tea ceremony with an 8th generation master gave us deep insight into Japanese mindfulness.'
  }
];

export const MOCK_BLOG_POSTS = [
  {
    id: 'blog-1',
    title: 'How to Pack for Patagonia: Essential Gear for Changing Weather',
    author: 'Marco Solis, Lead Alpine Guide',
    date: 'October 14, 2026',
    category: 'Gear & Preparation',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Patagonia experiences four seasons in a single afternoon. Learn how proper three-layer systems, waterproof membrane ratings, and terrain boots keep you safe and warm on the trail.',
    content: [
      'In Southern Patagonia, meteorological forecasts are merely polite suggestions. Within a forty-minute span ascending toward the Cuernos del Paine, an explorer can transition from scorching Andean sunshine to gale-force katabatic gusts carrying sleet straight from the Southern Patagonian Ice Field.',
      'The foundational law of alpine packing here is strict technical layering. Your base layer must be lightweight Merino wool (200g/m²) to regulate core temperature without trapping moisture. Avoid synthetic polyesters that retain odors and clamminess over multi-day traverses.',
      'Your mid-layer must provide high warmth-to-weight loft—such as 800-fill RDS-certified goose down or Polartec Alpha insulation. Finally, your outer shell requires a 3-layer Gore-Tex Pro or eVent membrane rated to at least 28,000mm hydrostatic head with fully taped seams and underarm pit zips for heat venting during steep climbs.',
      'For footwear, rigid shank trekking boots with Vibram Megagrip outsoles are non-negotiable. The moraine fields leading to the Torres Base amphitheater comprise loose scree and wet granite boulders where ankle rolling is the primary risk.'
    ],
    proTip: 'Pack your down jacket inside a siliconized waterproof dry sack rather than a standard stuff sack. Even top-tier expedition backpacks can absorb water during torrential Patagonian river crossings.'
  },
  {
    id: 'blog-2',
    title: 'The Great Migration Timeline: Where the Herds Travel Month-by-Month',
    author: 'Dr. Amina Kweku, Conservation Biologist',
    date: 'September 28, 2026',
    category: 'Wildlife Guide',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Understanding seasonal rain patterns across the Serengeti-Mara ecosystem to ensure you witness dramatic river crossings and calving seasons at the right time.',
    content: [
      'The Great Serengeti Migration is neither a single event nor a linear journey. It is a perpetual, circular clockwise voyage of over 1.8 million blue wildebeest, 300,000 zebras, and hundreds of thousands of gazelles chasing subterranean mineral salts and fresh rainfall across 30,000 square kilometers of pristine East African wilderness.',
      'January to March (The Calving Season): The southern Serengeti plains around Ndutu and the Ngorongoro Conservation Area erupt with life. Within a three-week window in February, over 500,000 calves are born—an evolutionary defense mechanism where predators (lions, cheetahs, and spotted hyenas) are completely saturated by sheer numbers.',
      'April to June (The Western Corridor & Grumeti): As the southern plains dry out, the herds turn northwest toward Lake Victoria. They encounter their first treacherous water obstacle: the Grumeti River, inhabited by massive 18-foot Nile crocodiles that lie in wait for the herds to plunge into the brown torrents.',
      'July to October (The Mara River Crossings): The pinnacle spectacle. Pushed by instinct and thirst, the herds face the thundering Mara River on the border between Tanzania and Kenya’s Maasai Mara. Massive dust plumes billow into the azure sky as thousands of animals leap off 20-foot riverbanks into churning waters.',
      'November to December (The Return South): Short rains trigger rapid regrowth in the nutrient-dense volcanic soils of the south, beckoning the herds back down eastern Serengeti to complete the grand cycle once again.'
    ],
    proTip: 'For the dramatic river crossings, base yourself at a mobile canvas safari camp in the northern Kogatende sector rather than a fixed lodge. Mobile camps shift location alongside the herds to keep drive times under 20 minutes.'
  },
  {
    id: 'blog-3',
    title: 'Beyond the Golden Route: Finding Stillness in Kyoto’s Sacred Sub-Temples',
    author: 'Kenji Takahashi, Cultural Historian',
    date: 'September 12, 2026',
    category: 'Culture & Mindset',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Step away from the crowded sightseeing buses into contemplative rock gardens that invite contemplation and harmony with the changing seasons.',
    content: [
      'While millions of tourists jostle for selfies under the orange vermilion gates of Fushimi Inari, the true soul of ancient Kyoto whispers in the secluded northern sub-temples of Daitoku-ji and Myoshin-ji.',
      'Here, Rinzai Zen Buddhism established monasteries five centuries ago where landscape architecture was conceived not as decoration, but as an instrument of spiritual awakening. The karesansui (dry rock gardens) represent the cosmos in miniature: raked white gravel ripples signify boundless oceans, while moss-cushioned granite stones symbolize solitary islands of consciousness.',
      'At dawn, before public entrance hours, our travelers are granted private audience with resident Zen masters for zazen meditation. Sitting barefoot on ancient cedar engawa verandas as morning mist rises off temple pine groves, one begins to understand the elusive Japanese aesthetic principle of "Yūgen"—a profound grace and subtlety that reveals itself only in patient stillness.'
    ],
    proTip: 'Wear clean, unbranded dark socks with no patterns when visiting Zen temples. You will frequently slip shoes on and off, and traditional monastery tatami mats require respectful, silent footfall.'
  }
];

export const MOCK_STATS = {
  activeExpeditions: 38,
  verifiedTravelers: 2450,
  destinationsCovered: 24,
  averageRating: 4.94,
  grossRevenue: 842500,
  completedTrips: 1840,
};
