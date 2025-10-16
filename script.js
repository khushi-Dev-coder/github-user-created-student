// GitHub User Info Fetcher Script
(function() {
    'use strict';
    
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get('token');
    
    // If token is provided in URL, set it in the form
    if (tokenFromUrl) {
        document.getElementById('token').value = tokenFromUrl;
    }
    
    // Get form element with dynamic seed
    const form = document.querySelector('#github-user-\\$\\{seed\\}');
    const usernameInput = document.getElementById('username');
    const tokenInput = document.getElementById('token');
    const errorMessage = document.getElementById('error-message');
    const userInfo = document.getElementById('user-info');
    const spinner = form.querySelector('.spinner-border');
    const submitButton = form.querySelector('button[type="submit"]');
    const statusElement = document.getElementById('github-status');
    
    // Function to update status
    function updateStatus(message) {
        statusElement.textContent = message;
    }
    
    // Function to calculate account age in years
    function calculateAccountAge(createdAt) {
        const created = new Date(createdAt);
        const now = new Date();
        const diffMs = now - created;
        const diffYears = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
        return diffYears;
    }
    
    // Load cached user data on page load
    window.addEventListener('DOMContentLoaded', () => {
        const cachedData = localStorage.getItem('github-user-${seed}');
        if (cachedData) {
            try {
                const userData = JSON.parse(cachedData);
                if (userData && userData.login) {
                    usernameInput.value = userData.login;
                    displayUserInfo(userData);
                }
            } catch (e) {
                console.error('Error loading cached data:', e);
            }
        }
    });
    
    // Function to display user information
    function displayUserInfo(data) {
        document.getElementById('user-avatar').src = data.avatar_url;
        document.getElementById('user-name').textContent = data.name || data.login;
        document.getElementById('user-login').textContent = '@' + data.login;
        document.getElementById('user-bio').textContent = data.bio || '';
        document.getElementById('user-location').textContent = data.location || '-';
        document.getElementById('user-company').textContent = data.company || '-';
        document.getElementById('user-repos').textContent = data.public_repos;
        document.getElementById('user-followers').textContent = data.followers;
        document.getElementById('user-following').textContent = data.following;
        
        // Format and display creation date
        const createdDate = new Date(data.created_at);
        const formattedDate = createdDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        document.getElementById('user-created').textContent = formattedDate;
        
        // Calculate and display account age
        const accountAge = calculateAccountAge(data.created_at);
        document.getElementById('github-account-age').textContent = `${accountAge} years`;
        
        userInfo.style.display = 'block';
    }
    
    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const token = tokenInput.value.trim();
        
        if (!username) {
            errorMessage.textContent = 'Please enter a username';
            errorMessage.style.display = 'block';
            return;
        }
        
        // Update status - lookup starting
        updateStatus(`Starting lookup for user ${username}`);
        
        // Hide previous results/errors
        errorMessage.style.display = 'none';
        userInfo.style.display = 'none';
        
        // Show loading state
        spinner.style.display = 'inline-block';
        submitButton.disabled = true;
        
        try {
            const headers = {
                'Accept': 'application/vnd.github.v3+json'
            };
            
            if (token) {
                headers['Authorization'] = `token ${token}`;
            }
            
            const response = await fetch(`https://api.github.com/users/${username}`, {
                headers: headers
            });
            
            if (!response.ok) {
                let errorMsg = 'User not found';
                if (response.status === 403) {
                    errorMsg = 'API rate limit exceeded. Please provide a GitHub token.';
                } else if (response.status === 401) {
                    errorMsg = 'Invalid GitHub token';
                }
                throw new Error(errorMsg);
            }
            
            const data = await response.json();
            
            // Display user information
            displayUserInfo(data);
            
            // Cache the successful lookup
            localStorage.setItem('github-user-${seed}', JSON.stringify(data));
            
            // Update status - lookup succeeded
            updateStatus(`Successfully retrieved information for user ${username}`);
            
        } catch (error) {
            errorMessage.textContent = error.message;
            errorMessage.style.display = 'block';
            
            // Update status - lookup failed
            updateStatus(`Failed to retrieve information for user ${username}: ${error.message}`);
        } finally {
            // Hide loading state
            spinner.style.display = 'none';
            submitButton.disabled = false;
        }
    });
})();