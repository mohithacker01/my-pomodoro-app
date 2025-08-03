class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.totalTime = 25 * 60;
        this.isRunning = false;
        this.timer = null;
        this.sessionCount = 0;
        this.currentMode = 'work'; // 'work' or 'rest'
        
        // DOM elements
        this.timeDisplay = document.getElementById('time');
        this.timerLabel = document.getElementById('timer-label');
        this.startBtn = document.getElementById('start-btn');
        this.pauseBtn = document.getElementById('pause-btn');
        this.resetBtn = document.getElementById('reset-btn');
        this.progressFill = document.getElementById('progress-fill');
        this.sessionCountDisplay = document.getElementById('session-count');
        this.modeToggleBtn = document.getElementById('mode-toggle');
        
        console.log('DOM elements found:', {
            timeDisplay: this.timeDisplay,
            timerLabel: this.timerLabel,
            startBtn: this.startBtn,
            pauseBtn: this.pauseBtn,
            resetBtn: this.resetBtn,
            progressFill: this.progressFill,
            sessionCountDisplay: this.sessionCountDisplay,
            modeToggleBtn: this.modeToggleBtn
        });
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        console.log('Initializing event listeners...');
        
        this.startBtn.addEventListener('click', () => this.start());
        this.pauseBtn.addEventListener('click', () => this.pause());
        this.resetBtn.addEventListener('click', () => this.reset());
        
        console.log('Mode toggle button found:', this.modeToggleBtn);
        this.modeToggleBtn.addEventListener('click', () => {
            console.log('Mode toggle button clicked');
            this.toggleMode();
        });
        
        console.log('Event listeners initialized');
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.disabled = true;
            this.pauseBtn.disabled = false;
            
            this.timer = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }, 1000);
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;
            this.startBtn.disabled = false;
            this.pauseBtn.disabled = true;
            clearInterval(this.timer);
        }
    }
    
    reset() {
        this.pause();
        this.timeLeft = this.totalTime;
        this.updateDisplay();
    }
    
    complete() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
        
        // Add session count if it was a work session
        if (this.timerLabel.textContent === 'Work Time') {
            this.sessionCount++;
            this.sessionCountDisplay.textContent = this.sessionCount;
        }
        
        // Show notification
        this.showNotification();
        
        // Add completion animation
        this.timeDisplay.classList.add('timer-complete');
        setTimeout(() => {
            this.timeDisplay.classList.remove('timer-complete');
        }, 500);
    }
    
    toggleMode() {
        console.log('Toggle mode called');
        const newMode = this.currentMode === 'work' ? 'rest' : 'work';
        this.switchMode(newMode);
    }
    
    switchMode(selectedMode) {
        console.log('Switch mode called with mode:', selectedMode);
        
        // Update button text and styling
        this.modeToggleBtn.textContent = selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1) + ' Mode';
        this.modeToggleBtn.className = `mode-toggle-btn ${selectedMode}-mode`;
        
        // Get new time and label
        const newTime = selectedMode === 'work' ? 25 * 60 : 5 * 60; // Work: 25 min, Rest: 5 min
        const newLabel = selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1) + ' Time';
        
        console.log('New time:', newTime, 'seconds, New label:', newLabel);
        
        // Reset timer with new values
        this.pause();
        this.totalTime = newTime;
        this.timeLeft = newTime;
        this.timerLabel.textContent = newLabel;
        this.updateDisplay();
        
        this.currentMode = selectedMode;
        console.log('Mode switched successfully');
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update progress bar
        const progress = ((this.totalTime - this.timeLeft) / this.totalTime) * 100;
        this.progressFill.style.width = `${progress}%`;
    }
    
    showNotification() {
        // Check if browser supports notifications
        if ('Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification('Pomodoro Timer', {
                    body: this.timerLabel.textContent + ' completed!',
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23667eea"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>'
                });
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        this.showNotification();
                    }
                });
            }
        }
        
        // Fallback: Play a sound or show alert
        this.playNotificationSound();
    }
    
    playNotificationSound() {
        // Create a simple beep sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (error) {
            console.log('Audio notification not supported');
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
});

// Request notification permission on page load
if ('Notification' in window) {
    Notification.requestPermission();
} 