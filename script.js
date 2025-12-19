// Application State
let currentUser = null;
let selectedOperator = '';
let selectedPlan = null;
let selectedPaymentMethod = '';
let transactions = [];

// Plan Data
const planData = {
    airtel: {
        popular: [
            { price: '₹299', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar Mobile'], ott: ['hotstar'], popular: true },
            { price: '₹199', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Airtel Thanks'], ott: [] },
            { price: '₹449', validity: '56 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Amazon Prime'], ott: ['prime'] }
        ],
        unlimited: [
            { price: '₹599', validity: '84 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix + Hotstar'], ott: ['netflix', 'hotstar'] },
            { price: '₹719', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Prime + Netflix'], ott: ['prime', 'netflix'] }
        ],
        data: [
            { price: '₹19', validity: '1 day', data: '1GB', benefits: ['Full speed data', 'No calls'], ott: [] },
            { price: '₹48', validity: '3 days', data: '3GB', benefits: ['Full speed data', 'No calls'], ott: [] }
        ],
        annual: [
            { price: '₹2999', validity: '365 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'All OTT apps'], ott: ['netflix', 'hotstar', 'prime', 'sony'] }
        ],
        ott: [
            { price: '₹401', validity: '28 days', data: '3GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Hotstar + Prime'], ott: ['hotstar', 'prime'] }
        ],
        talktime: [
            { price: '₹10', validity: '7 days', data: 'No data', benefits: ['₹7.47 talktime', 'Local/STD calls'], ott: [] }
        ]
    },
    jio: {
        popular: [
            { price: '₹239', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioCinema Premium'], ott: [], popular: true },
            { price: '₹149', validity: '24 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioApps'], ott: [] }
        ],
        unlimited: [
            { price: '₹719', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Netflix + Prime'], ott: ['netflix', 'prime'] }
        ],
        data: [
            { price: '₹15', validity: '1 day', data: '1GB', benefits: ['High speed data', 'JioApps'], ott: [] }
        ],
        annual: [
            { price: '₹2879', validity: '365 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Complete OTT'], ott: ['netflix', 'hotstar', 'prime'] }
        ],
        ott: [
            { price: '₹449', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'JioCinema + Hotstar'], ott: ['hotstar'] }
        ],
        talktime: [
            { price: '₹12', validity: '7 days', data: 'No data', benefits: ['₹9.12 talktime', 'Local/STD calls'], ott: [] }
        ]
    },
    vi: {
        popular: [
            { price: '₹269', validity: '28 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies & TV'], ott: [], popular: true }
        ],
        unlimited: [
            { price: '₹699', validity: '84 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Disney+ Hotstar'], ott: ['hotstar'] }
        ],
        data: [
            { price: '₹17', validity: '1 day', data: '1GB', benefits: ['High speed data', 'Vi services'], ott: [] }
        ],
        annual: [
            { price: '₹3099', validity: '365 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Annual benefits'], ott: [] }
        ],
        ott: [
            { price: '₹475', validity: '28 days', data: '2GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Vi Movies + Hotstar'], ott: ['hotstar'] }
        ],
        talktime: [
            { price: '₹11', validity: '7 days', data: 'No data', benefits: ['₹8.36 talktime', 'Local/STD calls'], ott: [] }
        ]
    },
    bsnl: {
        popular: [
            { price: '₹247', validity: '30 days', data: '1.5GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'BSNL Tunes'], ott: [], popular: true }
        ],
        unlimited: [
            { price: '₹797', validity: '160 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Maximum validity'], ott: [] }
        ],
        data: [
            { price: '₹22', validity: '1 day', data: '1GB', benefits: ['Data only plan', 'Government network'], ott: [] }
        ],
        annual: [
            { price: '₹2399', validity: '365 days', data: '1GB/day', benefits: ['Unlimited calls', '100 SMS/day', 'Annual plan'], ott: [] }
        ],
        ott: [],
        talktime: [
            { price: '₹10', validity: '7 days', data: 'No data', benefits: ['₹7.50 talktime', 'Local/STD calls'], ott: [] }
        ]
    }
};

const operatorPatterns = {
    airtel: ['70', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89'],
    jio: ['60', '61', '62', '63', '64', '65', '66', '67', '68', '69'],
    vi: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99'],
    bsnl: ['94', '95', '96', '97', '98', '99']
};

// Phone Login
document.getElementById('phoneLoginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const phone = e.target.phone.value;
    if (phone.length === 10) {
        currentUser = { phone: '+91' + phone };
        document.getElementById('phoneLogin').classList.add('hidden');
        document.getElementById('dashboard').classList.remove('hidden');
        document.getElementById('userName').textContent = 'User';
        document.getElementById('profilePhone').textContent = '+91 ' + phone;
    }
});

// Quick Recharge
function quickRecharge() {
    const mobile = document.getElementById('quickMobile').value;
    if (mobile.length === 10) {
        document.getElementById('mobileNumber').value = mobile;
        showRecharge();
    }
}

// Show Pages
function showDashboard() {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('dashboard').classList.remove('hidden');
    updateNavigation('home');
}

function showRecharge(type = 'prepaid') {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('recharge').classList.remove('hidden');
}

function showHistory() {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('history').classList.remove('hidden');
}

function showProfile() {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('profile').classList.remove('hidden');
}

function showPayment() {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('payment').classList.remove('hidden');
}

function showSuccess() {
    document.querySelectorAll('.page, .dashboard').forEach(el => el.classList.add('hidden'));
    document.getElementById('success').classList.remove('hidden');
}

function updateNavigation(active) {
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
}

// Mobile Number Input - Use setTimeout to ensure DOM is ready
setTimeout(() => {
    const mobileInput = document.getElementById('mobileNumber');
    const operatorSelect = document.getElementById('operatorSelect');
    
    if (mobileInput) {
        mobileInput.addEventListener('input', (e) => {
            const mobile = e.target.value;
            if (mobile.length === 10) {
                const operator = detectOperator(mobile);
                if (operator) {
                    selectedOperator = operator;
                    showOperatorInfo(operator);
                    loadPlans(operator);
                    if (operatorSelect) operatorSelect.value = operator;
                }
            } else if (mobile.length < 10) {
                document.getElementById('operatorInfo').style.display = 'none';
                document.getElementById('plansSection').style.display = 'none';
            }
        });
    }
    
    if (operatorSelect) {
        operatorSelect.addEventListener('change', (e) => {
            const operator = e.target.value;
            const mobile = mobileInput?.value;
            if (operator && mobile && mobile.length === 10) {
                selectedOperator = operator;
                showOperatorInfo(operator);
                loadPlans(operator);
            }
        });
    }
}, 100);

function detectOperator(mobile) {
    const prefix = mobile.substring(0, 2);
    for (const [operator, patterns] of Object.entries(operatorPatterns)) {
        if (patterns.includes(prefix)) return operator;
    }
    return null;
}

function showOperatorInfo(operator) {
    const info = document.getElementById('operatorInfo');
    const logo = document.getElementById('operatorLogo');
    const name = document.getElementById('operatorName');
    
    logo.className = 'operator-logo ' + operator;
    logo.textContent = operator.toUpperCase().substring(0, 3);
    name.textContent = operator.charAt(0).toUpperCase() + operator.slice(1);
    info.style.display = 'flex';
}

function loadPlans(operator) {
    document.getElementById('plansSection').style.display = 'block';
    const category = document.querySelector('.tab-btn.active')?.dataset.category || 'popular';
    displayPlans(operator, category);
}

// Plan Tabs
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        if (selectedOperator) {
            displayPlans(selectedOperator, btn.dataset.category);
        }
    });
});

function displayPlans(operator, category) {
    const container = document.getElementById('plansContainer');
    const plans = planData[operator]?.[category] || [];
    
    if (plans.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No plans available</p></div>';
        return;
    }
    
    container.innerHTML = plans.map((plan, index) => `
        <div class="plan-card ${plan.popular ? 'popular' : ''}" onclick='selectPlan(${index}, "${operator}", "${category}")'>
            <div class="plan-header">
                <div>
                    <div class="plan-price">${plan.price}</div>
                    <div class="plan-validity">${plan.validity}</div>
                </div>
            </div>
            <div class="plan-data">${plan.data}</div>
            <ul class="plan-benefits">
                ${plan.benefits.map(b => `<li>${b}</li>`).join('')}
            </ul>
            ${plan.ott && plan.ott.length ? `
                <div class="plan-ott">
                    ${plan.ott.map(o => `<div class="ott-logo ${o}">${o.substring(0, 2).toUpperCase()}</div>`).join('')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

function selectPlan(index, operator, category) {
    const plan = planData[operator][category][index];
    selectedPlan = plan;
    const mobile = document.getElementById('mobileNumber').value;
    
    document.getElementById('summaryMobile').textContent = '+91 ' + mobile;
    document.getElementById('summaryOperator').textContent = operator.charAt(0).toUpperCase() + operator.slice(1);
    document.getElementById('summaryPlan').textContent = `${plan.data} - ${plan.validity}`;
    document.getElementById('summaryAmount').textContent = plan.price;
    document.getElementById('payAmount').textContent = plan.price;
    
    showPayment();
}

// Payment
document.querySelectorAll('.payment-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.payment-option').forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        selectedPaymentMethod = option.dataset.method;
    });
});

function processPayment() {
    if (!selectedPaymentMethod) {
        alert('Please select a payment method');
        return;
    }
    
    const transaction = {
        id: 'TXN' + Date.now(),
        amount: selectedPlan.price,
        date: new Date().toLocaleString(),
        mobile: document.getElementById('mobileNumber').value,
        status: 'completed'
    };
    
    transactions.push(transaction);
    
    document.getElementById('transactionId').textContent = transaction.id;
    document.getElementById('transactionAmount').textContent = transaction.amount;
    document.getElementById('transactionDate').textContent = transaction.date;
    document.getElementById('transactionMobile').textContent = '+91 ' + transaction.mobile;
    
    showSuccess();
}

function downloadReceipt() {
    alert('Receipt download feature coming soon!');
}

function shareReceipt() {
    alert('Share receipt feature coming soon!');
}

// Placeholder functions
function showNotifications() { alert('Notifications feature coming soon!'); }
function showDTH() { alert('DTH recharge coming soon!'); }
function showBills(type) { alert(`${type} bill payment coming soon!`); }
function showFastag() { alert('FASTag recharge coming soon!'); }
function showBroadband() { alert('Broadband bill payment coming soon!'); }
function showFilters() { alert('Filters coming soon!'); }
function showSavedNumbers() { alert('Saved numbers coming soon!'); }
function showSupport() { alert('Customer support coming soon!'); }
function showAbout() { alert('About app coming soon!'); }
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        location.reload();
    }
}
