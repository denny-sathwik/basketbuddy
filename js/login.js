// Login Page JavaScript for Basket Buddy (Frontend-Only)

// ===== Handle Login Form Submission =====
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Check if already logged in
    if (isLoggedIn()) {
        showToast('Already logged in! Redirecting...', 'info');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        return;
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Auto-fill demo credentials on page load
    setTimeout(() => {
        showToast('Use demo credentials to login', 'info');
    }, 1000);
});

// ===== Handle Login =====
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;
    
    // Validate inputs
    if (!validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return;
    }
    
    if (!validatePassword(password)) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    
    // Simulate API call
    setTimeout(() => {
        // Demo login - accept any email/password for demo purposes
        // In production, this would validate against a backend
        const user = {
            id: Date.now(),
            name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
            email: email,
            phone: '+91 9876543210',
            created_at: new Date().toISOString()
        };
        
        // Save user to local storage
        setCurrentUser(user);
        
        // Show success message
        showToast('Login successful! Welcome back!', 'success');
        
        // Redirect to home page
        setTimeout(() => {
            const redirectUrl = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
            window.location.href = redirectUrl;
        }, 1500);
        
    }, 1000);
}

// ===== Quick Login with Demo Credentials =====
function quickDemoLogin() {
    document.getElementById('email').value = 'demo@basketbuddy.com';
    document.getElementById('password').value = 'demo123';
    showToast('Demo credentials filled!', 'info');
}

// Made with Bob