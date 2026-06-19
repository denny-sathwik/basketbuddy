// Frontend-Only Configuration for Basket Buddy
// Mock data for demonstration purposes

// Local Storage Keys
const STORAGE_KEYS = {
    cart: 'basketbuddy_cart',
    user: 'basketbuddy_user',
    orders: 'basketbuddy_orders'
};

// Category Icons Mapping
const CATEGORY_ICONS = {
    1: 'fa-carrot',           // Fresh Produce
    2: 'fa-cheese',           // Dairy & Eggs
    3: 'fa-bread-slice',      // Bakery
    4: 'fa-jar',              // Pantry Staples
    5: 'fa-mug-hot',          // Beverages
    6: 'fa-cookie',           // Snacks
    7: 'fa-pump-soap',        // Personal Care
    8: 'fa-spray-can'         // Household
};

// Product placeholder icons
const PRODUCT_ICONS = {
    'Fresh Produce': '🥕',
    'Dairy & Eggs': '🥛',
    'Bakery': '🍞',
    'Pantry Staples': '🌾',
    'Beverages': '☕',
    'Snacks': '🍪',
    'Personal Care': '🧴',
    'Household': '🧹',
    'default': '📦'
};

// Mock Categories Data
const MOCK_CATEGORIES = [
    { id: 1, name: 'Fresh Produce', description: 'Fresh fruits and vegetables', product_count: 45 },
    { id: 2, name: 'Dairy & Eggs', description: 'Milk, cheese, yogurt, and eggs', product_count: 32 },
    { id: 3, name: 'Bakery', description: 'Fresh bread and baked goods', product_count: 28 },
    { id: 5, name: 'Beverages', description: 'Tea, coffee, juices, and drinks', product_count: 38 },
    { id: 6, name: 'Snacks', description: 'Chips, cookies, and snacks', product_count: 42 },
    { id: 7, name: 'Personal Care', description: 'Soaps, shampoos, and toiletries', product_count: 35 },
    { id: 8, name: 'Household', description: 'Cleaning supplies and essentials', product_count: 29 }
];

// Mock Products Data
const MOCK_PRODUCTS = [
    // Fresh Produce
    { id: 1, name: 'Fresh Tomatoes', price: 45, category_id: 1, category_name: 'Fresh Produce', brand: 'Farm Fresh', unit: '1 kg', stock_quantity: 50, avg_rating: 4.5, review_count: 128, description: 'Fresh and juicy tomatoes, perfect for salads and cooking.' },
    { id: 2, name: 'Organic Bananas', price: 60, category_id: 1, category_name: 'Fresh Produce', brand: 'Organic Valley', unit: '1 dozen', stock_quantity: 35, avg_rating: 4.8, review_count: 95, description: 'Naturally ripened organic bananas, rich in potassium.' },
    { id: 3, name: 'Fresh Spinach', price: 30, category_id: 1, category_name: 'Fresh Produce', brand: 'Green Farms', unit: '500g', stock_quantity: 42, avg_rating: 4.3, review_count: 67, description: 'Fresh green spinach leaves, packed with nutrients.' },
    { id: 4, name: 'Red Onions', price: 35, category_id: 1, category_name: 'Fresh Produce', brand: 'Farm Fresh', unit: '1 kg', stock_quantity: 60, avg_rating: 4.2, review_count: 89, description: 'Premium quality red onions for your daily cooking needs.' },
    
    // Dairy & Eggs
    { id: 5, name: 'Fresh Milk', price: 65, category_id: 2, category_name: 'Dairy & Eggs', brand: 'Amul', unit: '1 liter', stock_quantity: 80, avg_rating: 4.7, review_count: 245, description: 'Pure and fresh full cream milk, delivered daily.' },
    { id: 6, name: 'Greek Yogurt', price: 85, category_id: 2, category_name: 'Dairy & Eggs', brand: 'Epigamia', unit: '400g', stock_quantity: 45, avg_rating: 4.6, review_count: 156, description: 'Thick and creamy Greek yogurt, high in protein.' },
    { id: 7, name: 'Farm Fresh Eggs', price: 90, category_id: 2, category_name: 'Dairy & Eggs', brand: 'Keggs', unit: '12 pieces', stock_quantity: 55, avg_rating: 4.8, review_count: 198, description: 'Fresh farm eggs, rich in protein and nutrients.' },
    { id: 8, name: 'Cheddar Cheese', price: 180, category_id: 2, category_name: 'Dairy & Eggs', brand: 'Britannia', unit: '200g', stock_quantity: 30, avg_rating: 4.5, review_count: 112, description: 'Premium quality cheddar cheese, perfect for sandwiches.' },
    
    // Bakery
    { id: 9, name: 'Whole Wheat Bread', price: 45, category_id: 3, category_name: 'Bakery', brand: 'Harvest Gold', unit: '400g', stock_quantity: 65, avg_rating: 4.4, review_count: 178, description: 'Soft and fresh whole wheat bread, baked daily.' },
    { id: 10, name: 'Butter Croissants', price: 120, category_id: 3, category_name: 'Bakery', brand: 'Le Boulanger', unit: '4 pieces', stock_quantity: 25, avg_rating: 4.7, review_count: 89, description: 'Flaky and buttery croissants, freshly baked.' },
    { id: 11, name: 'Chocolate Muffins', price: 95, category_id: 3, category_name: 'Bakery', brand: 'Sweet Treats', unit: '6 pieces', stock_quantity: 38, avg_rating: 4.6, review_count: 134, description: 'Delicious chocolate muffins, perfect for breakfast.' },
    { id: 12, name: 'Garlic Bread', price: 75, category_id: 3, category_name: 'Bakery', brand: 'Italiano', unit: '250g', stock_quantity: 42, avg_rating: 4.5, review_count: 98, description: 'Crispy garlic bread with herbs and butter.' },
    
    // Pantry Staples
    { id: 13, name: 'Basmati Rice', price: 180, category_id: 4, category_name: 'Pantry Staples', brand: 'India Gate', unit: '5 kg', stock_quantity: 75, avg_rating: 4.8, review_count: 312, description: 'Premium aged basmati rice with long grains.' },
    { id: 14, name: 'Whole Wheat Flour', price: 85, category_id: 4, category_name: 'Pantry Staples', brand: 'Aashirvaad', unit: '2 kg', stock_quantity: 90, avg_rating: 4.7, review_count: 267, description: 'Pure whole wheat flour, stone ground for freshness.' },
    { id: 15, name: 'Sunflower Oil', price: 165, category_id: 4, category_name: 'Pantry Staples', brand: 'Fortune', unit: '1 liter', stock_quantity: 68, avg_rating: 4.5, review_count: 189, description: 'Refined sunflower oil, light and healthy.' },
    { id: 16, name: 'Red Lentils', price: 120, category_id: 4, category_name: 'Pantry Staples', brand: 'Tata Sampann', unit: '1 kg', stock_quantity: 55, avg_rating: 4.6, review_count: 145, description: 'Premium quality red lentils, rich in protein.' },
    
    // Beverages
    { id: 17, name: 'Green Tea', price: 250, category_id: 5, category_name: 'Beverages', brand: 'Lipton', unit: '100 bags', stock_quantity: 48, avg_rating: 4.6, review_count: 223, description: 'Premium green tea bags, rich in antioxidants.' },
    { id: 18, name: 'Coffee Powder', price: 320, category_id: 5, category_name: 'Beverages', brand: 'Nescafe', unit: '200g', stock_quantity: 62, avg_rating: 4.7, review_count: 298, description: 'Rich and aromatic coffee powder for perfect brew.' },
    { id: 19, name: 'Orange Juice', price: 95, category_id: 5, category_name: 'Beverages', brand: 'Tropicana', unit: '1 liter', stock_quantity: 45, avg_rating: 4.5, review_count: 167, description: 'Fresh and pulpy orange juice, 100% natural.' },
    { id: 20, name: 'Mineral Water', price: 40, category_id: 5, category_name: 'Beverages', brand: 'Bisleri', unit: '2 liters', stock_quantity: 120, avg_rating: 4.4, review_count: 89, description: 'Pure and safe mineral water for daily hydration.' },
    
    // Snacks
    { id: 21, name: 'Potato Chips', price: 45, category_id: 6, category_name: 'Snacks', brand: 'Lays', unit: '100g', stock_quantity: 85, avg_rating: 4.5, review_count: 234, description: 'Crispy and delicious potato chips in classic flavor.' },
    { id: 22, name: 'Chocolate Cookies', price: 65, category_id: 6, category_name: 'Snacks', brand: 'Oreo', unit: '150g', stock_quantity: 72, avg_rating: 4.7, review_count: 312, description: 'Crunchy chocolate cookies with cream filling.' },
    { id: 23, name: 'Mixed Nuts', price: 280, category_id: 6, category_name: 'Snacks', brand: 'Nutraj', unit: '250g', stock_quantity: 38, avg_rating: 4.8, review_count: 156, description: 'Premium quality mixed nuts, roasted and salted.' },
    { id: 24, name: 'Popcorn', price: 55, category_id: 6, category_name: 'Snacks', brand: '4700BC', unit: '100g', stock_quantity: 65, avg_rating: 4.6, review_count: 189, description: 'Gourmet popcorn in butter flavor, ready to eat.' },
    
    // Personal Care
    { id: 25, name: 'Shampoo', price: 185, category_id: 7, category_name: 'Personal Care', brand: 'Dove', unit: '340ml', stock_quantity: 58, avg_rating: 4.6, review_count: 267, description: 'Nourishing shampoo for soft and silky hair.' },
    { id: 26, name: 'Body Soap', price: 75, category_id: 7, category_name: 'Personal Care', brand: 'Lux', unit: '125g x 3', stock_quantity: 92, avg_rating: 4.5, review_count: 198, description: 'Moisturizing body soap with floral fragrance.' },
    { id: 27, name: 'Toothpaste', price: 95, category_id: 7, category_name: 'Personal Care', brand: 'Colgate', unit: '200g', stock_quantity: 78, avg_rating: 4.7, review_count: 345, description: 'Advanced whitening toothpaste for healthy teeth.' },
    { id: 28, name: 'Face Wash', price: 165, category_id: 7, category_name: 'Personal Care', brand: 'Garnier', unit: '150ml', stock_quantity: 45, avg_rating: 4.4, review_count: 178, description: 'Deep cleansing face wash for clear skin.' },
    
    // Household
    { id: 29, name: 'Dish Soap', price: 125, category_id: 8, category_name: 'Household', brand: 'Vim', unit: '500ml', stock_quantity: 68, avg_rating: 4.5, review_count: 234, description: 'Powerful dish soap that cuts through grease.' },
    { id: 30, name: 'Laundry Detergent', price: 285, category_id: 8, category_name: 'Household', brand: 'Surf Excel', unit: '1 kg', stock_quantity: 52, avg_rating: 4.7, review_count: 289, description: 'Advanced laundry detergent for tough stains.' },
    { id: 31, name: 'Floor Cleaner', price: 145, category_id: 8, category_name: 'Household', brand: 'Lizol', unit: '975ml', stock_quantity: 48, avg_rating: 4.6, review_count: 167, description: 'Disinfectant floor cleaner with fresh fragrance.' },
    { id: 32, name: 'Toilet Cleaner', price: 95, category_id: 8, category_name: 'Household', brand: 'Harpic', unit: '500ml', stock_quantity: 62, avg_rating: 4.5, review_count: 145, description: 'Powerful toilet cleaner that kills 99.9% germs.' }
];

// Made with Bob
