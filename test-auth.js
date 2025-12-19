// Simple test script to verify authentication endpoints
const testAuth = async () => {
  const baseUrl = 'http://localhost:3001/api/auth';
  
  // Test data
  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    phone: '9876543210',
    password: 'test123'
  };

  try {
    console.log('Testing Registration...');
    const registerResponse = await fetch(`${baseUrl}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testUser),
    });

    const registerData = await registerResponse.json();
    console.log('Register Response:', registerResponse.status, registerData);

    if (registerResponse.ok) {
      console.log('\nTesting Login with phone...');
      const loginResponse = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone: testUser.phone }),
      });

      const loginData = await loginResponse.json();
      console.log('Login Response:', loginResponse.status, loginData);
    }

  } catch (error) {
    console.error('Test Error:', error.message);
    console.log('Make sure the backend server is running on port 3001');
  }
};

// Run the test
testAuth();