// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scroll function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Map functionality
function openMap() {
    const address = "A Casa com Jardim, R. Visc. de Barbacena, 370 - Várzea, Recife - PE, Brasil";
    const encodedAddress = encodeURIComponent(address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
}

// Add to calendar functionality
function addToCalendar() {
    const title = "Aniversário da Melissa - 1 Aninho";
    const details = "Festa tema Ursinho Pooh - Guardiã do Bosque Encantado. Local: A Casa com Jardim";
    const location = "A Casa com Jardim, R. Visc. de Barbacena, 370 - Várzea, Recife - PE, Brasil";
    const startDate = "20251214T150000";
    const endDate = "20251214T180000";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    
    window.open(googleCalendarUrl, '_blank');
}

// Active navigation highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Gift selection functionality
class GiftManager {
    constructor() {
        this.selectedGifts = JSON.parse(localStorage.getItem('selectedGifts') || '{}');
        this.initGiftButtons();
        this.updateGiftButtons();
    }

    initGiftButtons() {
        document.querySelectorAll('.gift-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const giftItem = e.target.closest('.gift-item');
                const giftName = giftItem.querySelector('.gift-name').textContent.trim();
                const category = e.target.closest('.gift-category').querySelector('h3').textContent.trim();
                
                if (button.classList.contains('copy-pix')) {
                    this.copyPixToClipboard(giftName);
                    return;
                }
                
                if (button.classList.contains('mercado-pago-btn')) {
                    this.openMercadoPago();
                    return;
                }
                
                if (button.classList.contains('bank-transfer-btn')) {
                    this.showBankDetails();
                    return;
                }
                
                this.toggleGift(giftName, category, button);
            });
        });
    }

    toggleGift(giftName, category, button) {
        const giftKey = `${category}-${giftName}`;
        
        if (this.selectedGifts[giftKey]) {
            // Remove gift
            delete this.selectedGifts[giftKey];
            button.textContent = 'Escolher';
            button.style.background = '';
            this.showNotification(`Presente removido: ${giftName}`, 'info');
        } else {
            // Add gift
            this.selectedGifts[giftKey] = {
                name: giftName,
                category: category,
                selectedBy: 'Usuário', // Could be expanded to include name
                selectedAt: new Date().toISOString()
            };
            button.textContent = 'Escolhido';
            button.style.background = '#2A9D8F';
            button.style.color = 'white';
            this.showNotification(`Presente selecionado: ${giftName}`, 'success');
        }
        
        localStorage.setItem('selectedGifts', JSON.stringify(this.selectedGifts));
        this.updateGiftButtons();
    }

    updateGiftButtons() {
        document.querySelectorAll('.gift-button').forEach(button => {
            if (button.classList.contains('copy-pix')) return;
            
            const giftItem = button.closest('.gift-item');
            const giftName = giftItem.querySelector('.gift-name').textContent.trim();
            const category = button.closest('.gift-category').querySelector('h3').textContent.trim();
            const giftKey = `${category}-${giftName}`;
            
            if (this.selectedGifts[giftKey]) {
                button.textContent = 'Escolhido';
                button.style.background = '#2A9D8F';
                button.style.color = 'white';
            } else {
                button.textContent = 'Escolher';
                button.style.background = '';
                button.style.color = '';
            }
        });
    }

    copyPixToClipboard(pixKey) {
        // Extract PIX key from the text (remove "PIX: " prefix)
        const cleanPixKey = pixKey.replace('PIX: ', '');
        
        navigator.clipboard.writeText(cleanPixKey).then(() => {
            this.showNotification('Chave PIX copiada! 📋', 'success');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = cleanPixKey;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showNotification('Chave PIX copiada! 📋', 'success');
        });
    }

    openMercadoPago() {
        // Placeholder - você precisará substituir pela sua URL do Mercado Pago
        const mercadoPagoLink = 'https://link.mercadopago.com.br/melissaaniversario';
        
        // Por enquanto, mostra um modal com instruções
        this.showContributionModal('mercadopago', {
            title: 'Contribuição via Mercado Pago',
            message: 'Para configurar o link do Mercado Pago:<br><br>1. Acesse mercadopago.com.br<br>2. Crie um link de cobrança<br>3. Substitua a URL no código<br><br>Por enquanto, use o PIX: gabrielibson@gmail.com',
            buttonText: 'Entendi'
        });
    }

    showBankDetails() {
        this.showContributionModal('bank', {
            title: 'Dados para Transferência Bancária',
            message: `
                <div class="bank-details">
                    <p><strong>Favorecido:</strong> Gabriel Ibson de Souza</p>
                    <p><strong>PIX:</strong> gabrielibson@gmail.com</p>
                    <br>
                    <p><em>Dados bancários completos serão adicionados em breve.</em></p>
                    <br>
                    <p>Por enquanto, recomendamos usar o PIX para maior praticidade!</p>
                </div>
            `,
            buttonText: 'Copiar PIX',
            action: () => this.copyPixToClipboard('PIX: gabrielibson@gmail.com')
        });
    }

    showContributionModal(type, config) {
        const modal = document.createElement('div');
        modal.className = 'contribution-modal';
        modal.innerHTML = `
            <div class="contribution-content">
                <div class="contribution-header">
                    <i class="fas fa-heart"></i>
                    <h2>${config.title}</h2>
                </div>
                <div class="contribution-body">
                    <div class="contribution-message">${config.message}</div>
                </div>
                <div class="contribution-actions">
                    <button class="contribution-action-btn" onclick="this.parentElement.parentElement.parentElement.remove()${config.action ? `; (${config.action.toString()})()` : ''}">
                        ${config.buttonText}
                    </button>
                    <button class="contribution-close-btn" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Fechar
                    </button>
                </div>
            </div>
        `;

        // Style the modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000',
            animation: 'fadeIn 0.3s ease-out'
        });

        const content = modal.querySelector('.contribution-content');
        Object.assign(content.style, {
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            animation: 'slideInUp 0.3s ease-out'
        });

        document.body.appendChild(modal);
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        `;

        // Style notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            background: type === 'success' ? '#2A9D8F' : '#F4A259',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '1rem',
            fontWeight: '500',
            animation: 'slideInRight 0.3s ease-out'
        });

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getSelectedGiftsSummary() {
        const summary = {};
        Object.values(this.selectedGifts).forEach(gift => {
            if (!summary[gift.category]) {
                summary[gift.category] = [];
            }
            summary[gift.category].push(gift.name);
        });
        return summary;
    }
}

// RSVP Form Management
class RSVPManager {
    constructor() {
        // Google Forms configuration
        this.googleFormURL = 'https://docs.google.com/forms/d/e/1FAIpQLScjGhBW28pWZaywITtF3d2qIPArXBgzVJGvlsqj6JzVKePY2Q/formResponse';
        this.fieldIDs = {
            email: 'entry.1091219066',
            name: 'entry.1843674912',
            phone: 'entry.2126909386',
            adults: 'entry.275358839',
            children: 'entry.1742094538',
            dietary: 'entry.707865286'
        };
        this.initForm();
    }

    initForm() {
        const form = document.getElementById('rsvpForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            adults: formData.get('adults'),
            children: formData.get('children'),
            dietary: formData.get('dietary'),
            submittedAt: new Date().toISOString()
        };

        // Show loading state
        const submitButton = e.target.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Send to Google Forms
            await this.sendToGoogleForms(data);

            // Also save locally as backup
            this.saveRSVP(data);

            // Show success confirmation
            this.showConfirmation(data);
        } catch (error) {
            console.error('Erro ao enviar confirmação:', error);
            // Even if Google Forms fails, save locally and show confirmation
            this.saveRSVP(data);
            this.showConfirmation(data, true); // true = show warning about possible error
        } finally {
            // Reset button
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    }

    async sendToGoogleForms(data) {
        // Use fetch with no-cors mode
        // Note: We won't get a response due to CORS, but the submission will work
        const formData = new FormData();
        formData.append(this.fieldIDs.name, data.name);
        formData.append(this.fieldIDs.email, data.email || '');
        formData.append(this.fieldIDs.phone, data.phone || '');
        formData.append(this.fieldIDs.adults, data.adults);
        formData.append(this.fieldIDs.children, data.children);
        formData.append(this.fieldIDs.dietary, data.dietary || '');

        try {
            // Submit to Google Forms
            await fetch(this.googleFormURL, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // This prevents CORS errors but we won't get response
            });

            console.log('Dados enviados para Google Forms');

            // Wait to ensure submission completes
            await new Promise(resolve => setTimeout(resolve, 800));

        } catch (error) {
            console.error('Erro ao enviar:', error);
            throw error;
        }
    }

    saveRSVP(data) {
        const existingRSVPs = JSON.parse(localStorage.getItem('rsvps') || '[]');
        existingRSVPs.push(data);
        localStorage.setItem('rsvps', JSON.stringify(existingRSVPs));
    }

    showConfirmation(data, hasError = false) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <i class="fas fa-heart"></i>
                    <h2>Obrigado, ${data.name}!</h2>
                </div>
                <div class="confirmation-body">
                    <p>Sua confirmação foi enviada com muito carinho!</p>
                    ${hasError ? '<p class="warning-text"><small>⚠️ Houve um problema ao enviar. Por favor, confirme pelo WhatsApp para garantir.</small></p>' : '<p class="success-text">✓ Confirmação registrada com sucesso!</p>'}
                    <div class="confirmation-details">
                        <p><strong>Adultos:</strong> ${data.adults}</p>
                        <p><strong>Crianças:</strong> ${data.children}</p>
                        ${data.dietary ? `<p><strong>Restrições:</strong> ${data.dietary}</p>` : ''}
                    </div>
                    <p class="celebration-text">Mal podemos esperar para celebrar com vocês! 🎉</p>
                </div>
                <button class="close-confirmation" onclick="this.parentElement.parentElement.remove()">
                    Fechar
                </button>
            </div>
        `;

        // Style the modal
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '10000',
            animation: 'fadeIn 0.3s ease-out'
        });

        const content = modal.querySelector('.confirmation-content');
        Object.assign(content.style, {
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            maxWidth: '500px',
            width: '90%',
            textAlign: 'center',
            position: 'relative',
            animation: 'slideInUp 0.3s ease-out'
        });

        document.body.appendChild(modal);

        // Reset form
        document.getElementById('rsvpForm').reset();
    }
}

// Image Gallery Management
class GalleryManager {
    constructor() {
        this.initGallery();
    }

    initGallery() {
        // Add click handlers for gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                // Future: Open lightbox/modal for full-size view
                console.log('Gallery item clicked - implement lightbox here');
            });
        });
    }

    // Method to add new images (for future use)
    addImage(src, alt, type = 'image') {
        const galleryGrid = document.querySelector('.gallery-grid');
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        
        if (type === 'image') {
            galleryItem.innerHTML = `<img src="${src}" alt="${alt}" loading="lazy">`;
        } else if (type === 'video') {
            galleryItem.innerHTML = `<video src="${src}" poster="" preload="metadata" controls></video>`;
        }
        
        galleryGrid.appendChild(galleryItem);
    }
}

// Intersection Observer for animations
class AnimationManager {
    constructor() {
        this.initScrollAnimations();
        this.initFloatingCharacters();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('.info-card, .gift-category, .gallery-item, .story-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    initFloatingCharacters() {
        const characters = document.querySelectorAll('.character-img');
        
        if (characters.length === 0) return;

        let ticking = false;

        const updateCharacters = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            characters.forEach((character, index) => {
                // Show characters when scrolling starts
                const showThreshold = 150 + (index * 100);
                const hideThreshold = documentHeight - windowHeight - 200;
                
                if (scrollY > showThreshold && scrollY < hideThreshold) {
                    character.classList.add('show');
                } else {
                    character.classList.remove('show');
                }

                // Subtle parallax movement
                const parallaxSpeed = 0.3 + (index * 0.1);
                const offset = scrollY * parallaxSpeed;
                
                // Individual character movements
                if (character.classList.contains('pooh-left')) {
                    character.style.transform = `translateY(${Math.sin(scrollY * 0.002) * 8 + offset * 0.5}px) scale(${character.classList.contains('show') ? 1 : 0.7})`;
                } else if (character.classList.contains('tigger-left')) {
                    character.style.transform = `translateY(${Math.sin(scrollY * 0.003) * 12 - offset * 0.3}px) scale(${character.classList.contains('show') ? 1 : 0.7})`;
                } else if (character.classList.contains('piglet-right')) {
                    character.style.transform = `translateY(${Math.cos(scrollY * 0.0025) * 6 + offset * 0.4}px) scale(${character.classList.contains('show') ? 1 : 0.7})`;
                } else if (character.classList.contains('eeyore-right')) {
                    character.style.transform = `translateY(${Math.sin(scrollY * 0.0015) * 5 - offset * 0.2}px) scale(${character.classList.contains('show') ? 1 : 0.7})`;
                }
            });

            ticking = false;
        };

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateCharacters);
                ticking = true;
            }
        };

        // Add hover interactions
        characters.forEach(character => {
            character.addEventListener('mouseenter', () => {
                character.style.animation = 'bounce 0.5s ease-in-out';
            });
            
            character.addEventListener('animationend', () => {
                character.style.animation = '';
            });
        });

        window.addEventListener('scroll', onScroll);
        
        // Initial call
        updateCharacters();
    }
}

// Countdown Timer (for future use when date is set)
class CountdownManager {
    constructor(targetDate) {
        this.targetDate = new Date(targetDate).getTime();
        this.initCountdown();
    }

    initCountdown() {
        const countdownElement = document.createElement('div');
        countdownElement.className = 'countdown-timer';
        countdownElement.innerHTML = `
            <div class="countdown-container">
                <div class="countdown-item">
                    <span class="countdown-number" id="days">00</span>
                    <span class="countdown-label">Dias</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="hours">00</span>
                    <span class="countdown-label">Horas</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="minutes">00</span>
                    <span class="countdown-label">Minutos</span>
                </div>
                <div class="countdown-item">
                    <span class="countdown-number" id="seconds">00</span>
                    <span class="countdown-label">Segundos</span>
                </div>
            </div>
        `;

        // Insert after hero date
        const heroDate = document.querySelector('.hero-date');
        if (heroDate && this.targetDate > Date.now()) {
            heroDate.insertAdjacentElement('afterend', countdownElement);
            this.startCountdown();
        }
    }

    startCountdown() {
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = this.targetDate - now;

            if (distance < 0) {
                document.querySelector('.countdown-timer').innerHTML = '<p class="countdown-ended">🎉 É hoje! 🎉</p>';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        };

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
}

// Add custom CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideInUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from { 
            opacity: 0;
            transform: translateX(30px);
        }
        to { 
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from { 
            opacity: 1;
            transform: translateX(0);
        }
        to { 
            opacity: 0;
            transform: translateX(30px);
        }
    }

    .nav-link.active {
        color: var(--honey-color);
    }

    .nav-link.active::after {
        width: 100%;
    }

    .confirmation-modal .confirmation-header {
        margin-bottom: 25px;
    }

    .confirmation-modal .confirmation-header i {
        font-size: 3rem;
        color: var(--honey-color);
        margin-bottom: 15px;
    }

    .confirmation-modal h2 {
        font-family: 'Fredoka One', cursive;
        color: var(--text-dark);
        margin: 0;
    }

    .confirmation-details {
        background: rgba(244, 162, 89, 0.1);
        padding: 20px;
        border-radius: 10px;
        margin: 20px 0;
        text-align: left;
    }

    .message-preview {
        background: rgba(168, 218, 220, 0.1);
        padding: 15px;
        border-radius: 10px;
        margin: 15px 0;
        font-style: italic;
    }

    .celebration-text {
        color: var(--honey-color);
        font-weight: 600;
        font-size: 1.1rem;
        margin-top: 20px;
    }

    .warning-text {
        color: #F4A259;
        font-size: 0.9rem;
        margin: 10px 0;
        padding: 10px;
        background: rgba(244, 162, 89, 0.1);
        border-radius: 8px;
        border-left: 3px solid #F4A259;
    }

    .instruction-text {
        color: #2A9D8F;
        font-size: 1rem;
        margin: 15px 0;
        padding: 15px;
        background: rgba(42, 157, 143, 0.1);
        border-radius: 8px;
        border-left: 3px solid #2A9D8F;
    }

    .success-text {
        color: #2A9D8F;
        font-size: 1rem;
        font-weight: 600;
        margin: 15px 0;
        padding: 12px;
        background: rgba(42, 157, 143, 0.15);
        border-radius: 8px;
    }

    .close-confirmation {
        background: linear-gradient(135deg, var(--honey-color) 0%, var(--secondary-color) 100%);
        color: white;
        border: none;
        padding: 12px 30px;
        border-radius: 25px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 20px;
        transition: all 0.3s ease;
    }

    .close-confirmation:hover {
        transform: scale(1.05);
    }

    .countdown-timer {
        margin: 30px 0;
        text-align: center;
    }

    .countdown-container {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
    }

    .countdown-item {
        background: rgba(255, 255, 255, 0.2);
        padding: 15px;
        border-radius: 15px;
        min-width: 80px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(244, 162, 89, 0.3);
    }

    .countdown-number {
        display: block;
        font-family: 'Fredoka One', cursive;
        font-size: 2rem;
        color: var(--honey-color);
        margin-bottom: 5px;
    }

    .countdown-label {
        font-size: 0.9rem;
        color: var(--text-dark);
        font-weight: 600;
    }

    .countdown-ended {
        font-family: 'Fredoka One', cursive;
        font-size: 2rem;
        color: var(--honey-color);
        margin: 20px 0;
        animation: bounce 1s ease-in-out infinite;
    }

    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
        }
        40% {
            transform: translateY(-15px);
        }
        60% {
            transform: translateY(-7px);
        }
    }

    @keyframes wiggle {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(1deg); }
        75% { transform: rotate(-1deg); }
    }

    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    /* Character side decorations animations */
    .character-img {
        transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .character-img.show {
        opacity: 0.85;
        transform: scale(1);
    }

    .character-img:not(.show) {
        opacity: 0;
        transform: scale(0.7);
    }

    .character-img:hover {
        transform: scale(1.15) !important;
        filter: brightness(1.1) contrast(1.05);
    }

    /* Individual character base animations */
    .pooh-left {
        animation: float 6s ease-in-out infinite;
    }

    .tigger-left {
        animation: bounce 4s ease-in-out infinite;
        animation-delay: -1s;
    }

    .piglet-right {
        animation: float 7s ease-in-out infinite;
        animation-delay: -2s;
    }

    .eeyore-right {
        animation: float 8s ease-in-out infinite;
        animation-delay: -3s;
    }

`;
document.head.appendChild(style);

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new GiftManager();
    new RSVPManager();
    new GalleryManager();
    new AnimationManager();
    
    // Countdown timer for the party
    new CountdownManager('2025-12-14 15:00:00');
    
    console.log('🍯 Site da Mel carregado com sucesso! 🎉');
});

// Utility function to add event listeners
function addGlobalEventListeners() {
    // Handle external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // Lazy loading for images (when added)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Call on load
window.addEventListener('load', addGlobalEventListeners);