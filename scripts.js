// Extended scripts for multi-step login flow (OTP and Secure Login demo)

document.addEventListener('DOMContentLoaded', function () {
    // Existing common behaviors (nav/menu/scroll) are assumed to run from the shared scripts.js.
    // The branch's scripts.js will be replaced/merged by this file which includes both previous behaviors
    // and the new login flow handlers.

    const nav = document.querySelector('nav');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    function onScroll() {
        if (window.scrollY > 50) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (menuToggle) menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

    // --- AUTH DEMO KEYS ---
    const AUTH_KEY = 'amar_demo_user';

    // Demo credentials for first step
    const DEMO_EMAIL = 'admin@example.com';
    const DEMO_PASS = 'password';

    // Demo secure second password for "Secure Login"
    const DEMO_SECURE_SECOND = 'securepass';

    // Demo OTP
    const DEMO_OTP = '123456';

    // Elements
    const step1Form = document.getElementById('step1-form');
    const step1Message = document.getElementById('step1-message');
    const step2 = document.getElementById('step2');
    const optOtp = document.getElementById('opt-otp');
    const optSecure = document.getElementById('opt-secure');
    const optBack = document.getElementById('opt-back');

    const otpOptions = document.getElementById('otp-options');
    const otpPhone = document.getElementById('otp-phone');
    const otpMail = document.getElementById('otp-mail');
    const otpBack = document.getElementById('otp-back');
    const otpForm = document.getElementById('otp-form');
    const otpMsg = document.getElementById('otp-msg');
    const otpSendMsg = document.getElementById('otp-send-msg');
    const otpCancel = document.getElementById('otp-cancel');

    const secureForm = document.getElementById('secure-form');
    const secureMsg = document.getElementById('secure-msg');
    const secureCancel = document.getElementById('secure-cancel');

    const successBox = document.getElementById('login-success');

    // Utility to hide all step sections inside the login-card
    function resetAllSteps() {
        if (step1Form) step1Form.style.display = '';
        if (step2) step2.style.display = 'none';
        if (otpOptions) otpOptions.style.display = 'none';
        if (otpForm) otpForm.style.display = 'none';
        if (secureForm) secureForm.style.display = 'none';
        if (successBox) successBox.style.display = 'none';

        // clear messages
        if (step1Message) step1Message.textContent = '';
        if (otpMsg) otpMsg.textContent = '';
        if (secureMsg) secureMsg.textContent = '';
        if (otpSendMsg) otpSendMsg.textContent = 'Select how you want to receive your OTP.';
    }

    // Step 1 submit handler
    if (step1Form) {
        step1Form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = (document.getElementById('step1-email') || {}).value?.trim?.() || '';
            const password = (document.getElementById('step1-password') || {}).value || '';

            if (email === DEMO_EMAIL && password === DEMO_PASS) {
                // proceed to step 2
                step1Form.style.display = 'none';
                step2.style.display = '';
            } else {
                step1Message.style.color = '#ffb3b3';
                step1Message.textContent = 'Invalid email or password for demo. Use admin@example.com / password';
            }
        });
    }

    // Step2 handlers
    if (optOtp) optOtp.addEventListener('click', function () {
        step2.style.display = 'none';
        otpOptions.style.display = '';
    });
    if (optSecure) optSecure.addEventListener('click', function () {
        step2.style.display = 'none';
        secureForm.style.display = '';
    });
    if (optBack) optBack.addEventListener('click', function () {
        // go back to credentials
        resetAllSteps();
    });

    // OTP options
    if (otpPhone) otpPhone.addEventListener('click', function () {
        otpOptions.style.display = 'none';
        otpForm.style.display = '';
        otpSendMsg.textContent = 'OTP sent to your phone (demo code: 123456)';
    });
    if (otpMail) otpMail.addEventListener('click', function () {
        otpOptions.style.display = 'none';
        otpForm.style.display = '';
        otpSendMsg.textContent = 'OTP sent to your email (demo code: 123456)';
    });
    if (otpBack) otpBack.addEventListener('click', function () {
        otpOptions.style.display = 'none';
        step2.style.display = '';
    });

    // OTP form verify
    if (otpForm) {
        otpForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const code = (document.getElementById('otp-code') || {}).value?.trim?.() || '';
            if (code === DEMO_OTP) {
                // mark as logged in demo
                localStorage.setItem(AUTH_KEY, JSON.stringify({ email: DEMO_EMAIL, method: 'otp' }));
                otpMsg.style.color = '#b9ffd6';
                otpMsg.textContent = 'OTP verified — logging in...';
                otpForm.style.display = 'none';
                successBox.style.display = '';
                setTimeout(() => window.location.href = 'index.html', 900);
            } else {
                otpMsg.style.color = '#ffb3b3';
                otpMsg.textContent = 'Invalid OTP. Use 123456 for demo.';
            }
        });
    }
    if (otpCancel) otpCancel.addEventListener('click', function () {
        // cancel OTP and go to step2 options
        otpForm.style.display = 'none';
        otpOptions.style.display = '';
    });

    // Secure form verify (two passwords)
    if (secureForm) {
        secureForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const p1 = (document.getElementById('secure-pass1') || {}).value || '';
            const p2 = (document.getElementById('secure-pass2') || {}).value || '';

            // For demo: require primary to match DEMO_PASS and secondary to match DEMO_SECURE_SECOND
            if (p1 === DEMO_PASS && p2 === DEMO_SECURE_SECOND) {
                localStorage.setItem(AUTH_KEY, JSON.stringify({ email: DEMO_EMAIL, method: 'secure' }));
                secureMsg.style.color = '#b9ffd6';
                secureMsg.textContent = 'Verified — logging in...';
                secureForm.style.display = 'none';
                successBox.style.display = '';
                setTimeout(() => window.location.href = 'index.html', 900);
            } else {
                secureMsg.style.color = '#ffb3b3';
                secureMsg.textContent = 'Invalid secure passwords for demo. Use password + securepass';
            }
        });
    }
    if (secureCancel) secureCancel.addEventListener('click', function () {
        secureForm.style.display = 'none';
        step2.style.display = '';
    });

    // Update auth link (if any) to show Login/Logout
    const authLink = document.getElementById('auth-link');
    function updateAuthLink() {
        if (!authLink) return;
        const user = localStorage.getItem(AUTH_KEY) || sessionStorage.getItem(AUTH_KEY);
        if (user) {
            authLink.textContent = 'Logout';
            authLink.href = '#';
            authLink.addEventListener('click', function (e) {
                e.preventDefault();
                localStorage.removeItem(AUTH_KEY);
                sessionStorage.removeItem(AUTH_KEY);
                alert('Logged out (demo).');
                window.location.href = 'index.html';
            });
        } else {
            authLink.textContent = 'Login';
            authLink.href = 'login.html';
        }
    }
    updateAuthLink();

});
