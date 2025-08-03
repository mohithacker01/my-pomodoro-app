# Pomodoro Timer

A simple, elegant Pomodoro timer that runs in your browser. Built with HTML, CSS, and JavaScript.

## Features

- **25-minute Pomodoro work sessions**
- **5-minute short breaks**
- **15-minute long breaks**
- **Start, pause, and reset functionality**
- **Visual progress bar**
- **Session counter**
- **Browser notifications** (with sound fallback)
- **Responsive design** - works on desktop and mobile
- **Modern, clean UI** with smooth animations

## How to Use

1. **Open the timer**: Simply open `index.html` in your web browser
2. **Choose a mode**: 
   - **Pomodoro**: 25-minute work session
   - **Short Break**: 5-minute break
   - **Long Break**: 15-minute break
3. **Start the timer**: Click the "Start" button
4. **Pause if needed**: Click "Pause" to pause the timer
5. **Reset**: Click "Reset" to reset the current timer
6. **Track progress**: Watch the progress bar and session counter

## Pomodoro Technique

The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.

### Basic Workflow:
1. Decide on the task to be done
2. Set the Pomodoro timer (25 minutes)
3. Work on the task until the timer rings
4. Take a short break (5 minutes)
5. After four Pomodoros, take a longer break (15 minutes)

## Browser Compatibility

This timer works in all modern browsers that support:
- ES6 JavaScript
- CSS Grid and Flexbox
- Web Audio API (for sound notifications)
- Browser Notifications API

## Files Structure

```
pomodoro/
├── index.html      # Main HTML file
├── styles.css      # CSS styles
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

You can easily customize the timer by modifying the JavaScript file:

- **Change timer durations**: Modify the `data-time` attributes in the HTML or the default values in the JavaScript
- **Customize colors**: Update the CSS variables or gradient values
- **Add new features**: Extend the `PomodoroTimer` class with additional functionality

## Getting Started

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Start using the Pomodoro timer!

No installation or build process required - it's ready to use immediately.

## Tips for Effective Use

- **Eliminate distractions**: Close unnecessary tabs and apps
- **Focus on one task**: Don't switch tasks during a Pomodoro
- **Take breaks seriously**: Use break time to step away from your computer
- **Track your sessions**: Use the session counter to monitor your productivity
- **Adjust as needed**: Modify timer durations to fit your workflow

Enjoy your productive Pomodoro sessions! 🍅 