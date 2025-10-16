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
    
    // Form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        if (!username) {
            showError('Please enter a GitHub username');
            return;
        }
        
        // Show loading state
        setLoadingState(true);
        hideError();
        hideUserInfo();
        
        try {
            await fetchGitHubUser(username);
        } catch (error) {
            showError(error.message);
        } finally {
            setLoadingState(false);
        }
    });
    
    // Fetch GitHub user data
    async function fetchGitHubUser(username) {
        const token = tokenInput.value.trim() || tokenFromUrl;
        const apiUrl = `https://api.github.com/users/${encodeURIComponent(username)}`;
        
        const headers = {
            'Accept': 'application/vnd.github.v3+json'
        };
        
        // Add authorization header if token is provided
        if (token) {
            headers['Authorization'] = `token ${token}`;
        }
        
        try {
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: headers
            });
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found. Please check the username.');
                } else if (response.status === 401) {
                    throw new Error('Invalid token. Please check your GitHub token.');
                } else if (response.status === 403) {
                    throw new Error('API rate limit exceeded. Please provide a valid token or try again later.');
                } else {
                    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
                }
            }
            
            const userData = await response.json();
            displayUserInfo(userData);
            
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
                throw new Error('Network error. Please check your internet connection.');
            }
            throw error;
        }
    }
    
    // Display user information
    function displayUserInfo(userData) {
        // Format the created_at date to YYYY-MM-DD in UTC
        const createdDate = new Date(userData.created_at);
        const formattedDate = formatDateToUTC(createdDate);
        
        // Update the UI with user data
        document.getElementById('github-created-at').textContent = formattedDate;
        document.getElementById('user-avatar').src = userData.avatar_url || '';
        document.getElementById('user-name').textContent = userData.name || userData.login;
        document.getElementById('user-login').textContent = '@' + userData.login;
        document.getElementById('user-repos').textContent = userData.public_repos || '0';
        document.getElementById('user-followers').textContent = userData.followers || '0';
        document.getElementById('user-bio').textContent = userData.bio || 'No bio available';
        
        // Show the user info section
        userInfo.classList.remove('d-none');
    }
    
    // Format date to YYYY-MM-DD in UTC
    function formatDateToUTC(date) {
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0');
        const day = String(date.getUTCDate()).padStart(2, '0');
        return `${year}-${month}-${day} UTC`;
    }
    
    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }
    
    // Hide error message
    function hideError() {
        errorMessage.classList.add('d-none');
        errorMessage.textContent = '';
    }
    
    // Hide user info section
    function hideUserInfo() {
        userInfo.classList.add('d-none');
    }
    
    // Set loading state
    function setLoadingState(isLoading) {
        if (isLoading) {
            spinner.classList.remove('d-none');
            submitButton.disabled = true;
        } else {
            spinner.classList.add('d-none');
            submitButton.disabled = false;
        }
    }
    
    // Auto-fetch if username is provided in URL
    const usernameFromUrl = urlParams.get('username');
    if (usernameFromUrl) {
        usernameInput.value = usernameFromUrl;
        form.dispatchEvent(new Event('submit'));
    }
})();