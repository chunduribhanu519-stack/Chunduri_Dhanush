<!-- truncate -->
# 😂 Random Joke Generator

A fun and interactive web application that fetches random jokes from an external API and displays them with a beautiful UI.

## Features ✨

- **Random Joke Generator**: Fetches jokes from the Official Joke API
- **Beautiful UI**: Gradient background, smooth animations, and responsive design
- **Copy to Clipboard**: Easily copy jokes to share with friends
- **Loading States**: Visual loader while fetching jokes
- **Keyboard Shortcut**: Press `Space` to get a new joke
- **Mobile Responsive**: Works perfectly on all device sizes
- **Error Handling**: Graceful error messages if something goes wrong

## How to Use 🚀

1. **Open the App**: Navigate to the published GitHub Pages link
2. **Get a Joke**: Click the "Get a Joke" button
3. **Copy Joke**: Click "Copy Joke" to copy to your clipboard
4. **Keyboard Shortcut**: Press `Space` for a new joke

## Technologies Used 🛠️

- **HTML5**: Structure
- **CSS3**: Styling with gradients and animations
- **JavaScript (ES6)**: Logic and API integration
- **External API**: [Official Joke API](https://official-joke-api.appspot.com/)

## API Used 🔗

**Official Joke API**: `https://official-joke-api.appspot.com/random_joke`

Returns random jokes in JSON format:
```json
{
  "type": "general|knock-knock",
  "setup": "Why did...",
  "punchline": "Because...",
  "id": 123
}
```

## File Structure 📁

```
Chunduri_Dhanush/
├── index.html      # HTML structure
├── style.css       # CSS styling
├── script.js       # JavaScript logic
└── README.md       # Documentation
```

## Features Breakdown 📋

### 1. **Random Joke Fetching**
- Fetches from Official Joke API
- Handles both single-line and two-part jokes
- Automatic joke loading on page load

### 2. **User Interface**
- Gradient purple theme
- Smooth fade-in animations
- Responsive button layout
- Loading spinner

### 3. **Copy Functionality**
- Click "Copy Joke" to copy to clipboard
- Toast notification confirmation
- Works on all modern browsers

### 4. **Keyboard Support**
- Press `Space` to fetch a new joke
- Prevents page scrolling when pressing Space

## Browser Support 🌐

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Mobile Browsers (iOS Safari, Chrome Mobile)

## Live Demo 🎉

Visit: `https://chunduribhanu519-stack.github.io/Chunduri_Dhanush`

## Installation & Development 💻

### Local Development:
1. Clone the repository
2. Open `index.html` in your browser
3. No build tools or dependencies required!

## Future Enhancements 🎯

- [ ] Add joke category filter
- [ ] Save favorite jokes
- [ ] Dark mode toggle
- [ ] Share to social media buttons
- [ ] Multiple API options
- [ ] Joke rating system
- [ ] Search functionality

## License 📄

Free to use and modify for personal projects.

## Credits 👏

- **API**: [Official Joke API](https://official-joke-api.appspot.com/)
- **Creator**: Chunduri Dhanush

---

**Enjoy the laughs! 😂**
