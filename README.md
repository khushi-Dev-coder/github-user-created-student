# GitHub User Info Fetcher

## Overview
A web application that fetches and displays GitHub user information using the GitHub API.

## Features
- Fetch GitHub user information by username
- Optional GitHub token support for authenticated requests
- Display user avatar, name, bio, and repository statistics
- Show account creation date and age in years
- Real-time status updates with aria-live alerts
- Automatic caching of last successful lookup in localStorage
- Form auto-population from cached data on page load
- Responsive Bootstrap design
- Loading states and error handling

## Usage
1. Enter a GitHub username in the form
2. Optionally provide a GitHub token for authenticated requests
3. Click "Get User Info" to fetch the data
4. View the user's profile information including:
   - Avatar
   - Name and username
   - Bio
   - Location and company
   - Public repositories, followers, and following counts
   - Account creation date and age in years

## Technical Details
- Uses GitHub API v3
- Implements aria-live regions for accessibility
- Caches successful lookups in localStorage
- Responsive design with Bootstrap 5
- Custom gradient styling

## Updates (Round 2)
- Added aria-live alert region (#github-status) for accessibility
- Enhanced account age display to show years alongside creation date
- Implemented localStorage caching for successful lookups
- Added auto-population of cached user data on page load

## Round 2 Updates
### New Requirements:
Enhance the GitHub user lookup page: add an aria-live alert #github-status that reports when a lookup starts, succeeds, or fails; display the account age in whole years inside #github-account-age alongside the creation date; and cache the last successful lookup in localStorage under 'github-user-${seed}' and repopulate the form on load.

### New Checks:
- document.querySelector('#github-status').getAttribute('aria-live') === 'polite'
- !!document.querySelector('script').textContent.includes('github-status')
- parseInt(document.querySelector('#github-account-age').textContent, 10) >= 0
- document.querySelector('#github-account-age').textContent.toLowerCase().includes('years')
- !!document.querySelector('script').textContent.includes('localStorage.setItem("github-user-${seed}")')
- !!document.querySelector('script').textContent.includes('localStorage.getItem("github-user-${seed}")')
