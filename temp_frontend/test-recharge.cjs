const axios = require('axios');

async function testRecharge() {
  try {
    // First login to get token
    console.log('Logging in...');
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'test@example.com',
      password: 'password123'
    });
    
    const token = loginResponse.data.token;
    console.log('Login successful, token:', token.substring(0, 20) + '...');
    
    // Create recharge
    console.log('Creating recharge...');
    const rechargeResponse = await axios.post('http://localhost:3001/api/recharges', {
      phoneNumber: '9876543210',
      operator: 'jio',
      planId: null,
      amount: 199,
      paymentMethod: 'card'
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Recharge created:', rechargeResponse.data);
    
    // Fetch recharges
    console.log('Fetching recharges...');
    const fetchResponse = await axios.get('http://localhost:3001/api/recharges/my-recharges', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    console.log('Fetched recharges:', fetchResponse.data);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

testRecharge();