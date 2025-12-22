import API_CONFIG from '../config/api';

class KeepAliveService {
  constructor() {
    this.backendUrl = API_CONFIG.BASE_URL.replace('/api', '');
    this.isActive = false;
  }

  // Wake up backend on app start
  async wakeUpBackend() {
    try {
      console.log('Waking up backend...');
      const response = await fetch(`${this.backendUrl}/api/keep-alive`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        console.log('Backend is awake');
        return true;
      }
    } catch (error) {
      console.log('Backend wake-up failed, retrying...', error.message);
      // Retry once after 5 seconds
      setTimeout(() => this.wakeUpBackend(), 5000);
    }
    return false;
  }

  // Start periodic keep-alive pings
  startKeepAlive() {
    if (this.isActive) return;
    
    this.isActive = true;
    
    // Initial wake-up
    this.wakeUpBackend();
    
    // Keep alive every 10 minutes
    this.intervalId = setInterval(() => {
      this.wakeUpBackend();
    }, 10 * 60 * 1000);
  }

  // Stop keep-alive
  stopKeepAlive() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isActive = false;
  }
}

export default new KeepAliveService();