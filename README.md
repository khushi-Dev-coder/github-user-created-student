# GitHub User Info Fetcher

A modern, responsive web application that fetches and displays GitHub user information including account creation date.

## Features

- 🔍 **User Search**: Search for any GitHub user by username
- 🔐 **Token Support**: Optional GitHub token support for higher API rate limits
- 📅 **Creation Date**: Displays account creation date in YYYY-MM-DD UTC format
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌙 **Dark Mode**: Automatic dark mode support based on system preferences
- ⚡ **Fast & Lightweight**: Built with vanilla JavaScript and Bootstrap 5
- 🛡️ **Error Handling**: Comprehensive error handling for various scenarios

## Usage

### Basic Usage

1. Enter a GitHub username in the form
2. Click "Fetch User Info"
3. View the user's account creation date and other information

### Using with Token

To avoid GitHub API rate limits (60 requests per hour for unauthenticated requests), you can provide a GitHub personal access token:

1. **Via Form**: Enter your token in the "GitHub Token" field
2. **Via URL**: Add `?token=YOUR_TOKEN` to the URL

### URL Parameters

The application supports the following URL parameters:

- `?username=USERNAME` - Auto-fetch user on page load
- `?token=YOUR_TOKEN` - Set GitHub token from URL
- `?username=USERNAME&token=YOUR_TOKEN` - Combine both parameters

### Examples

```
https://yoursite.com/
https://yoursite.com/?username=octocat
https://yoursite.com/?token=ghp_xxxxxxxxxxxx
https://yoursite.com/?username=octocat&token=ghp_xxxxxxxxxxxx
```

## Technical Details

### Technologies Used

- **HTML5**: Semantic markup
- **Bootstrap 5.3**: UI framework
- **CSS3**: Custom styling with animations
- **JavaScript (ES6+)**: Modern JavaScript with async/await
- **GitHub API v3**: RESTful API integration

### API Integration

The application uses the GitHub REST API v3:

```javascript
https://api.github.com/users/{username}
```

### Rate Limiting

- **Without Token**: 60 requests per hour
- **With Token**: 5,000 requests per hour

### Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Security Considerations

- Tokens are never stored in localStorage or cookies
- All API requests use HTTPS
- Input validation and sanitization
- XSS protection through proper DOM manipulation

## Error Handling

The application handles the following error scenarios:

- User not found (404)
- Invalid token (401)
- Rate limit exceeded (403)
- Network errors
- Invalid input

## Deployment

### GitHub Pages

1. Fork or clone this repository
2. Enable GitHub Pages in repository settings
3. Select the main branch and root directory
4. Your app will be available at `https://[username].github.io/[repository-name]/`

### Local Development

1. Clone the repository
2. Open `index.html` in a web browser
3. Or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created with ❤️ for the GitHub community

## Acknowledgments

- GitHub for providing the public API
- Bootstrap team for the excellent UI framework
- The open-source community