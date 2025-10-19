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

// Dados dos presentes
const GIFTS_DATA = {
    "Aprendizagem e Desenvolvimento Motor": {
        icon: "fas fa-brain",
        items: [
            { name: "Brinquedo de encaixe", price: 90, emoji: "🧩" },
            { name: "Torre de anéis", price: 60, emoji: "🎯" },
            { name: "Blocos de montar", price: 120, emoji: "🧱" },
            { name: "Mesa de atividades", price: 250, emoji: "🎨" },
            { name: "Quebra-cabeça de madeira", price: 80, emoji: "🪵" },
            { name: "Brinquedo de puxar", price: 70, emoji: "🚂" }
        ]
    },
    "Cavalgáveis e Andadores": {
        icon: "fas fa-horse",
        items: [
            { name: "Andador educativo", price: 280, emoji: "🚶" },
            { name: "Cavalinho de balanço", price: 220, emoji: "🐴" },
            { name: "Triciclo com empurrador", price: 350, emoji: "🚲" },
            { name: "Carrinho de empurrar", price: 150, emoji: "🛒" },
            { name: "Balanço infantil", price: 200, emoji: "🪀" }
        ]
    },
    "Brinquedos e Livros": {
        icon: "fas fa-book",
        items: [
            { name: "Livrinhos infantis (kit 5)", price: 100, emoji: "📚" },
            { name: "Livros de pano/plástico", price: 60, emoji: "📖" },
            { name: "Brinquedo musical", price: 130, emoji: "🎹" },
            { name: "Bonecos/Pelúcias", price: 90, emoji: "🧸" },
            { name: "Brinquedos para banho", price: 50, emoji: "🛁" },
            { name: "Massinha de modelar", price: 45, emoji: "🎨" }
        ]
    },
    "Vestuário (18-24 meses)": {
        icon: "fas fa-tshirt",
        items: [
            { name: "Conjunto de roupas", price: 150, emoji: "👗" },
            { name: "Sapatinhos (18-21)", price: 80, emoji: "👟" },
            { name: "Vestidos/Conjuntos", price: 120, emoji: "👚" },
            { name: "Casaco/Agasalho", price: 100, emoji: "🧥" },
            { name: "Pijamas (kit 2)", price: 90, emoji: "🌙" }
        ]
    }
};

const PIX_KEY = "gabrielibson@gmail.com";
const APPS_SCRIPT_GIFTS_URL = 'https://script.google.com/macros/s/AKfycbzTHYSN0o-zqqN_XxaulQaBc3dbkFzPRg6JXoCdxzE1dASXLOzfQuzLXhVu7rnUIvjU/exec';

// Novo Gift Manager
class NewGiftManager {
    constructor() {
        this.contributions = JSON.parse(localStorage.getItem('giftContributions') || '{}');
        this.renderGifts();
    }

    renderGifts() {
        const container = document.getElementById('gifts-container');
        if (!container) return;

        let html = '';

        // Renderizar categorias normais com collapse
        Object.entries(GIFTS_DATA).forEach(([categoryName, categoryData], index) => {
            const categoryId = `category-${index}`;
            const itemCount = categoryData.items.length;

            html += `
                <div class="gift-category-new">
                    <button class="category-header-toggle" onclick="giftManager.toggleCategory('${categoryId}', this)">
                        <div class="category-title-content">
                            <i class="${categoryData.icon}"></i>
                            <span>${categoryName}<span class="category-item-count">(${itemCount} ${itemCount === 1 ? 'item' : 'itens'})</span></span>
                        </div>
                        <i class="fas fa-chevron-down category-toggle-icon"></i>
                    </button>
                    <div class="category-content" id="${categoryId}">
                        <div class="gift-cards-grid">
            `;

            categoryData.items.forEach(item => {
                html += this.createGiftCard(item);
            });

            html += `
                        </div>
                    </div>
                </div>
            `;
        });

        // Categoria Presentes Personalizados
        html += `
            <div class="gift-category-new">
                <button class="category-header-toggle" onclick="giftManager.toggleCategory('category-special', this)">
                    <div class="category-title-content">
                        <i class="fas fa-gift"></i>
                        <span>Presentes Personalizados</span>
                    </div>
                    <i class="fas fa-chevron-down category-toggle-icon"></i>
                </button>
                <div class="category-content" id="category-special">
                    <p class="category-note">💝 Tem um presente especial para a Mel? Conte para nós! Lembre-se: moramos em Portugal e temos limitação de bagagem. Itens pequenos e leves são mais fáceis de transportar.</p>
                    <div class="gift-cards-grid">
                        <div class="gift-card special-gift">
                            <div class="gift-icon">💝</div>
                            <h4>Tenho um presente especial</h4>
                            <p class="gift-description">Clique para nos contar sobre seu presente</p>
                            <button class="gift-btn" onclick="giftManager.showSpecialGiftForm()">Informar Presente</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Categoria Poupança da Mel
        html += `
            <div class="gift-category-new">
                <button class="category-header-toggle active" onclick="giftManager.toggleCategory('category-savings', this)">
                    <div class="category-title-content">
                        <i class="fas fa-piggy-bank"></i>
                        <span>Poupança da Mel</span>
                    </div>
                    <i class="fas fa-chevron-down category-toggle-icon rotated"></i>
                </button>
                <div class="category-content active" id="category-savings">
                    <div class="gift-cards-grid">
                        <div class="gift-card free-contribution">
                            <div class="gift-icon">💰</div>
                            <h4>Contribuição Livre</h4>
                            <p class="gift-description">Qualquer valor é bem-vindo!</p>
                            <button class="gift-btn" onclick="giftManager.showFreeContribution()">Contribuir</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    toggleCategory(categoryId, button) {
        const content = document.getElementById(categoryId);
        const icon = button.querySelector('.category-toggle-icon');

        content.classList.toggle('active');
        icon.classList.toggle('rotated');
        button.classList.toggle('active');
    }

    createGiftCard(item) {
        return `
            <div class="gift-card" data-gift="${item.name}" data-price="${item.price}">
                <div class="gift-icon">${item.emoji}</div>
                <h4>${item.name}</h4>
                <p class="gift-price">R$ ${item.price.toFixed(2).replace('.', ',')}</p>
                <button class="gift-btn" onclick="giftManager.showPaymentModal('${item.name}', ${item.price}, '${item.emoji}')">Presentear</button>
            </div>
        `;
    }

    showPaymentModal(giftName, price, emoji) {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="payment-content">
                <button class="close-modal-x" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="payment-header">
                    <div class="gift-icon">${emoji}</div>
                    <h2>${giftName}</h2>
                    <p class="price">R$ ${price.toFixed(2).replace('.', ',')}</p>
                </div>

                <div class="payment-options">
                    <div class="payment-option">
                        <h3><i class="fas fa-qrcode"></i> PIX</h3>
                        <div class="pix-key">${PIX_KEY}</div>
                        <button class="copy-pix-btn" onclick="giftManager.copyPix('${PIX_KEY}')">
                            <i class="fas fa-copy"></i> Copiar Chave PIX
                        </button>
                    </div>
                </div>

                <div class="contributor-form">
                    <p><strong>Após fazer a transferência, informe seu nome:</strong></p>
                    <input type="text" id="contributor-name" placeholder="Seu nome completo" required>

                    <div class="message-toggle">
                        <button type="button" class="toggle-message-btn" onclick="giftManager.toggleMessage(this)">
                            💌 Adicionar mensagem para a Mel (opcional)
                        </button>
                        <div class="message-field" style="display: none;">
                            <textarea id="gift-message" placeholder="Deixe uma mensagem carinhosa para a Mel..." rows="3"></textarea>
                        </div>
                    </div>

                    <button class="confirm-contribution-btn" onclick="giftManager.confirmContribution('${giftName}', ${price})">
                        Confirmar Contribuição
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    copyPix(pixKey) {
        navigator.clipboard.writeText(pixKey).then(() => {
            alert('✅ Chave PIX copiada!');
        });
    }

    toggleMessage(button) {
        const messageField = button.parentElement.querySelector('.message-field');
        if (messageField.style.display === 'none') {
            messageField.style.display = 'block';
            button.innerHTML = '💌 Ocultar mensagem';
        } else {
            messageField.style.display = 'none';
            button.innerHTML = '💌 Adicionar mensagem para a Mel (opcional)';
        }
    }

    async confirmContribution(giftName, price) {
        const nameInput = document.getElementById('contributor-name');
        const contributorName = nameInput.value.trim();
        const message = document.getElementById('gift-message')?.value.trim() || '';

        if (!contributorName) {
            alert('Por favor, informe seu nome.');
            return;
        }

        // Mostrar estado de carregamento
        const confirmButton = document.querySelector('.confirm-contribution-btn');
        const originalButtonText = confirmButton.textContent;
        confirmButton.textContent = '⏳ Processando...';
        confirmButton.disabled = true;

        try {
            // Salvar localmente
            if (!this.contributions[giftName]) {
                this.contributions[giftName] = [];
            }

            const contribution = {
                contributor: contributorName,
                price: price,
                date: new Date().toISOString()
            };

            this.contributions[giftName].push(contribution);
            localStorage.setItem('giftContributions', JSON.stringify(this.contributions));

            // Enviar para planilha Google
            await fetch(APPS_SCRIPT_GIFTS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'gift_contribution',
                    giftName: giftName,
                    contributor: contributorName,
                    amount: price,
                    message: message
                }),
                mode: 'no-cors'
            });

            // Atualizar UI
            this.renderGifts();

            // Fechar modal e mostrar confirmação
            document.querySelector('.payment-modal')?.remove();
            this.showGiftConfirmation(contributorName, giftName, price);
        } catch (error) {
            console.error('Erro ao enviar contribuição:', error);
            confirmButton.textContent = originalButtonText;
            confirmButton.disabled = false;
            alert('Houve um erro ao processar sua contribuição. Por favor, tente novamente.');
        }
    }

    showSpecialGiftForm() {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="payment-content">
                <button class="close-modal-x" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="payment-header">
                    <div class="gift-icon">💝</div>
                    <h2>Presente Personalizado</h2>
                </div>

                <div class="contributor-form">
                    <input type="text" id="special-name" placeholder="Seu nome" required>
                    <input type="email" id="special-email" placeholder="Seu email" required>
                    <input type="tel" id="special-phone" placeholder="Telefone/WhatsApp">
                    <textarea id="special-description" placeholder="Descreva seu presente especial..." rows="4" style="width: 100%; padding: 12px; border: 2px solid rgba(255, 184, 77, 0.3); border-radius: 10px; resize: vertical;"></textarea>

                    <div class="message-toggle">
                        <button type="button" class="toggle-message-btn" onclick="giftManager.toggleMessage(this)">
                            💌 Adicionar mensagem para a Mel (opcional)
                        </button>
                        <div class="message-field" style="display: none;">
                            <textarea id="special-message" placeholder="Deixe uma mensagem carinhosa para a Mel..." rows="3"></textarea>
                        </div>
                    </div>

                    <button class="confirm-contribution-btn" onclick="giftManager.submitSpecialGift()">
                        Enviar Informação
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    async submitSpecialGift() {
        const name = document.getElementById('special-name').value.trim();
        const email = document.getElementById('special-email').value.trim();
        const phone = document.getElementById('special-phone').value.trim();
        const description = document.getElementById('special-description').value.trim();
        const message = document.getElementById('special-message')?.value.trim() || '';

        if (!name || !email || !description) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Mostrar estado de carregamento
        const submitButton = document.querySelector('.confirm-contribution-btn');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = '⏳ Enviando...';
        submitButton.disabled = true;

        try {
            // Enviar para planilha Google
            await fetch(APPS_SCRIPT_GIFTS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'special_gift',
                    name: name,
                    email: email,
                    phone: phone,
                    description: description,
                    message: message
                }),
                mode: 'no-cors'
            });

            document.querySelector('.payment-modal')?.remove();
            this.showSpecialGiftConfirmation(name, description);
        } catch (error) {
            console.error('Erro ao enviar:', error);
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
            alert('Houve um erro ao enviar. Por favor, tente novamente.');
        }
    }

    showFreeContribution() {
        const modal = document.createElement('div');
        modal.className = 'payment-modal';
        modal.innerHTML = `
            <div class="payment-content">
                <button class="close-modal-x" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="payment-header">
                    <div class="gift-icon">💰</div>
                    <h2>Contribuição Livre</h2>
                    <p>Qualquer valor ajuda a Mel!</p>
                </div>

                <div class="payment-options">
                    <div class="payment-option">
                        <h3><i class="fas fa-qrcode"></i> PIX</h3>
                        <div class="pix-key">${PIX_KEY}</div>
                        <button class="copy-pix-btn" onclick="giftManager.copyPix('${PIX_KEY}')">
                            <i class="fas fa-copy"></i> Copiar Chave PIX
                        </button>
                    </div>
                </div>

                <div class="contributor-form">
                    <p><strong>Após fazer a transferência:</strong></p>
                    <input type="text" id="free-contributor-name" placeholder="Seu nome completo" required>
                    <input type="number" id="free-amount" placeholder="Valor contribuído (R$)" required min="1">

                    <div class="message-toggle">
                        <button type="button" class="toggle-message-btn" onclick="giftManager.toggleMessage(this)">
                            💌 Adicionar mensagem para a Mel (opcional)
                        </button>
                        <div class="message-field" style="display: none;">
                            <textarea id="free-message" placeholder="Deixe uma mensagem carinhosa para a Mel..." rows="3"></textarea>
                        </div>
                    </div>

                    <button class="confirm-contribution-btn" onclick="giftManager.confirmFreeContribution()">
                        Confirmar Contribuição
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    async confirmFreeContribution() {
        const name = document.getElementById('free-contributor-name').value.trim();
        const amount = parseFloat(document.getElementById('free-amount').value);
        const message = document.getElementById('free-message')?.value.trim() || '';

        if (!name || !amount || amount <= 0) {
            alert('Por favor, preencha todos os campos corretamente.');
            return;
        }

        // Mostrar estado de carregamento
        const confirmButton = document.querySelector('.confirm-contribution-btn');
        const originalButtonText = confirmButton.textContent;
        confirmButton.textContent = '⏳ Processando...';
        confirmButton.disabled = true;

        try {
            // Enviar para planilha Google
            await fetch(APPS_SCRIPT_GIFTS_URL, {
                method: 'POST',
                body: JSON.stringify({
                    type: 'free_contribution',
                    contributor: name,
                    amount: amount,
                    message: message
                }),
                mode: 'no-cors'
            });

            document.querySelector('.payment-modal')?.remove();
            this.showFreeContributionConfirmation(name, amount);
        } catch (error) {
            console.error('Erro ao enviar:', error);
            confirmButton.textContent = originalButtonText;
            confirmButton.disabled = false;
            alert('Houve um erro ao processar sua contribuição. Por favor, tente novamente.');
        }
    }

    showGiftConfirmation(contributorName, giftName, price) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <i class="fas fa-gift"></i>
                    <h2>Obrigado, ${contributorName}!</h2>
                </div>
                <div class="confirmation-body">
                    <p>Sua contribuição foi registrada com muito carinho!</p>
                    <p class="success-text">✓ Contribuição confirmada com sucesso!</p>
                    <div class="confirmation-details">
                        <p><strong>Presente:</strong> ${giftName}</p>
                        <p><strong>Valor:</strong> R$ ${price.toFixed(2).replace('.', ',')}</p>
                    </div>
                    <p class="celebration-text">A Mel agradece sua generosidade! 💛</p>
                </div>
                <button class="close-confirmation" onclick="this.parentElement.parentElement.remove()">
                    Fechar
                </button>
            </div>
        `;

        this.styleConfirmationModal(modal);
        document.body.appendChild(modal);
    }

    showSpecialGiftConfirmation(name, description) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <i class="fas fa-heart"></i>
                    <h2>Obrigado, ${name}!</h2>
                </div>
                <div class="confirmation-body">
                    <p>Recebemos a informação sobre seu presente especial!</p>
                    <p class="success-text">✓ Informação registrada com sucesso!</p>
                    <div class="confirmation-details">
                        <p><strong>Descrição:</strong> ${description}</p>
                    </div>
                    <p class="celebration-text">Mal podemos esperar para ver! 🎁</p>
                </div>
                <button class="close-confirmation" onclick="this.parentElement.parentElement.remove()">
                    Fechar
                </button>
            </div>
        `;

        this.styleConfirmationModal(modal);
        document.body.appendChild(modal);
    }

    showFreeContributionConfirmation(name, amount) {
        const modal = document.createElement('div');
        modal.className = 'confirmation-modal';
        modal.innerHTML = `
            <div class="confirmation-content">
                <div class="confirmation-header">
                    <i class="fas fa-piggy-bank"></i>
                    <h2>Obrigado, ${name}!</h2>
                </div>
                <div class="confirmation-body">
                    <p>Sua contribuição foi registrada com muito carinho!</p>
                    <p class="success-text">✓ Contribuição confirmada com sucesso!</p>
                    <div class="confirmation-details">
                        <p><strong>Valor:</strong> R$ ${amount.toFixed(2).replace('.', ',')}</p>
                        <p><strong>Destino:</strong> Poupança da Mel 🐝</p>
                    </div>
                    <p class="celebration-text">Você está ajudando a construir o futuro da Mel! 💰</p>
                </div>
                <button class="close-confirmation" onclick="this.parentElement.parentElement.remove()">
                    Fechar
                </button>
            </div>
        `;

        this.styleConfirmationModal(modal);
        document.body.appendChild(modal);
    }

    styleConfirmationModal(modal) {
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
    }
}

// Inicializar (será chamado no DOMContentLoaded)
let giftManager;


// RSVP Form Management
class RSVPManager {
    constructor() {
        // Google Apps Script URL (intermediário para o Google Forms)
        this.appsScriptURL = 'https://script.google.com/macros/s/AKfycbzTHYSN0o-zqqN_XxaulQaBc3dbkFzPRg6JXoCdxzE1dASXLOzfQuzLXhVu7rnUIvjU/exec';
        this.initForm();
    }

    initForm() {
        const form = document.getElementById('rsvpForm');
        if (form) {
            form.addEventListener('submit', (e) => this.handleSubmit(e));

            // Adicionar formatação automática de telefone
            const phoneInput = document.getElementById('phone');
            if (phoneInput) {
                phoneInput.addEventListener('input', this.formatPhone.bind(this));
            }
        }
    }

    formatPhone(e) {
        let value = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número

        // Limitar a 13 dígitos (55 + 11 + 9 dígitos)
        if (value.length > 13) {
            value = value.substring(0, 13);
        }

        // Formatar conforme o tamanho
        if (value.length <= 2) {
            e.target.value = value;
        } else if (value.length <= 4) {
            // +55 11
            e.target.value = `+${value.substring(0, 2)} ${value.substring(2)}`;
        } else if (value.length <= 9) {
            // +55 11 9999
            e.target.value = `+${value.substring(0, 2)} ${value.substring(2, 4)} ${value.substring(4)}`;
        } else {
            // +55 11 99999-9999
            e.target.value = `+${value.substring(0, 2)} ${value.substring(2, 4)} ${value.substring(4, 9)}-${value.substring(9)}`;
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
            message: formData.get('message'),
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
        try {
            // Enviar dados para o Google Apps Script
            await fetch(this.appsScriptURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email || '',
                    phone: data.phone || '',
                    adults: data.adults,
                    children: data.children,
                    dietary: data.dietary || '',
                    message: data.message || ''
                }),
                mode: 'no-cors'
            });

            console.log('Dados enviados para Google Forms via Apps Script');

            // Wait to ensure submission completes
            await new Promise(resolve => setTimeout(resolve, 500));

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

// Toggle gallery photos visibility
function toggleGalleryPhotos() {
    const hiddenPhotos = document.querySelectorAll('.gallery-hidden');
    const button = document.getElementById('show-more-photos');

    hiddenPhotos.forEach(photo => {
        if (photo.style.display === 'none' || !photo.style.display) {
            photo.style.display = 'block';
            button.innerHTML = '<i class="fas fa-chevron-up"></i> Ver menos fotos';
            button.classList.add('expanded');
        } else {
            photo.style.display = 'none';
            button.innerHTML = '<i class="fas fa-chevron-down"></i> Ver mais fotos';
            button.classList.remove('expanded');
        }
    });
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    giftManager = new NewGiftManager();
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