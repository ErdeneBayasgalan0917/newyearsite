// ===== GLOBAL VARIABLES =====
let countdownInterval;
let backgroundMusic;
let effectsEnabled = true;
let musicEnabled = true;

// Drawing system
let canvas, ctx;
let isDrawing = false;
let currentDrawingTool = null;
let drawingEnabled = false;

// Language Support
let currentLanguage = 'en'; // 'en' or 'mn'

// Translations
const translations = {
    en: {
        welcomeTitle: 'Welcome to',
        newYearTitle: 'New Year 2026',
        cardCollectionTitle: 'Card Collection',
        timeUntilLabel: 'Time Until New Year',
        daysLabel: 'Days',
        hoursLabel: 'Hours',
        minutesLabel: 'Minutes',
        secondsLabel: 'Seconds',
        enterCodeTitle: 'Enter Your Personal Card Code',
        codePlaceholder: 'Enter your unique code',
        viewCardBtn: 'View My Card',
        backBtn: '← Back to Countdown',
        accessHint: '💡 Your personal code was shared with you privately',
        senderName: '- With love from Erdene',
        newYearGreeting: '🎉 Happy New Year 2026! 🎉',
        invalidCode: 'Invalid card code. Please check and try again.',
        enterCode: 'Please enter your card code',
        cardRevealed: 'Your card has been revealed! 🎉'
    },
    mn: {
        welcomeTitle: 'Тавтай морил',
        newYearTitle: '2026 Шинэ жил',
        cardCollectionTitle: 'Картын цуглуулга',
        timeUntilLabel: 'Шинэ жил хүртэлх хугацаа',
        daysLabel: 'Өдөр',
        hoursLabel: 'Цаг',
        minutesLabel: 'Минут',
        secondsLabel: 'Секунд',
        enterCodeTitle: 'Хувийн картын кодоо оруулна уу',
        codePlaceholder: 'Өөрийн кодоо оруулна уу',
        viewCardBtn: 'Миний картыг үзэх',
        backBtn: '← Буцах',
        accessHint: '💡 Таны хувийн код танд хувийн байдлаар хуваалцсан',
        senderName: '- Эрдэнэгээс хайраар',
        newYearGreeting: '🎉 2026 оны шинэ жилийн мэнд хүргэе! 🎉',
        invalidCode: 'Буруу карт код. Дахин шалгаад оролдоно уу.',
        enterCode: 'Картын кодоо оруулна уу',
        cardRevealed: 'Таны карт нээгдлээ! 🎉'
    }
};

// Bilingual Sample card data
const cardData = {
    'HAPPY2026': {
        image: 'assets/cards/card-happy-2026.jpg',
        message: {
            en: 'Wishing you joy, prosperity, and endless happiness in 2026! May all your dreams come true.',
            mn: '2026 онд танд баяр баясгалан, хөгжил дэвшил, төгсгөлгүй аз жаргал хүсье! Бүх мөрөөдөл тань биелэг!'
        },
        recipient: {
            en: 'Dear Friend',
            mn: 'Хайрт найз минь'
        }
    },
    'SPARKLE26': {
        image: 'assets/cards/card-sparkle-2026.jpg',
        message: {
            en: 'May your new year sparkle with joy and shine with success. Here\'s to new adventures!',
            mn: 'Шинэ жил тань баяр баясгалангаар гэрэлтэж, амжилтаар гялалзаг! Шинэ адал явдалд!'
        },
        recipient: {
            en: 'Family',
            mn: 'Гэр бүл'
        }
    },
    'DREAMS26': {
        image: 'assets/cards/card-dreams-2026.jpg',
        message: {
            en: 'Chase your dreams in 2026 and beyond. You have the power to make amazing things happen!',
            mn: '2026 болон цаашид мөрөөдлөө хөөцөлдөөрэй. Танд гайхамшигтай зүйлсийг бүтээх хүч бий!'
        },
        recipient: {
            en: 'Special One',
            mn: 'Онцгой хүн'
        }
    },
    'UZI2026' : {
        image: 'assets/cards/uzi_2026.png',
        message: {
            en: 'Wishing you a powerful and successful 2026!',
            mn: 'Чамдаа хүчтэй, амжилттай 2026 он хүсье!'
        },
        recipient: {
            en: 'Uzi Fan',
            mn: 'Өлзийт фен'
        }
    }
    // Add more cards as needed
};

// Krita Asset Collections
const kritaAssets = {
    trees: [
        'assets/decorations/trees/tree1.png',
        'assets/decorations/trees/tree2.png',
        'assets/decorations/trees/tree3.png',
        'assets/decorations/trees/tree4.png'
    ],
    snowflakes: [
        'assets/decorations/snowflakes/snowflake1.png',
        'assets/decorations/snowflakes/snowflake2.png',
        'assets/decorations/snowflakes/snowflake3.png',
        'assets/decorations/snowflakes/snowflake4.png',
        'assets/decorations/snowflakes/snowflake5.png'
    ],
    ornaments: [
        'assets/decorations/ornaments/ornament-ball-red.png',
        'assets/decorations/ornaments/ornament-ball-gold.png',
        'assets/decorations/ornaments/ornament-bell.png',
        'assets/decorations/ornaments/ornament-star.png',
        'assets/decorations/ornaments/ornament-candy-cane.png'
    ],
    effects: [
        'assets/decorations/effects/sparkle1.png',
        'assets/decorations/effects/sparkle2.png',
        'assets/decorations/effects/glow-effect.png',
        'assets/decorations/effects/magic-dust.png'
    ]
};

// Asset loading status
let assetsLoaded = {
    trees: [],
    snowflakes: [],
    ornaments: [],
    effects: []
};

// Fallback emoji for missing assets
const fallbackEmojis = {
    trees: ['🌲', '🎄', '🌳'],
    snowflakes: ['❄️', '❅️', '❆️'],
    ornaments: ['🎅', '🎁', '⭐', '🔔'],
    effects: ['✨', '🎆', '✨', '💫']
};

// ===== DOM ELEMENTS =====
const elements = {
    snowContainer: document.getElementById('snow-container'),
    confettiContainer: document.getElementById('confetti-container'),
    sparklesContainer: document.getElementById('sparkles-container'),
    decorationsContainer: document.getElementById('decorations-container'),
    musicToggle: document.getElementById('music-toggle'),
    effectsToggle: document.getElementById('effects-toggle'),
    languageToggle: document.getElementById('language-toggle'),
    landingSection: document.getElementById('landing'),
    cardSection: document.getElementById('card-section'),
    cardCodeInput: document.getElementById('card-code'),
    viewCardBtn: document.getElementById('view-card-btn'),
    backBtn: document.getElementById('back-btn'),
    cardDisplay: document.getElementById('card-display'),
    personalMessage: document.getElementById('personal-message'),
    daysElement: document.getElementById('days'),
    hoursElement: document.getElementById('hours'),
    minutesElement: document.getElementById('minutes'),
    secondsElement: document.getElementById('seconds'),
    
    // Drawing tools
    drawingToggle: document.getElementById('drawing-toggle'),
    drawingTools: document.getElementById('drawing-tools'),
    drawSnow: document.getElementById('draw-snow'),
    drawStars: document.getElementById('draw-stars'),
    drawTrees: document.getElementById('draw-trees'),
    drawOrnaments: document.getElementById('draw-ornaments'),
    clearDrawing: document.getElementById('clear-drawing'),
    drawingCanvas: document.getElementById('drawing-canvas')
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeEffects();
    initializeDrawingSystem();
    preloadKritaAssets();
    startCountdown();
    setupEventListeners();
    setupAudio();
    
    // Auto-start snow and sparkles
    createKritaSnowfall();
    createSparkles();
    createKritaDecorations();
    
    console.log('New Year Card Website Initialized! 🎉');
    console.log('Loading Krita assets...');
});

// ===== COUNTDOWN FUNCTIONALITY =====
function startCountdown() {
    const newYear = new Date('January 1, 2026 00:00:00').getTime();
    
    countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = newYear - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            handleNewYearReached();
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update display with animation
        updateTimeDisplay(elements.daysElement, days.toString().padStart(2, '0'));
        updateTimeDisplay(elements.hoursElement, hours.toString().padStart(2, '0'));
        updateTimeDisplay(elements.minutesElement, minutes.toString().padStart(2, '0'));
        updateTimeDisplay(elements.secondsElement, seconds.toString().padStart(2, '0'));
        
        // Play tick sound every second if effects enabled
        if (effectsEnabled && seconds !== parseInt(elements.secondsElement.textContent)) {
            playSound('countdown-tick', 0.1);
        }
    }, 1000);
}

function updateTimeDisplay(element, value) {
    if (element.textContent !== value) {
        element.style.transform = 'scale(1.1)';
        element.textContent = value;
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 200);
    }
}

function handleNewYearReached() {
    elements.daysElement.textContent = '00';
    elements.hoursElement.textContent = '00';
    elements.minutesElement.textContent = '00';
    elements.secondsElement.textContent = '00';
    
    // Start confetti celebration
    createConfettiExplosion();
    playSound('card-reveal-sound');
    
    // Update countdown label with translation
    const countdownLabel = document.querySelector('.countdown-label');
    countdownLabel.setAttribute('data-translate', 'newYearGreeting');
    updateLanguageContent();
}

// ===== CARD ACCESS SYSTEM =====
function setupEventListeners() {
    elements.viewCardBtn.addEventListener('click', handleViewCard);
    elements.backBtn.addEventListener('click', handleBackToLanding);
    elements.cardCodeInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleViewCard();
    });
    
    // Audio and language controls
    elements.musicToggle.addEventListener('click', toggleMusic);
    elements.effectsToggle.addEventListener('click', toggleEffects);
    elements.languageToggle.addEventListener('click', toggleLanguage);
    
    // Drawing tools
    elements.drawingToggle.addEventListener('click', toggleDrawingTools);
    elements.drawSnow.addEventListener('click', () => setDrawingTool('snow'));
    elements.drawStars.addEventListener('click', () => setDrawingTool('stars'));
    elements.drawTrees.addEventListener('click', () => setDrawingTool('trees'));
    elements.drawOrnaments.addEventListener('click', () => setDrawingTool('ornaments'));
    elements.clearDrawing.addEventListener('click', clearCanvas);
    
    // Input formatting
    elements.cardCodeInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    });
    
    // Initialize language content
    updateLanguageContent();
}

// ===== DRAWING SYSTEM =====
function initializeDrawingSystem() {
    canvas = elements.drawingCanvas;
    ctx = canvas.getContext('2d');
    
    // Set canvas size
    resizeCanvas();
    
    // Canvas event listeners
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
    
    window.addEventListener('resize', resizeCanvas);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function toggleDrawingTools() {
    drawingEnabled = !drawingEnabled;
    elements.drawingTools.classList.toggle('active', drawingEnabled);
    canvas.style.pointerEvents = drawingEnabled ? 'auto' : 'none';
    
    if (drawingEnabled) {
        showNotification('Drawing mode activated! Click tools below to draw.', 'success');
    } else {
        showNotification('Drawing mode disabled', 'info');
        currentDrawingTool = null;
        updateToolButtons();
    }
}

function setDrawingTool(tool) {
    if (!drawingEnabled) return;
    
    currentDrawingTool = tool;
    updateToolButtons();
    showNotification(`Drawing tool: ${tool}`, 'info');
}

function updateToolButtons() {
    document.querySelectorAll('.drawing-tools button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (currentDrawingTool) {
        const activeBtn = document.getElementById(`draw-${currentDrawingTool}`);
        if (activeBtn) activeBtn.classList.add('active');
    }
}

function startDrawing(e) {
    if (!drawingEnabled || !currentDrawingTool) return;
    
    isDrawing = true;
    draw(e);
}

function draw(e) {
    if (!isDrawing || !currentDrawingTool) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    drawCustomElement(x, y, currentDrawingTool);
    playSound('draw-sound', 0.1);
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                     e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function stopDrawing() {
    isDrawing = false;
}

function drawCustomElement(x, y, type) {
    // Instead of drawing on canvas, create DOM elements with Krita assets
    const element = document.createElement('div');
    element.className = 'decoration user-drawn';
    element.style.position = 'fixed';
    element.style.left = x + 'px';
    element.style.top = y + 'px';
    element.style.zIndex = '100';
    element.style.pointerEvents = 'none';
    
    let asset;
    let size = '40px';
    
    switch (type) {
        case 'snow':
            asset = getRandomAsset('snowflakes');
            size = '30px';
            break;
        case 'stars':
            asset = getRandomAsset('effects');
            size = '35px';
            break;
        case 'trees':
            asset = getRandomAsset('trees');
            size = '60px';
            break;
        case 'ornaments':
            asset = getRandomAsset('ornaments');
            size = '40px';
            break;
    }
    
    element.style.width = size;
    element.style.height = size;
    
    if (asset && asset.endsWith('.png')) {
        // Krita asset
        element.innerHTML = `<img src="${asset}" alt="${type}" style="width: 100%; height: 100%; object-fit: contain;">`;
    } else {
        // Fallback emoji
        element.textContent = asset || '✨';
        element.style.fontSize = size;
        element.style.lineHeight = '1';
        element.style.textAlign = 'center';
    }
    
    // Add animation
    element.style.animation = 'fadeInScale 0.5s ease-out';
    
    document.body.appendChild(element);
    
    // Store reference for clearing
    if (!window.userDrawnElements) {
        window.userDrawnElements = [];
    }
    window.userDrawnElements.push(element);
    
    // Remove after some time
    setTimeout(() => {
        if (element.parentNode) {
            element.style.animation = 'fadeOutScale 0.5s ease-in';
            setTimeout(() => {
                if (element.parentNode) {
                    element.parentNode.removeChild(element);
                }
                const index = window.userDrawnElements.indexOf(element);
                if (index > -1) {
                    window.userDrawnElements.splice(index, 1);
                }
            }, 500);
        }
    }, 10000); // Remove after 10 seconds
}

function clearCanvas() {
    // Clear canvas and DOM elements
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (window.userDrawnElements) {
        window.userDrawnElements.forEach(element => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        });
        window.userDrawnElements = [];
    }
    
    showNotification('All drawings cleared!', 'info');
}

// Add CSS animations for user-drawn elements
if (!document.getElementById('dynamic-styles')) {
    const style = document.createElement('style');
    style.id = 'dynamic-styles';
    style.textContent = `
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.5) rotate(-180deg);
            }
            to {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
        }
        
        @keyframes fadeOutScale {
            from {
                opacity: 1;
                transform: scale(1) rotate(0deg);
            }
            to {
                opacity: 0;
                transform: scale(0.3) rotate(180deg);
            }
        }
        
        .user-drawn {
            cursor: none;
            transition: transform 0.3s ease;
        }
        
        .user-drawn:hover {
            transform: scale(1.2) !important;
        }
    `;
    document.head.appendChild(style);
}

function handleViewCard() {
    const code = elements.cardCodeInput.value.trim();
    
    if (!code) {
        showNotification(getTranslation('enterCode'), 'error');
        return;
    }
    
    const card = cardData[code];
    
    if (!card) {
        showNotification(getTranslation('invalidCode'), 'error');
        elements.cardCodeInput.value = '';
        return;
    }
    
    displayCard(card);
    playSound('card-reveal-sound');
}

function displayCard(card) {
    // Page transition to card view
    transitionToSection('card-section');
    
    // Display card image
    const img = document.createElement('img');
    img.src = card.image;
    img.alt = `New Year Card for ${typeof card.recipient === 'object' ? card.recipient[currentLanguage] : card.recipient}`;
    img.onload = () => {
        elements.cardDisplay.innerHTML = '';
        elements.cardDisplay.appendChild(img);
    };
    
    img.onerror = () => {
        elements.cardDisplay.innerHTML = `
            <div style="padding: 3rem; background: rgba(255,255,255,0.1); border-radius: 15px;">
                <h3>🎊 Your Personal New Year Card 🎊</h3>
                <p style="margin-top: 1rem; color: #ffd700;">Card image will be loaded here</p>
                <p style="margin-top: 0.5rem; font-size: 0.9rem; opacity: 0.7;">
                    Place your Krita-designed card at: ${card.image}
                </p>
            </div>
        `;
    };
    
    // Display personal message in current language
    const message = typeof card.message === 'object' ? card.message[currentLanguage] : card.message;
    elements.personalMessage.textContent = message;
    
    // Start confetti for card reveal
    createConfettiExplosion();
    
    // Clear the input
    elements.cardCodeInput.value = '';
    
    showNotification(getTranslation('cardRevealed'), 'success');
}

function handleBackToLanding() {
    transitionToSection('landing');
    
    // Clear confetti
    elements.confettiContainer.classList.add('hidden');
    elements.confettiContainer.innerHTML = '';
}

// ===== LANGUAGE SYSTEM =====
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'mn' : 'en';
    updateLanguageContent();
    updateLanguageToggleButton();
    
    const langText = currentLanguage === 'en' ? 'Switched to English' : 'Монгол хэл дээр шилжлээ';
    showNotification(langText, 'success');
}

function updateLanguageContent() {
    // Update all elements with data-translate attribute
    const translatableElements = document.querySelectorAll('[data-translate]');
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-translate');
        element.textContent = getTranslation(key);
    });
    
    // Update placeholder text
    const placeholderElements = document.querySelectorAll('[data-translate-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-translate-placeholder');
        element.placeholder = getTranslation(key);
    });
}

function updateLanguageToggleButton() {
    const langToggle = elements.languageToggle;
    const icon = langToggle.querySelector('.icon');
    
    if (currentLanguage === 'en') {
        icon.textContent = 'EN';
        langToggle.classList.remove('mongolian');
    } else {
        icon.textContent = 'МН';
        langToggle.classList.add('mongolian');
    }
}

function getTranslation(key) {
    return translations[currentLanguage][key] || translations['en'][key] || key;
}

// ===== PAGE TRANSITIONS =====
function transitionToSection(sectionId) {
    const currentSection = document.querySelector('.section.active');
    const targetSection = document.getElementById(sectionId);
    
    if (currentSection === targetSection) return;
    
    // Start transition
    if (currentSection) {
        currentSection.classList.add('transitioning');
        currentSection.classList.remove('active');
    }
    
    // Delay for smooth transition
    setTimeout(() => {
        targetSection.classList.add('active');
        
        // Clean up transition classes
        if (currentSection) {
            currentSection.classList.remove('transitioning');
        }
    }, 300);
}

// ===== VISUAL EFFECTS =====
function initializeEffects() {
    // Set up containers
    elements.snowContainer.innerHTML = '';
    elements.confettiContainer.innerHTML = '';
    elements.sparklesContainer.innerHTML = '';
}

// ===== KRITA ASSET MANAGEMENT =====
function preloadKritaAssets() {
    Object.keys(kritaAssets).forEach(category => {
        kritaAssets[category].forEach(assetPath => {
            const img = new Image();
            img.onload = () => {
                assetsLoaded[category].push(assetPath);
                console.log(`✅ Loaded: ${assetPath}`);
            };
            img.onerror = () => {
                console.log(`❌ Failed to load: ${assetPath}`);
            };
            img.src = assetPath;
        });
    });
    
    // Check loading progress
    setTimeout(checkAssetLoadingProgress, 2000);
}

function checkAssetLoadingProgress() {
    const totalAssets = Object.values(kritaAssets).flat().length;
    const loadedAssets = Object.values(assetsLoaded).flat().length;
    
    console.log(`Asset loading progress: ${loadedAssets}/${totalAssets} loaded`);
    
    if (loadedAssets === 0) {
        showNotification('Using fallback graphics (Krita assets not found)', 'info');
    } else if (loadedAssets < totalAssets) {
        showNotification(`${loadedAssets}/${totalAssets} Krita assets loaded`, 'info');
    } else {
        showNotification('All Krita assets loaded successfully!', 'success');
    }
}

function getRandomAsset(category) {
    const loadedAssets = assetsLoaded[category];
    
    if (loadedAssets.length > 0) {
        return loadedAssets[Math.floor(Math.random() * loadedAssets.length)];
    } else {
        // Return fallback emoji
        const emojis = fallbackEmojis[category];
        return emojis[Math.floor(Math.random() * emojis.length)];
    }
}

function createKritaSnowfall() {
    const snowflakeCount = 50;
    
    for (let i = 0; i < snowflakeCount; i++) {
        setTimeout(() => {
            createKritaSnowflake();
        }, i * 300);
    }
    
    // Continue creating snowflakes
    setInterval(createKritaSnowflake, 800);
}

function createKritaSnowflake() {
    if (!effectsEnabled) return;
    
    const snowflake = document.createElement('div');
    const asset = getRandomAsset('snowflakes');
    const size = Math.random() > 0.7 ? 'large' : Math.random() > 0.4 ? 'medium' : 'small';
    
    if (asset.endsWith('.png')) {
        // Krita asset
        snowflake.className = `snowflake krita-asset size-${size}`;
        snowflake.innerHTML = `<img src="${asset}" alt="Snowflake" loading="lazy">`;
    } else {
        // Fallback emoji
        snowflake.className = `snowflake emoji size-${size}`;
        snowflake.textContent = asset;
    }
    
    const startPositionX = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 8 + 5; // 5-13 seconds
    
    snowflake.style.left = startPositionX + 'px';
    snowflake.style.animationDuration = animationDuration + 's';
    snowflake.style.opacity = Math.random() * 0.8 + 0.2;
    
    elements.snowContainer.appendChild(snowflake);
    
    // Remove snowflake after animation
    setTimeout(() => {
        if (snowflake.parentNode) {
            snowflake.parentNode.removeChild(snowflake);
        }
    }, animationDuration * 1000);
}

function createKritaDecorations() {
    const decorationCount = 15;
    
    for (let i = 0; i < decorationCount; i++) {
        setTimeout(() => {
            createRandomKritaDecoration();
        }, i * 1000);
    }
    
    // Continue creating decorations
    setInterval(createRandomKritaDecoration, 5000);
}

function createRandomKritaDecoration() {
    if (!effectsEnabled) return;
    
    const categories = ['ornaments', 'effects'];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const asset = getRandomAsset(category);
    
    const decoration = document.createElement('div');
    const decorationType = category === 'ornaments' ? 'ornament' : 'effect';
    
    decoration.className = `decoration ${decorationType}`;
    
    if (asset.endsWith('.png')) {
        // Krita asset
        decoration.innerHTML = `<img src="${asset}" alt="${decorationType}" loading="lazy">`;
    } else {
        // Fallback emoji
        decoration.textContent = asset;
        decoration.style.fontSize = '2rem';
        decoration.style.lineHeight = '1';
    }
    
    const x = Math.random() * (window.innerWidth - 50);
    const y = Math.random() * (window.innerHeight - 50);
    const animationDelay = Math.random() * 3;
    
    decoration.style.left = x + 'px';
    decoration.style.top = y + 'px';
    decoration.style.animationDelay = animationDelay + 's';
    
    elements.decorationsContainer.appendChild(decoration);
    
    // Remove decoration after some time
    setTimeout(() => {
        if (decoration.parentNode) {
            decoration.parentNode.removeChild(decoration);
        }
    }, 15000 + animationDelay * 1000);
}

function createSparkles() {
    const sparkleCount = 20;
    
    for (let i = 0; i < sparkleCount; i++) {
        setTimeout(() => {
            createSparkle();
        }, i * 500);
    }
    
    // Continue creating sparkles
    setInterval(createSparkle, 2000);
}

function createSparkle() {
    if (!effectsEnabled) return;
    
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerHTML = Math.random() > 0.5 ? '✨' : '⭐';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const animationDelay = Math.random() * 2;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.animationDelay = animationDelay + 's';
    
    elements.sparklesContainer.appendChild(sparkle);
    
    // Remove sparkle after animation
    setTimeout(() => {
        if (sparkle.parentNode) {
            sparkle.parentNode.removeChild(sparkle);
        }
    }, 2000 + animationDelay * 1000);
}

function createConfettiExplosion() {
    if (!effectsEnabled) return;
    
    elements.confettiContainer.classList.remove('hidden');
    const colors = ['red', 'gold', 'green', 'blue', 'purple'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            createConfettiPiece(colors);
        }, i * 50);
    }
    
    // Hide confetti container after animation
    setTimeout(() => {
        elements.confettiContainer.classList.add('hidden');
        elements.confettiContainer.innerHTML = '';
    }, 6000);
}

function createConfettiPiece(colors) {
    const confetti = document.createElement('div');
    confetti.className = `confetti ${colors[Math.floor(Math.random() * colors.length)]}`;
    
    const startX = Math.random() * window.innerWidth;
    const animationDuration = Math.random() * 4 + 3; // 3-7 seconds
    const size = Math.random() * 8 + 5; // 5-13px
    
    confetti.style.left = startX + 'px';
    confetti.style.width = size + 'px';
    confetti.style.height = size + 'px';
    confetti.style.animationDuration = animationDuration + 's';
    
    elements.confettiContainer.appendChild(confetti);
    
    // Remove confetti piece after animation
    setTimeout(() => {
        if (confetti.parentNode) {
            confetti.parentNode.removeChild(confetti);
        }
    }, animationDuration * 1000);
}

// ===== AUDIO SYSTEM =====
function setupAudio() {
    backgroundMusic = document.getElementById('background-music');
    backgroundMusic.volume = 0.3; // Set comfortable volume
}

function toggleMusic() {
    if (musicEnabled) {
        backgroundMusic.pause();
        elements.musicToggle.classList.remove('active');
        elements.musicToggle.innerHTML = '<span class="icon">🎵</span>';
        musicEnabled = false;
        showNotification('Music paused', 'info');
    } else {
        backgroundMusic.play().catch(() => {
            showNotification('Click to enable music (browser policy)', 'info');
        });
        elements.musicToggle.classList.add('active');
        elements.musicToggle.innerHTML = '<span class="icon">🎶</span>';
        musicEnabled = true;
        showNotification('Music playing', 'success');
    }
}

function toggleEffects() {
    effectsEnabled = !effectsEnabled;
    
    if (effectsEnabled) {
        elements.effectsToggle.classList.add('active');
        elements.effectsToggle.innerHTML = '<span class="icon">🔊</span>';
        showNotification('Effects enabled', 'success');
    } else {
        elements.effectsToggle.classList.remove('active');
        elements.effectsToggle.innerHTML = '<span class="icon">🔇</span>';
        showNotification('Effects disabled', 'info');
    }
}

function playSound(soundId, volume = 0.5) {
    if (!effectsEnabled) return;
    
    const audio = document.getElementById(soundId);
    if (audio) {
        audio.volume = volume;
        audio.currentTime = 0;
        audio.play().catch(() => {
            // Ignore audio play errors (browser policy)
        });
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const styles = {
        position: 'fixed',
        top: '100px',
        right: '30px',
        padding: '1rem 1.5rem',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        zIndex: '1000',
        transform: 'translateX(400px)',
        transition: 'all 0.3s ease',
        minWidth: '200px',
        textAlign: 'center',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.2)'
    };
    
    Object.assign(notification.style, styles);
    
    // Set color based on type
    switch (type) {
        case 'success':
            notification.style.background = 'rgba(76, 175, 80, 0.9)';
            break;
        case 'error':
            notification.style.background = 'rgba(244, 67, 54, 0.9)';
            break;
        case 'info':
        default:
            notification.style.background = 'rgba(33, 150, 243, 0.9)';
            break;
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== UTILITY FUNCTIONS =====
function isMobile() {
    return window.innerWidth <= 768;
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== WINDOW RESIZE HANDLING =====
window.addEventListener('resize', debounce(() => {
    // Adjust effects for mobile
    if (isMobile()) {
        // Reduce particle count on mobile for performance
        const snowflakes = document.querySelectorAll('.snowflake');
        if (snowflakes.length > 20) {
            for (let i = 20; i < snowflakes.length; i++) {
                snowflakes[i].remove();
            }
        }
    }
}, 250));

// ===== PERFORMANCE OPTIMIZATION =====
// Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause audio and effects when tab is not visible
        if (backgroundMusic && musicEnabled) {
            backgroundMusic.pause();
        }
    } else {
        // Resume audio when tab becomes visible
        if (backgroundMusic && musicEnabled) {
            backgroundMusic.play().catch(() => {});
        }
    }
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(`
🎉 Welcome to New Year 2026 Card Collection! 🎉

Features:
- ❄️  Snow falling animation
- 🎊 Confetti effects
- ✨ Sparkle animations
- 🌲 Swinging trees
- 🎵 Holiday music
- ⏰ Live countdown
- 🎴 Personal card system

Have a wonderful New Year! 🥳
`);