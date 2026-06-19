// Homepage JavaScript for Basket Buddy (Frontend-Only)

let currentPage = 1;
let currentFilter = 'all';
let allProducts = [];

// ===== Load Categories =====
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    
    try {
        const categories = getCategories();
        
        if (categories && categories.length > 0) {
            categoriesGrid.innerHTML = categories
                .map(category => createCategoryCard(category))
                .join('');
        } else {
            categoriesGrid.innerHTML = '<p class="text-center">No categories available</p>';
        }
    } catch (error) {
        console.error('Error loading categories:', error);
        categoriesGrid.innerHTML = '<p class="text-center">Failed to load categories</p>';
    }
}

// ===== Load Featured Products =====
function loadFeaturedProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    try {
        const products = getFeaturedProducts(8);
        
        if (products && products.length > 0) {
            allProducts = products;
            displayProducts(products);
        } else {
            productsGrid.innerHTML = '<p class="text-center">No products available</p>';
        }
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<p class="text-center">Failed to load products</p>';
    }
}

// ===== Display Products =====
function displayProducts(products) {
    const productsGrid = document.getElementById('productsGrid');
    
    if (products && products.length > 0) {
        productsGrid.innerHTML = products
            .map(product => createProductCard(product))
            .join('');
    } else {
        productsGrid.innerHTML = '<p class="text-center">No products found</p>';
    }
}

// ===== Filter Products =====
function filterProducts(categoryId) {
    currentFilter = categoryId;
    const productsGrid = document.getElementById('productsGrid');
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter == categoryId) {
            btn.classList.add('active');
        }
    });
    
    // Show loading
    productsGrid.innerHTML = `
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
    `;
    
    // Simulate loading delay for better UX
    setTimeout(() => {
        try {
            let products;
            if (categoryId === 'all') {
                products = getFeaturedProducts(8);
            } else {
                products = getProducts({ category_id: categoryId, limit: 8 });
            }
            
            if (products && products.length > 0) {
                allProducts = products;
                displayProducts(products);
            } else {
                productsGrid.innerHTML = '<p class="text-center">No products found in this category</p>';
            }
        } catch (error) {
            console.error('Error filtering products:', error);
            productsGrid.innerHTML = '<p class="text-center">Failed to load products</p>';
        }
    }, 300);
}

// ===== Load More Products =====
function loadMoreProducts() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const productsGrid = document.getElementById('productsGrid');
    
    currentPage++;
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = 'Loading...';
    
    setTimeout(() => {
        try {
            let moreProducts;
            if (currentFilter === 'all') {
                moreProducts = getProducts({ limit: 8 });
            } else {
                moreProducts = getProducts({ category_id: currentFilter, limit: 8 });
            }
            
            // Filter out already displayed products
            const displayedIds = allProducts.map(p => p.id);
            moreProducts = moreProducts.filter(p => !displayedIds.includes(p.id));
            
            if (moreProducts && moreProducts.length > 0) {
                // Append new products
                const newProductsHTML = moreProducts
                    .map(product => createProductCard(product))
                    .join('');
                productsGrid.insertAdjacentHTML('beforeend', newProductsHTML);
                allProducts = [...allProducts, ...moreProducts];
            } else {
                loadMoreBtn.style.display = 'none';
                showToast('No more products to load', 'info');
            }
        } catch (error) {
            console.error('Error loading more products:', error);
            showToast('Failed to load more products', 'error');
        } finally {
            loadMoreBtn.disabled = false;
            loadMoreBtn.textContent = 'Load More Products';
        }
    }, 500);
}

// ===== Setup Filter Buttons =====
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterProducts(filter);
        });
    });
}

// ===== Setup Load More Button =====
function setupLoadMoreButton() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProducts);
    }
}

// ===== Setup Deal Cards =====
function setupDealCards() {
    const dealCards = document.querySelectorAll('.deal-card .btn-secondary');
    
    dealCards.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Navigate to filtered products
            if (index === 0) {
                filterProducts(1); // Fresh Produce
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else if (index === 1) {
                filterProducts(3); // Bakery
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// ===== Handle URL Parameters =====
function handleURLParameters() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    const categoryId = urlParams.get('category');
    
    if (searchQuery) {
        performSearch(searchQuery);
    } else if (categoryId) {
        filterProducts(categoryId);
    }
}

// ===== Perform Search =====
function performSearch(query) {
    const productsGrid = document.getElementById('productsGrid');
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.value = query;
    }
    
    // Show loading
    productsGrid.innerHTML = `
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
        <div class="product-card skeleton"></div>
    `;
    
    setTimeout(() => {
        try {
            const products = getProducts({ search: query });
            
            if (products && products.length > 0) {
                allProducts = products;
                displayProducts(products);
                showToast(`Found ${products.length} products`, 'success');
            } else {
                productsGrid.innerHTML = `<p class="text-center">No products found for "${query}"</p>`;
                showToast('No products found', 'info');
            }
        } catch (error) {
            console.error('Error searching products:', error);
            productsGrid.innerHTML = '<p class="text-center">Search failed</p>';
        }
    }, 300);
}

// ===== Animate on Scroll =====
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('.categories-section, .products-section, .deals-section, .why-us-section').forEach(section => {
        observer.observe(section);
    });
}

// ===== Initialize Homepage =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('Basket Buddy Homepage Loaded - Frontend Only Mode');
    
    // Load data
    loadCategories();
    loadFeaturedProducts();
    
    // Handle URL parameters
    handleURLParameters();
    
    // Setup interactions
    setupFilterButtons();
    setupLoadMoreButton();
    setupDealCards();
    setupScrollAnimations();
    
    // Add smooth scroll behavior
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Show welcome message for first-time visitors
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            showToast('Welcome to Basket Buddy! 🛒', 'success');
            localStorage.setItem('visited', 'true');
        }, 1000);
    }
});

// ===== Handle Window Resize =====
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        console.log('Window resized');
    }, 250);
});

// Made with Bob
