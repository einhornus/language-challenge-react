import {codeToLanguage} from "../nlp/language_utils";


let topics = [
    {
        "topic": "history",
        "content": "The Richest Person In History"
    },
    {
        "topic": "history",
        "content": "Zheng He Voyages"
    },
    {
        "topic": "history",
        "content": "Hatshepsut: the Female Pharaoh Who Got Cancelled"
    },
    {
        "topic": "history",
        "content": "The Fall of the Roman Empire: a Detailed Analysis"
    },
    {
        "topic": "history",
        "content": "The Mystery of the Lost City of Atlantis"
    },
    {
        "topic": "history",
        "content": "The impact of the Silk Road on Ancient Trade"
    },
    {
        "topic": "tourism and travel",
        "content": "Why you should not be afraid to fly"
    },
    {
        "topic": "tourism and travel",
        "content": "The cultural shock: how to deal with it"
    },
    {
        "topic": "tourism and travel",
        "content": "Exploring the Hidden Gems of Bali"
    },
    {
        "topic": "tourism and travel",
        "content": "Solo Travel: Tips and Tricks for a Safe Journey"
    },
    {
        "topic": "tourism and travel",
        "content": "The Evolution of Ecotourism: A Closer Look"
    },
    {
        "topic": "art and culture",
        "content": "The Renaissance: A Revolution in Art and Thought"
    },
    {
        "topic": "art and culture",
        "content": "The World of Street Art: More Than Just Graffiti"
    },
    {
        "topic": "art and culture",
        "content": "Understanding Abstract Art: A Beginner's Guide"
    },
    {
        "topic": "languages",
        "content": "The Most Difficult Languages to Learn for English Speakers"
    },
    {
        "topic": "languages",
        "content": "The Evolution of the English Language: From Old to Modern"
    },
    {
        "topic": "languages",
        "content": "Linguistic Diversity in India: A Cultural Treasure"
    },
    {
        "topic": "animals",
        "content": "The Secret Lives of Deep Sea Creatures"
    },
    {
        "topic": "animals",
        "content": "The Importance of Bees in Our Ecosystem"
    },
    {
        "topic": "animals",
        "content": "Migration Patterns of Monarch Butterflies"
    },
    {
        "topic": "science",
        "content": "The Quest for a Unified Theory of Physics"
    },
    {
        "topic": "science",
        "content": "Climate Change: Understanding the Science Behind It"
    },
    {
        "topic": "science",
        "content": "The Human Brain: Unraveling Its Mysteries"
    },
    {
        "topic": "technology",
        "content": "The Future of Artificial Intelligence: Possibilities and Risks"
    },
    {
        "topic": "technology",
        "content": "Blockchain Beyond Bitcoin: Revolutionary Uses"
    },
    {
        "topic": "technology",
        "content": "The Rise of Quantum Computing: What You Need to Know"
    },
    {
        "topic": "business",
        "content": "The Psychology Behind Consumer Behavior"
    },
    {
        "topic": "business",
        "content": "Start-Up Culture: The New Face of Global Business"
    },
    {
        "topic": "business",
        "content": "E-commerce Evolution: From Books to Everything"
    },
    {
        "topic": "politics",
        "content": "The Role of Social Media in Modern Politics"
    },
    {
        "topic": "politics",
        "content": "Climate Policy: The New Frontier in Global Diplomacy"
    },
    {
        "topic": "politics",
        "content": "Understanding the Electoral College in US Elections"
    },
    {
        "topic": "medicine",
        "content": "The Race for a Malaria Vaccine: Progress and Challenges"
    },
    {
        "topic": "medicine",
        "content": "Personalized Medicine: Tailoring Treatment to Your Genes"
    },
    {
        "topic": "medicine",
        "content": "The Future of Telemedicine: Healthcare at Your Fingertips"
    },
    {
        "topic": "sports",
        "content": "The Science Behind High-Performance Athletics"
    },
    {
        "topic": "sports",
        "content": "The Rise of Esports: From Niche to Mainstream"
    },
    {
        "topic": "sports",
        "content": "Women in Sports: Breaking Barriers and Setting Records"
    },
    {
        "topic": "style and beauty",
        "content": "The Evolution of Fashion: From the 1920s to Today"
    },
    {
        "topic": "style and beauty",
        "content": "Sustainable Fashion: A Movement or a Trend?"
    },
    {
        "topic": "style and beauty",
        "content": "The Psychology of Makeup: More Than Skin Deep"
    },
    {
        "topic": "food and drinks",
        "content": "The World of Fermented Foods: Health and Taste Combined"
    },
    {
        "topic": "food and drinks",
        "content": "The Art of Wine Tasting: A Beginner's Guide"
    },
    {
        "topic": "food and drinks",
        "content": "Exploring Street Foods Around the Globe"
    },
    {
        "topic": "health and fitness",
        "content": "The Science of Sleep: Why It's Essential for Health"
    },
    {
        "topic": "health and fitness",
        "content": "Yoga for Mental Health: Beyond Physical Fitness"
    },
    {
        "topic": "health and fitness",
        "content": "Intermittent Fasting: Fad or Future of Nutrition?"
    },
    {
        "topic": "law",
        "content": "Cyber Law: Protecting Yourself in the Digital Age"
    },
    {
        "topic": "law",
        "content": "The Evolution of Human Rights Law Globally"
    },
    {
        "topic": "law",
        "content": "Intellectual Property: Balancing Creativity and Commerce"
    },
    {
        "topic": "law",
        "content": "Why do we need Copyright?"
    },


    // Start of generated topics

    {
        "content": "The Symbiotic Relationships Between Clownfish and Sea Anemones",
        "topic": "animals"
    },
    {
        "content": "The Ingenious Camouflage Tactics of the Cuttlefish",
        "topic": "animals"
    },
    {
        "content": "The Social Dynamics of Wolf Packs in the Wild",
        "topic": "animals"
    },
    {
        "content": "The Remarkable Navigation Skills of Homing Pigeons",
        "topic": "animals"
    },
    {
        "content": "The Role of Elephants as Ecosystem Engineers in the Savanna",
        "topic": "animals"
    },
    {
        "content": "The Mysterious Bioluminescence of Fireflies on Warm Summer Nights",
        "topic": "animals"
    },
    {
        "content": "The Evolutionary Journey of Flightless Birds: From Ostriches to Penguins",
        "topic": "animals"
    },
    {
        "content": "The Cognitive Abilities and Problem-Solving Skills of Cephalopods",
        "topic": "animals"
    },
    {
        "content": "The Impact of Urban Environments on the Behavioral Adaptations of Foxes",
        "topic": "animals"
    },
    {
        "content": "The Conservation Success Stories: Species Brought Back from the Brink of Extinction",
        "topic": "animals"
    },
    {
        "content": "Underwater Wonders: Scuba Diving in the Coral Triangle",
        "topic": "tourism and travel"
    },
    {
        "content": "Gastronomic Adventures: A Culinary Tour of Peru's Fusion Cuisine",
        "topic": "tourism and travel"
    },
    {
        "content": "Chasing Aurora: The Best Spots to Witness the Northern Lights",
        "topic": "tourism and travel"
    },
    {
        "content": "Eco-Friendly Escapes: Sustainable Tourism in Costa Rica",
        "topic": "tourism and travel"
    },
    {
        "content": "Castles in the Sky: Discovering Europe's Most Enchanting Hilltop Fortresses",
        "topic": "tourism and travel"
    },
    {
        "content": "The Art of Slow Travel: Embracing the Journey on the Trans-Siberian Railway",
        "topic": "tourism and travel"
    },
    {
        "content": "Wildlife Encounters: Ethical Safari Experiences in the Serengeti",
        "topic": "tourism and travel"
    },
    {
        "content": "Mystical Retreats: Spiritual Journeys to Asia's Sacred Mountains",
        "topic": "tourism and travel"
    },
    {
        "content": "Vintage Voyages: Exploring the World's Classic Car Rallies",
        "topic": "tourism and travel"
    },
    {
        "content": "Synthetic Biology: Crafting Life with Engineering",
        "topic": "science"
    },
    {
        "content": "Quantum Computing: Harnessing the Power of the Subatomic",
        "topic": "science"
    },
    {
        "content": "The Microbiome Frontier: How Tiny Organisms Influence Our Lives",
        "topic": "science"
    },
    {
        "content": "Dark Matter and Dark Energy: Deciphering the Invisible Universe",
        "topic": "science"
    },
    {
        "content": "CRISPR and Gene Editing: The Future of Genetic Medicine",
        "topic": "science"
    },
    {
        "content": "Artificial Intelligence: The Path to Synthetic Consciousness",
        "topic": "science"
    },
    {
        "content": "Astrobiology: The Search for Extraterrestrial Life Forms",
        "topic": "science"
    },
    {
        "content": "Nanotechnology: Manipulating Matter at the Molecular Level",
        "topic": "science"
    },
    {
        "content": "The Science of Aging: Extending Lifespan and Enhancing Health",
        "topic": "science"
    },
    {
        "content": "Fusion Energy: The Pursuit of a Clean, Infinite Power Source",
        "topic": "science"
    },
    {
        "content": "The Mysterious Navigation Techniques of Migratory Birds Across Continents",
        "topic": "animals"
    },
    {
        "content": "The Secret Lives of Deep-Sea Creatures and Bioluminescence",
        "topic": "animals"
    },
    {
        "content": "The Complex Social Structures of Meerkat Colonies",
        "topic": "animals"
    },
    {
        "content": "The Evolutionary Marvel of the Giraffe's Long Neck",
        "topic": "animals"
    },
    {
        "content": "The Remarkable Regenerative Powers of the Axolotl",
        "topic": "animals"
    },
    {
        "content": "The Thriving Ecosystems of Coral Reefs and Their Fragility",
        "topic": "animals"
    },
    {
        "content": "The Enigmatic Courtship Rituals of Birds of Paradise",
        "topic": "animals"
    },
    {
        "content": "The Impact of Urban Environments on Wildlife Adaptation",
        "topic": "animals"
    },
    {
        "content": "The Coexistence of Wolves and Humans: Conflict and Conservation",
        "topic": "animals"
    },
    {
        "content": "Neuroprosthetics: Bridging the Gap Between Brain and Machine",
        "topic": "medicine"
    },
    {
        "content": "The Microbiome Frontier: Harnessing Gut Bacteria for Better Health",
        "topic": "medicine"
    },
    {
        "content": "Revolutionizing Organ Transplants: The Promise of 3D Bioprinting",
        "topic": "medicine"
    },
    {
        "content": "Nanomedicine: The Tiny Architects of Drug Delivery and Healing",
        "topic": "medicine"
    },
    {
        "content": "The Quest for Longevity: Unraveling the Secrets of Aging",
        "topic": "medicine"
    },
    {
        "content": "Virtual Reality Therapy: A New Dimension in Mental Health Treatment",
        "topic": "medicine"
    },
    {
        "content": "The Ethics of Gene Editing: CRISPR and the Future of Human Evolution",
        "topic": "medicine"
    },
    {
        "content": "Combating Antibiotic Resistance: The Search for Superbug Solutions",
        "topic": "medicine"
    },
    {
        "content": "The Impact of Climate Change on Infectious Diseases",
        "topic": "medicine"
    },
    {
        "content": "Artificial Intelligence in Diagnosis: A New Era of Medical Precision",
        "topic": "medicine"
    },
    {
        "content": "Neurobics for Cognitive Fitness: Brain Exercises to Keep Your Mind Sharp",
        "topic": "health and fitness"
    },
    {
        "content": "The Gut-Brain Connection: How Probiotics Enhance Mental Wellbeing",
        "topic": "health and fitness"
    },
    {
        "content": "Virtual Reality Workouts: The Future of Home Fitness",
        "topic": "health and fitness"
    },
    {
        "content": "Forest Bathing: The Healing Power of Nature on Your Wellbeing",
        "topic": "health and fitness"
    },
    {
        "content": "The Role of Genomics in Personalized Fitness Regimens",
        "topic": "health and fitness"
    },
    {
        "content": "Plant-Powered Athletes: Debunking Myths About Veganism in Sports",
        "topic": "health and fitness"
    },
    {
        "content": "The Benefits of Cold Exposure: From Cryotherapy to Ice Baths",
        "topic": "health and fitness"
    },
    {
        "content": "Dance Movement Therapy: Emotional Healing Through Body Movement",
        "topic": "health and fitness"
    },
    {
        "content": "Biohacking Your Life: Strategies for Enhancing Your Biological Potential",
        "topic": "health and fitness"
    },
    {
        "content": "Mindful Eating: The Art of Presence in Nutrition",
        "topic": "health and fitness"
    },
    {
        "content": "Underwater Endeavors: The Thrill of Competitive Freediving",
        "topic": "sports"
    },
    {
        "content": "The Art of Chess Boxing: Strategy Meets Physicality",
        "topic": "sports"
    },
    {
        "content": "Extreme Unicycling: Balancing on the Edge of Adventure",
        "topic": "sports"
    },
    {
        "content": "The Psychology of Sports Rivalries: More Than Just a Game",
        "topic": "sports"
    },
    {
        "content": "Eco-Friendly Athletics: The Rise of Green Sports Initiatives",
        "topic": "sports"
    },
    {
        "content": "The Evolution of Parkour: Urban Landscape as a Playground",
        "topic": "sports"
    },
    {
        "content": "Cultural Sports Around the Globe: Exploring Indigenous Games",
        "topic": "sports"
    },
    {
        "content": "The Future of Biotechnology in Enhancing Athletic Performance",
        "topic": "sports"
    },
    {
        "content": "Mind Over Marathon: The Mental Strategies of Long-Distance Runners",
        "topic": "sports"
    },
    {
        "content": "The Integration of Virtual Reality in Sports Training and Fan Experience",
        "topic": "sports"
    },
    {
        "content": "The Symphony of Colors: Exploring the Psychology Behind Color in Painting",
        "topic": "art and culture"
    },
    {
        "content": "Dancing Through History: How Traditional Dances Reflect Cultural Identity",
        "topic": "art and culture"
    },
    {
        "content": "The Art of Storytelling: From Cave Paintings to Modern Comics",
        "topic": "art and culture"
    },
    {
        "content": "The Evolution of Puppetry: An Ancient Art Form in the Modern World",
        "topic": "art and culture"
    },
    {
        "content": "The Cultural Tapestry of Tattoos: Meanings and Practices Across Societies",
        "topic": "art and culture"
    },
    {
        "content": "The Alchemy of Glassblowing: A Dance Between Fire and Artistry",
        "topic": "art and culture"
    },
    {
        "content": "The Enigma of Performance Art: Pushing the Boundaries of Expression",
        "topic": "art and culture"
    },
    {
        "content": "The Lost Languages of Art: Deciphering Ancient Scripts and Symbols",
        "topic": "art and culture"
    },
    {
        "content": "The Sonic Palette: A Journey Through the History of Musical Instruments",
        "topic": "art and culture"
    },
    {
        "content": "The Art of Scent: Perfumery as a Form of Cultural Expression",
        "topic": "art and culture"
    },
    {
        "content": "The Thriving Ecosystems Inside the Pitcher Plant",
        "topic": "animals"
    },
    {
        "content": "The Cognitive Abilities and Problem-Solving of Crows",
        "topic": "animals"
    },
    {
        "content": "The Underwater Ballet: The Mating Rituals of Seahorses",
        "topic": "animals"
    },
    {
        "content": "The Architectural Wonders of Termite Mounds",
        "topic": "animals"
    },
    {
        "content": "The Survival Strategies of Tardigrades in Extreme Environments",
        "topic": "animals"
    },
    {
        "content": "The Rise of Cyber Sovereignty and Its Impact on International Relations",
        "topic": "politics"
    },
    {
        "content": "Universal Basic Income: A Solution to Automation-Induced Unemployment?",
        "topic": "politics"
    },
    {
        "content": "Space Policy and the Geopolitics of the Final Frontier",
        "topic": "politics"
    },
    {
        "content": "The Influence of Artificial Intelligence on Policy Making and Governance",
        "topic": "politics"
    },
    {
        "content": "Political Movements in the Digital Age: From Hashtags to Street Protests",
        "topic": "politics"
    },
    {
        "content": "The Ethics of Political Campaign Financing: Democracy for Sale?",
        "topic": "politics"
    },
    {
        "content": "Youth Quotas in Government: A Step Towards Inclusive Representation or Tokenism?",
        "topic": "politics"
    },
    {
        "content": "The Intersection of Trade Wars and National Security",
        "topic": "politics"
    },
    {
        "content": "Cultural Diplomacy and Soft Power in the 21st Century",
        "topic": "politics"
    },
    {
        "content": "The Politics of Pandemics: Public Health Meets Policy",
        "topic": "politics"
    },
    {
        "content": "Climate Diplomacy: How Environmental Changes are Reshaping Global Alliances",
        "topic": "politics"
    },
    {
        "content": "The Ethics of Political Deepfakes: Democracy in the Age of Synthetic Media",
        "topic": "politics"
    },
    {
        "content": "Political Implications of the Metaverse: Governance and Regulation in Virtual Worlds",
        "topic": "politics"
    },
    {
        "content": "The New Space Race: Mining Asteroids and the Legal Battle for Extraterrestrial Resources",
        "topic": "politics"
    },
    {
        "content": "Artificial Intelligence in Government: The Future of Policy Making and Public Services",
        "topic": "politics"
    },
    {
        "content": "Water Wars: The Tension Over Freshwater Resources in International Relations",
        "topic": "politics"
    },
    {
        "content": "The Impact of Digital Nomadism on National Economies and Immigration Policies",
        "topic": "politics"
    },
    {
        "content": "Cultural Heritage in Conflict Zones: The Role of Politics in Protecting World Heritage",
        "topic": "politics"
    },
    {
        "content": "The Green New Deal and the Future of Work: Transitioning to a Sustainable Economy",
        "topic": "politics"
    },
    {
        "content": "Deciphering the Rosetta Stone: How Ancient Languages Were Unlocked",
        "topic": "languages"
    },
    {
        "content": "The Secret Languages of Spies: Cryptography and Linguistics",
        "topic": "languages"
    },
    {
        "content": "The Language of Whistles: Understanding Silbo Gomero",
        "topic": "languages"
    },
    {
        "content": "The Revival of Dead Languages: From Latin to Manx",
        "topic": "languages"
    },
    {
        "content": "The Linguistics of Alien Communication: Constructing Languages for Sci-Fi",
        "topic": "languages"
    },
    {
        "content": "The Role of Pidgins and Creoles in Language Evolution",
        "topic": "languages"
    },
    {
        "content": "The Art of Translation: Conveying Humor Across Cultures",
        "topic": "languages"
    },
    {
        "content": "Sign Languages Around the World: More Than Just Hand Gestures",
        "topic": "languages"
    },
    {
        "content": "The Influence of Internet Slang on Modern Dialects",
        "topic": "languages"
    },
    {
        "content": "Unraveling the Mysteries of the Voynich Manuscript's Language",
        "topic": "languages"
    },
    {
        "content": "Circadian Rhythms and Exercise Timing: Maximizing Workout Effectiveness",
        "topic": "health and fitness"
    },
    {
        "content": "Neuroplasticity and Movement: How Exercise Shapes Your Brain",
        "topic": "health and fitness"
    },
    {
        "content": "The Science of Hydration: Beyond the Eight-Glasses-a-Day Myth",
        "topic": "health and fitness"
    },
    {
        "content": "Altitude Training at Home: Can Simulated Environments Improve Athletic Performance?",
        "topic": "health and fitness"
    },
    {
        "content": "The Anti-Inflammatory Diet: Sorting Fact from Fiction in Reducing Muscle Soreness",
        "topic": "health and fitness"
    },
    {
        "content": "Fitness Philanthropy: Combining Charity Work with Physical Challenges",
        "topic": "health and fitness"
    },
    {
        "content": "The Evolution of Wearable Fitness Technology: From Pedometers to Smart Apparel",
        "topic": "health and fitness"
    },
    {
        "content": "The Rise and Fall of the Library of Alexandria",
        "topic": "history"
    },
    {
        "content": "The Secret Societies of the Renaissance: Power and Intrigue",
        "topic": "history"
    },
    {
        "content": "The Forgotten Wonders: Lesser-Known Marvels of the Ancient World",
        "topic": "history"
    },
    {
        "content": "The Great Emu War of Australia: An Unconventional Battle",
        "topic": "history"
    },
    {
        "content": "The Culper Spy Ring and the American Revolution: Espionage that Shaped a Nation",
        "topic": "history"
    },
    {
        "content": "The Lost Expedition of Sir John Franklin: A Tale of Arctic Mystery",
        "topic": "history"
    },
    {
        "content": "The Transformation of the Samurai: From Warriors to Philosophers",
        "topic": "history"
    },
    {
        "content": "The Witch Trials Beyond Salem: A Global Perspective on Witch Hunts",
        "topic": "history"
    },
    {
        "content": "The Defenestration of Prague and the Spark of the Thirty Years' War",
        "topic": "history"
    },
    {
        "content": "Exploring the Metaverse: How Virtual Worlds are Shaping Our Reality",
        "topic": "technology"
    },
    {
        "content": "The Era of Biohacking: Merging Man with Machine",
        "topic": "technology"
    },
    {
        "content": "Harnessing the Power of Neuromorphic Computing: The Brain-Inspired Chips",
        "topic": "technology"
    },
    {
        "content": "The Dawn of Autonomous Societies: AI Governance and Ethics",
        "topic": "technology"
    },
    {
        "content": "Revolutionizing Mobility: The Advent of Flying Cars and Drones",
        "topic": "technology"
    },
    {
        "content": "The Next Dimension of Data Storage: DNA as the Ultimate Hard Drive",
        "topic": "technology"
    },
    {
        "content": "Smart Cities and IoT: Building the Urban Ecosystems of Tomorrow",
        "topic": "technology"
    },
    {
        "content": "The Role of Nanotechnology in Advancing Healthcare",
        "topic": "technology"
    },
    {
        "content": "The Impact of Augmented Reality on Education and Training",
        "topic": "technology"
    },
    {
        "content": "The Race for Space Internet: Connecting the Unconnected",
        "topic": "technology"
    },
    {
        "content": "Futuristic Fabrics: The Role of Technology in Tomorrow's Wardrobe",
        "topic": "style and beauty"
    },
    {
        "content": "Cultural Couture: How Traditional Attires Influence Modern Fashion",
        "topic": "style and beauty"
    },
    {
        "content": "Beauty in Diversity: Celebrating Inclusivity in the Cosmetics Industry",
        "topic": "style and beauty"
    },
    {
        "content": "The Renaissance of Vintage: Why Retro Styles are Reclaiming the Spotlight",
        "topic": "style and beauty"
    },
    {
        "content": "Eco-Chic: The Rise of Biodegradable Beauty Products",
        "topic": "style and beauty"
    },
    {
        "content": "Fashion on the Silver Screen: How Cinema Shapes Our Style Choices",
        "topic": "style and beauty"
    },
    {
        "content": "The Secret Language of Jewelry: What Your Pieces Say About You",
        "topic": "style and beauty"
    },
    {
        "content": "Mindful Beauty: The Intersection of Wellness and Aesthetics",
        "topic": "style and beauty"
    },
    {
        "content": "The Metamorphosis of Men's Fashion: Breaking Stereotypes and Redefining Masculinity",
        "topic": "style and beauty"
    },
    {
        "content": "Space Politics: The Geopolitics of Extraterrestrial Territory Claims",
        "topic": "politics"
    },
    {
        "content": "The Influence of Digital Media on Public Opinion and Political Movements",
        "topic": "politics"
    },
    {
        "content": "Universal Basic Income: A Political and Economic Panacea or a Pipe Dream?",
        "topic": "politics"
    },
    {
        "content": "Water Wars: The Tensions and Politics Surrounding Global Water Scarcity",
        "topic": "politics"
    },
    {
        "content": "The Green New Deal: Political Gimmick or a Roadmap to Sustainable Future?",
        "topic": "politics"
    },
    {
        "content": "The Intersection of Blockchain Technology and Electoral Integrity",
        "topic": "politics"
    },
    {
        "content": "Political Implications of the Rise of Virtual Nations and Digital Citizenship",
        "topic": "politics"
    },
    {
        "content": "The Future of Work: Political Responses to the Automation and Gig Economy",
        "topic": "politics"
    },
    {
        "content": "The Alchemy of Coffee: From Bean to Brew and Beyond",
        "topic": "food and drinks"
    },
    {
        "content": "The Rise of Plant-Based Cuisine: Innovations and Earth-Friendly Eats",
        "topic": "food and drinks"
    },
    {
        "content": "The Renaissance of Ancient Grains in Modern Cooking",
        "topic": "food and drinks"
    },
    {
        "content": "The Secret Life of Spices: How to Master the Spice Rack",
        "topic": "food and drinks"
    },
    {
        "content": "The Cultural Tapestry of Tea: Ceremonies, Types, and Brewing Techniques",
        "topic": "food and drinks"
    },
    {
        "content": "Zero Gravity Games: The Future of Sports in Space",
        "topic": "sports"
    },
    {
        "content": "The Art of eSports: The Rise of Competitive Gaming Cultures",
        "topic": "sports"
    },
    {
        "content": "The Ballet of the Gridiron: How Dance Influences Football Footwork",
        "topic": "sports"
    },
    {
        "content": "Virtual Reality Training: The New Frontier in Athletic Preparation",
        "topic": "sports"
    },
    {
        "content": "The Renaissance of Roller Derby: Empowerment on Eight Wheels",
        "topic": "sports"
    },
    {
        "content": "Climbing for Change: How Mountaineering Can Drive Social Impact",
        "topic": "sports"
    },
    {
        "content": "The Silent Symphony: Exploring the World of Competitive Chess Boxing",
        "topic": "sports"
    },
    {
        "content": "Pedals and Pixels: The Intersection of Cycling and Video Game Technology",
        "topic": "sports"
    },
    {
        "content": "The Gastronomy of Grit: Nutritional Innovations Fueling Extreme Athletes",
        "topic": "sports"
    },
    {
        "content": "Underwater Wonders: A Guide to the World's Best Scuba Diving Sites",
        "topic": "tourism and travel"
    },
    {
        "content": "Culinary Pilgrimages: Exploring Culture Through Traditional Cuisines",
        "topic": "tourism and travel"
    },
    {
        "content": "Stargazing Escapes: Top Destinations for Astrotourism Enthusiasts",
        "topic": "tourism and travel"
    },
    {
        "content": "Voluntourism Ventures: Combining Travel with Making a Difference",
        "topic": "tourism and travel"
    },
    {
        "content": "Hidden Gems: Unveiling the Secrets of Lesser-Known Tourist Spots",
        "topic": "tourism and travel"
    },
    {
        "content": "Digital Nomad Destinations: The Best Places to Work and Wander",
        "topic": "tourism and travel"
    },
    {
        "content": "Time Travel Tourism: Visiting Locations Steeped in History and Mystery",
        "topic": "tourism and travel"
    },
    {
        "content": "Extreme Adventures: Tackling the Most Thrilling Activities Around the Globe",
        "topic": "tourism and travel"
    },
    {
        "content": "Wellness Retreats: Finding Serenity in the Most Tranquil Spots on Earth",
        "topic": "tourism and travel"
    },
    {
        "content": "Cultural Festivals Around the World: A Guide to Immersive Experiences",
        "topic": "tourism and travel"
    },
    {
        "content": "Gastronomic Stars: A Culinary Journey Through Michelin-Starred Restaurants in France",
        "topic": "tourism and travel"
    },
    {
        "content": "Underwater Wonders: Snorkeling with Bioluminescent Plankton in the Maldives",
        "topic": "tourism and travel"
    },
    {
        "content": "Time-Traveler's Itinerary: Visiting the World's Best-Preserved Medieval Towns",
        "topic": "tourism and travel"
    },
    {
        "content": "Sky-High Solitude: A Guide to the World's Most Secluded Mountain Retreats",
        "topic": "tourism and travel"
    },
    {
        "content": "Festival of Colors: Experiencing Holi with the Locals in Vrindavan, India",
        "topic": "tourism and travel"
    },
    {
        "content": "Northern Lights and Nights: Chasing the Aurora in a Luxury Glass Igloo in Finland",
        "topic": "tourism and travel"
    },
    {
        "content": "Desert Oases and Ancient Routes: Camel Trekking Along the Silk Road",
        "topic": "tourism and travel"
    },
    {
        "content": "Island Hopping with a Twist: Sailing the Lesser-Known Greek Isles",
        "topic": "tourism and travel"
    },
    {
        "content": "The Art of Slow Travel: Scenic Train Journeys Across New Zealand's Landscapes",
        "topic": "tourism and travel"
    },
    {
        "content": "Mystical Ruins and Myths: An Archaeological Adventure in Peru's Sacred Valley",
        "topic": "tourism and travel"
    },
    {
        "content": "Space Governance: The New Frontier in International Relations and Policy Making",
        "topic": "politics"
    },
    {
        "content": "Climate Refugees: The Escalating Crisis at the Intersection of Environment and Human Rights",
        "topic": "politics"
    },
    {
        "content": "The Political Economy of Artificial Intelligence: Regulating Tech Giants and Protecting Citizens",
        "topic": "politics"
    },
    {
        "content": "The Impact of Deepfakes on Democracy and Electoral Integrity",
        "topic": "politics"
    },
    {
        "content": "The Role of Indigenous Wisdom in Shaping Environmental Policy",
        "topic": "politics"
    },
    {
        "content": "Smart Cities and Surveillance: The Politics of Urban Data Collection and Privacy",
        "topic": "politics"
    },
    {
        "content": "The Role of Cryptocurrencies in Shaping Future Political Campaign Financing",
        "topic": "politics"
    },
    {
        "content": "Bioethics and Biopolitics: The Political Implications of Human Genetic Engineering",
        "topic": "politics"
    },
    {
        "content": "The Geopolitics of Internet Censorship: Balancing National Security and Digital Freedom",
        "topic": "politics"
    },
    {
        "content": "The Political Consequences of Universal Basic Income Experiments Around the World",
        "topic": "politics"
    },
    {
        "content": "Cyber Warfare and International Law: The Need for New Norms in Digital Conflict",
        "topic": "politics"
    },
    {
        "content": "The Influence of Youth Movements on Policy Reforms in the Age of Social Media",
        "topic": "politics"
    },
    {
        "content": "The Intersection of Augmented Reality and Privacy Laws in Surveillance Societies",
        "topic": "politics"
    },
    {
        "content": "The Complex Language and Culture of Orcas",
        "topic": "animals"
    },
    {
        "content": "The Architectural Wonders of Bowerbird Nests",
        "topic": "animals"
    },
    {
        "content": "The Impact of Urban Environments on Birdsong Evolution",
        "topic": "animals"
    },
    {
        "content": "The Role of Play Behavior in Predator-Prey Dynamics",
        "topic": "animals"
    },
    {
        "content": "The Role of Virtual Reality in Shaping Future Political Campaigns",
        "topic": "politics"
    },
    {
        "content": "The Ethics of Political Microtargeting in the Age of Big Data",
        "topic": "politics"
    },
    {
        "content": "Space Exploration and Territorial Claims: The New Frontier in International Relations",
        "topic": "politics"
    },
    {
        "content": "The Geopolitics of Renewable Energy: Shifting Alliances and New Power Blocs",
        "topic": "politics"
    },
    {
        "content": "Youth Activism and the Rejuvenation of Democratic Participation",
        "topic": "politics"
    },
    {
        "content": "The Future of Supranational Unions: Post-Brexit Lessons for Global Cooperation",
        "topic": "politics"
    },
    {
        "content": "The Alchemy of Scent: Crafting Personal Fragrance as a Form of Self-Expression and Memory-Making",
        "topic": "style and beauty"
    },
    {
        "content": "Digital Dressing: How Virtual Reality is Reshaping the Fashion Experience",
        "topic": "style and beauty"
    },
    {
        "content": "Fashion's Time Machine: The Revival and Reinterpretation of Vintage Trends",
        "topic": "style and beauty"
    },
    {
        "content": "The Beauty of Imperfection: Wabi-Sabi and the Appreciation of Natural Aesthetics in Personal Care",
        "topic": "style and beauty"
    },
    {
        "content": "The Power of Makeup in Performance Art: Transformations and Identity",
        "topic": "style and beauty"
    },
    {
        "content": "Exploring Quantum Entanglement: Communication Beyond Space and Time",
        "topic": "science"
    },
    {
        "content": "Neuroplasticity: Rewiring the Brain for Better or Worse",
        "topic": "science"
    },
    {
        "content": "The Search for Earth-like Exoplanets: Unveiling Alien Worlds",
        "topic": "science"
    },
    {
        "content": "Harnessing Fusion Power: The Race to Mimic the Sun",
        "topic": "science"
    },
    {
        "content": "The Enigma of Consciousness: Deciphering the Mind's Complexities",
        "topic": "science"
    },
    {
        "content": "Climate Engineering: The Controversial Quest to Control Earth's Climate",
        "topic": "science"
    },
    {
        "content": "Eco-Chic: Embracing Sustainable Materials in High Fashion",
        "topic": "style and beauty"
    },
    {
        "content": "The Art of Illusion: Makeup Techniques for Altering Facial Features",
        "topic": "style and beauty"
    },
    {
        "content": "Beauty in Bloom: Botanical Ingredients Revolutionizing Skincare",
        "topic": "style and beauty"
    },
    {
        "content": "The Renaissance of Thrift: Vintage Shopping as a Style Statement",
        "topic": "style and beauty"
    },
    {
        "content": "Chromotherapy: The Psychological Impact of Color in Wardrobe Choices",
        "topic": "style and beauty"
    },
    {
        "content": "The Tailored Touch: Custom Clothing in an Era of Mass Production",
        "topic": "style and beauty"
    },
    {
        "content": "From Catwalk to Sidewalk: Translating High Fashion into Everyday Wear",
        "topic": "style and beauty"
    },
    {
        "content": "The Ethereal Aesthetic: Incorporating Fantasy Elements into Daily Attire",
        "topic": "style and beauty"
    },
    {
        "content": "Ageless Style: Fashion and Beauty Across the Generations",
        "topic": "style and beauty"
    },
    {
        "content": "Neuroprosthetics: Blending Mind and Machine for Sensory Restoration",
        "topic": "technology"
    },
    {
        "content": "The Era of Personal Satellites: Democratizing Space for Micro-Research",
        "topic": "technology"
    },
    {
        "content": "The Evolution of Humanoid Robots: From Factory Floors to Family Members",
        "topic": "technology"
    },
    {
        "content": "Augmented Reality in Education: Transforming the Classroom Experience",
        "topic": "technology"
    },
    {
        "content": "Blockchain Beyond Cryptocurrency: Disrupting Industries with Decentralized Trust",
        "topic": "technology"
    },
    {
        "content": "The Intersection of Genomics and AI: Personalized Medicine and Beyond",
        "topic": "technology"
    },
    {
        "content": "Wireless Power Transmission: Cutting the Cord for a New Energy Paradigm",
        "topic": "technology"
    },
    {
        "content": "The Advent of Emotional AI: Machines That Understand Human Feelings",
        "topic": "technology"
    },
    {
        "content": "Quantum Computing: Breaking the Boundaries of Processing Power",
        "topic": "science"
    },
    {
        "content": "Neuroprosthetics: Merging Machine and Mind for Medical Miracles",
        "topic": "science"
    },
    {
        "content": "Artificial Photosynthesis: A Leap Towards Sustainable Energy",
        "topic": "science"
    },
    {
        "content": "Antimatter: The Puzzling Particle and its Implications for Physics",
        "topic": "science"
    },
    {
        "content": "The Rise of Citizen Science: Empowering Public Participation in Research",
        "topic": "science"
    },
    {
        "content": "The Evolution of Emoji Language: From Simple Icons to Complex Communication Tools",
        "topic": "languages"
    },
    {
        "content": "Deciphering the Whistles of Silbo Gomero: The Whistled Language of the Canary Islands",
        "topic": "languages"
    },
    {
        "content": "The Linguistic Landscape of Virtual Reality: Constructing Language in Digital Worlds",
        "topic": "languages"
    },
    {
        "content": "The Language of Flowers: Botanical Linguistics and Symbolism",
        "topic": "languages"
    },
    {
        "content": "The Syntax of Silence: How Absence of Sound Conveys Meaning",
        "topic": "languages"
    },
    {
        "content": "The Linguistic Puzzles of Palindromes: Language Symmetry and Its Curiosities",
        "topic": "languages"
    },
    {
        "content": "The Role of Language in Artificial Intelligence: Teaching Machines to Communicate",
        "topic": "languages"
    },
    {
        "content": "The Sociolects of Social Media: How Online Communities Create New Dialects",
        "topic": "languages"
    },
    {
        "content": "The Language of the Skies: Understanding Aviation Communication",
        "topic": "languages"
    },
    {
        "content": "The Linguistic Tapestry of J.R.R. Tolkien: Constructing Elvish and Other Middle-Earth Languages",
        "topic": "languages"
    },
    {
        "content": "The Intricacies of Politeness: How Different Cultures Express Courtesy Through Language",
        "topic": "languages"
    },
    {
        "content": "The Rise of Emoji: Analyzing the Visual Language of Digital Communication",
        "topic": "languages"
    },
    {
        "content": "The Sonic Palette: Understanding the Role of Phonetics in Constructing Fictional Languages",
        "topic": "languages"
    },
    {
        "content": "The Language of the Skies: How Air Traffic Controllers Communicate Across Borders",
        "topic": "languages"
    },
    {
        "content": "The Grammar of Dance: Exploring Movement as a Form of Unspoken Dialogue",
        "topic": "languages"
    },
    {
        "content": "The Enigma of Basque: Unraveling the Mystery of Europe's Oldest Surviving Language",
        "topic": "languages"
    },
    {
        "content": "The Language of Gastronomy: How Culinary Terms Reflect Cultural Identity",
        "topic": "languages"
    },
    {
        "content": "The Alphabets of the World: A Journey Through Scripts and Their Histories",
        "topic": "languages"
    },
    {
        "content": "The Legal Implications of Artificial Intelligence: Accountability in the Age of Autonomy",
        "topic": "law"
    },
    {
        "content": "Space Law: Navigating the Final Frontier of International Treaties and Private Enterprise",
        "topic": "law"
    },
    {
        "content": "The Rise of Legal Tech: How Innovation is Shaping the Future of the Legal Profession",
        "topic": "law"
    },
    {
        "content": "Oceanic Preservation Acts: Safeguarding Our Seas Through International Law",
        "topic": "law"
    },
    {
        "content": "The Right to be Forgotten: Privacy and Data in the Era of Endless Information",
        "topic": "law"
    },
    {
        "content": "Climate Change Litigation: Holding Corporations Accountable for Environmental Impact",
        "topic": "law"
    },
    {
        "content": "The Intersection of Genetics and Law: Ethical Dilemmas in the Biotech Age",
        "topic": "law"
    },
    {
        "content": "Animal Rights and Legal Personhood: Redefining Welfare Laws for Non-Human Entities",
        "topic": "law"
    },
    {
        "content": "Cultural Heritage Protection: Combating Art Trafficking and Historical Plunder",
        "topic": "law"
    },
    {
        "content": "The Gig Economy and Labor Law: Redefining Employment in the 21st Century",
        "topic": "law"
    },
    {
        "content": "Neurobics for Cognitive Fitness: Brain-Boosting Workouts Beyond the Sudoku",
        "topic": "health and fitness"
    },
    {
        "content": "The Intersection of Gaming and Fitness: How VR is Shaping the Future of Exercise",
        "topic": "health and fitness"
    },
    {
        "content": "Aquatic Agility: Exploring the Benefits of Underwater Resistance Training",
        "topic": "health and fitness"
    },
    {
        "content": "The Science of Stretching: How Flexibility Affects Your Overall Wellbeing",
        "topic": "health and fitness"
    },
    {
        "content": "Biohacking Your Body: Personalized Nutrition and Fitness Through Genetic Testing",
        "topic": "health and fitness"
    },
    {
        "content": "The Role of Microbiome Diversity in Athletic Performance and Recovery",
        "topic": "health and fitness"
    },
    {
        "content": "Mindfulness Marathons: The Mental Health Benefits of Long-Distance Running",
        "topic": "health and fitness"
    },
    {
        "content": "Recovery Tech: The Latest Innovations in Muscle Repair and Pain Management",
        "topic": "health and fitness"
    },
    {
        "content": "The Art of Movement: Integrating Dance Therapy into Fitness Regimens for Emotional Balance",
        "topic": "health and fitness"
    },
    {
        "content": "The Secret Diplomacy of the Vatican During World War II",
        "topic": "history"
    },
    {
        "content": "The Lost Libraries of Timbuktu",
        "topic": "history"
    },
    {
        "content": "The Culinary Crusades: How Spices Shaped Empires",
        "topic": "history"
    },
    {
        "content": "The Enigma of the Antikythera Mechanism",
        "topic": "history"
    },
    {
        "content": "The Rise and Fall of the Mughal Gardens",
        "topic": "history"
    },
    {
        "content": "Operation Paperclip: The Covert Extraction of Nazi Scientists",
        "topic": "history"
    },
    {
        "content": "The Forgotten Kingdoms of the Sahel",
        "topic": "history"
    },
    {
        "content": "The Ghost Fleet of Truk Lagoon",
        "topic": "history"
    },
    {
        "content": "The Crypto-Jews and the Spanish Inquisition",
        "topic": "history"
    },
    {
        "content": "The Thrill of Drone Racing: Technology Meets Adrenaline",
        "topic": "sports"
    },
    {
        "content": "The Human Chess Match: Strategy and Psychology in Professional Poker",
        "topic": "sports"
    },
    {
        "content": "The Ballet of Bullfighting: Tradition, Controversy, and Athleticism",
        "topic": "sports"
    },
    {
        "content": "The Gauntlet of Obstacle Course Racing: A Test of Total Fitness",
        "topic": "sports"
    },
    {
        "content": "The Majesty of Mounted Archery: Reviving an Ancient Sport",
        "topic": "sports"
    },
    {
        "content": "The Dance of Fencing: Elegance and Agility in Modern Swordplay",
        "topic": "sports"
    },
    {
        "content": "The Art of Textile Fusion: Blending Traditional Weaves with Modern Fabrics for a Unique Wardrobe Tapestry",
        "topic": "style and beauty"
    },
    {
        "content": "Chroma Chronicles: The Psychological Impact of Color in Fashion and Makeup",
        "topic": "style and beauty"
    },
    {
        "content": "Eco-Chic: Sustainable Beauty Routines that Protect the Planet and Pamper the Skin",
        "topic": "style and beauty"
    },
    {
        "content": "The Renaissance of Rituals: Ancient Beauty Practices for the Modern Soul",
        "topic": "style and beauty"
    },
    {
        "content": "Digital Age Dapper: The Intersection of Technology and Tailoring in Men's Fashion",
        "topic": "style and beauty"
    },
    {
        "content": "The Narrative of Nails: Exploring Self-Expression through Nail Art and Design",
        "topic": "style and beauty"
    },
    {
        "content": "The Botanical Wardrobe: Infusing Plant-Based Dyes and Patterns into Everyday Fashion",
        "topic": "style and beauty"
    },
    {
        "content": "The Sculptural Skin: Innovative Contouring Techniques that Redefine Makeup Artistry",
        "topic": "style and beauty"
    },
    {
        "content": "The Tapestry of Tattoos: Body Art as a Personal Style Statement and Cultural Chronicle",
        "topic": "style and beauty"
    },
    {
        "content": "The Luminous Locks: Exploring the Fusion of Hair Artistry with Light and Technology",
        "topic": "style and beauty"
    }
]


function genTopic(domain) {
    let possibleTopics = []
    for (let i = 0; i < topics.length; i++) {
        if (topics[i].topic === domain || domain === "random") {
            possibleTopics.push(topics[i].content)
        }
    }
    let res = possibleTopics[Math.floor(Math.random() * possibleTopics.length)]
    return res
}

function genTextPrompt(domain, length, difficulty, targetLanguage) {
    let topic = genTopic(domain)
    targetLanguage = codeToLanguage(targetLanguage)

    let difficultyMap2 = {
        "easy": "Please use extremely simple vocabulary (1000 most common words) and keep the sentences extremely short",
        "medium": "Please use simple vocabulary and keep the sentences short",
        "hard": "",
        "very hard": "Please use very advanced vocabulary and complex grammar constructions",
    }


    let messages = [
        {
            "role": "system",
            "content": "Please create a wikipedia-like text about '" + topic + "' in " + targetLanguage + ". " +
                difficultyMap2[difficulty] + ". " +
                "Make the text sound as natural as possible. " +
                "Your text should be " + length + ". " +
                "The text should be in " + targetLanguage + ". "
        },
    ]

    return messages
}

export {genTextPrompt}