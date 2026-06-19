# 🛒 Basket Buddy - Frontend Showcase

A modern, responsive grocery shopping website built with pure HTML, CSS, and JavaScript. This is a frontend-only demonstration showcasing beautiful UI/UX design and interactive features.

## ✨ Features

### 🎨 Beautiful UI/UX
- Modern, clean design with smooth animations
- Fully responsive layout (mobile, tablet, desktop)
- Interactive product cards with hover effects
- Smooth scroll animations and transitions
- Toast notifications for user feedback

### 🛍️ Shopping Experience
- Browse products by categories
- Filter products dynamically
- Search functionality
- Product ratings and reviews display
- Add to cart functionality (local storage)
- Cart management with quantity controls

### 📦 Product Catalog
- 32+ mock products across 8 categories
- Fresh Produce, Dairy & Eggs, Bakery, Pantry Staples
- Beverages, Snacks, Personal Care, Household items
- Detailed product information with pricing
- Stock availability indicators

### 💾 Local Storage
- Cart persistence across sessions
- User preferences saved locally
- No backend required - runs entirely in browser

## 🚀 Quick Start

### Option 1: Direct File Opening
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Start exploring the grocery store!

### Option 2: Local Server (Recommended)
```bash
# Using Python
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 📁 Project Structure

```
basketbuddy/
├── index.html          # Main homepage
├── css/
│   └── style.css      # All styles and animations
├── js/
│   ├── config.js      # Mock data and configuration
│   ├── utils.js       # Utility functions and helpers
│   └── index.js       # Homepage functionality
└── README.md          # This file
```

## 🎯 Key Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS, no frameworks
- **Font Awesome** - Icons
- **Local Storage API** - Data persistence

## 🎨 Design Features

### Color Scheme
- Primary: `#10b981` (Green)
- Secondary: `#f59e0b` (Amber)
- Accent: `#8b5cf6` (Purple)
- Clean, modern color palette

### Animations
- Fade-in effects on scroll
- Smooth hover transitions
- Loading skeletons
- Toast notifications
- Card hover effects

### Responsive Design
- Mobile-first approach
- Breakpoints for tablets and desktops
- Touch-friendly interface
- Optimized for all screen sizes

## 🛠️ Customization

### Adding Products
Edit `js/config.js` and add to the `MOCK_PRODUCTS` array:

```javascript
{
    id: 33,
    name: 'Your Product',
    price: 99,
    category_id: 1,
    category_name: 'Fresh Produce',
    brand: 'Brand Name',
    unit: '1 kg',
    stock_quantity: 50,
    avg_rating: 4.5,
    review_count: 100,
    description: 'Product description'
}
```

### Adding Categories
Edit `js/config.js` and add to the `MOCK_CATEGORIES` array:

```javascript
{
    id: 9,
    name: 'New Category',
    description: 'Category description',
    product_count: 0
}
```

### Styling
All styles are in `css/style.css`. Key sections:
- CSS Variables (`:root`) - Colors, shadows, spacing
- Component styles - Headers, cards, buttons
- Responsive breakpoints - Media queries

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS techniques (Grid, Flexbox, Custom Properties)
- JavaScript DOM manipulation
- Local Storage API usage
- Responsive design principles
- UI/UX best practices
- Clean code organization

## 🤝 Contributing

This is a demonstration project. Feel free to:
- Fork and customize
- Use as a learning resource
- Build upon for your own projects
- Share improvements and ideas

## 📄 License

This project is open source and available for educational purposes.

## 🎉 Features Showcase

### Homepage
- Hero section with key features
- Category grid with icons
- Featured products display
- Filter by category
- Load more functionality
- Today's deals section
- Why choose us section

### Product Cards
- Product image/icon
- Brand and name
- Unit information
- Star ratings
- Price display
- Add to cart button
- Stock indicators

### Interactive Elements
- Search bar with live feedback
- Category filters
- Smooth scrolling
- Toast notifications
- Loading states
- Hover effects

## 🔧 Technical Highlights

### Performance
- Minimal dependencies (only Font Awesome for icons)
- Optimized CSS with custom properties
- Efficient JavaScript with event delegation
- Lazy loading animations

### Code Quality
- Clean, readable code
- Consistent naming conventions
- Modular JavaScript functions
- Well-commented code
- Semantic HTML

### User Experience
- Intuitive navigation
- Clear visual feedback
- Smooth animations
- Responsive interactions
- Accessible design

## 📞 Support

For questions or suggestions, feel free to open an issue or reach out!

---

**Made with ❤️ using HTML, CSS, and JavaScript**

*A frontend showcase project demonstrating modern web development practices*