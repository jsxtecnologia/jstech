// Aguarda o carregamento completo da página
document.addEventListener('DOMContentLoaded', function() {
    
    // Elementos do DOM
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('.header');
    const heroImage = document.querySelector('.hero-image img');
    
    // Menu mobile toggle
    hamburgerMenu.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
    });
    
    // Fechar menu mobile ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        });
    });
    
    // Header transparente/sólido baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll para links internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animação de fade-in para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Adicionar classe fade-in aos elementos que devem animar
    const animatedElements = document.querySelectorAll('.service-card, .feature-item, .contact-form, .contact-info');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Formulário de contato
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simular envio do formulário
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;


                // Captura os dados do formulário
            const nome = this.nome.value;
            const email = this.email.value;
            const empresa = this.empresa.value;
            const telefone = this.telefone.value;
            const mensagem = this.mensagem.value;

            // Monta o texto da mensagem
            const texto = `Olá! Meu nome é ${nome}, meu email é ${email}, sou da ${empresa},  telefone ${telefone}. Mensagem: ${mensagem}`;

            // Codifica a mensagem para URL
            const textoCodificado = encodeURIComponent(texto);

            // Número do WhatsApp (sem espaços, traços ou parênteses)
            const numero = "5562981013929"; // DDI + DDD + número

            // Monta o link do WhatsApp
            const linkWhatsApp = `https://wa.me/${numero}?text=${textoCodificado}`;

            // Redireciona para o WhatsApp
            window.open(linkWhatsApp, "_blank");
            
            // Simular delay de envio
            setTimeout(() => {
                alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Botões de call-to-action
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        if (btn.textContent.includes('Solicitar Orçamento')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroll para seção de contato
                const contactSection = document.querySelector('#contato');
                if (contactSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = contactSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
        
        if (btn.textContent.includes('Nossos Serviços')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                // Scroll para seção de serviços
                const servicesSection = document.querySelector('#servicos');
                if (servicesSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = servicesSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Efeito parallax sutil na hero image
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
    
    // Animação de digitação para o título principal
    const heroTitle = document.querySelector('.hero-content h1');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar animação após um pequeno delay
        setTimeout(typeWriter, 1000);
    }
    
    // Contador animado (se necessário no futuro)
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    // Adicionar efeito hover aos cards de serviço
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Validação básica do formulário
    const formInputs = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ef4444';
            } else {
                this.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            }
        });
        
        input.addEventListener('focus', function() {
            this.style.borderColor = 'var(--js-tech-blue)';
        });
    });
    
    // Scroll indicator (opcional)
    const scrollIndicator = document.createElement('div');
    scrollIndicator.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--js-tech-blue), var(--js-tech-light-blue));
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(scrollIndicator);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollIndicator.style.width = scrollPercent + '%';
    });
    
    // Lazy loading para imagens (se necessário)
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Adicionar classe para animações CSS quando elementos entram na viewport
    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    // Observar elementos que devem animar
    document.querySelectorAll('.service-card, .feature-item').forEach(el => {
        animateOnScroll.observe(el);
    });
});

// Função para adicionar estilos CSS dinamicamente
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        /* Estilos para menu mobile */
        @media (max-width: 768px) {
            .nav-menu {
                position: fixed;
                top: 70px;
                right: -100%;
                width: 100%;
                height: calc(100vh - 70px);
                background: rgba(255, 255, 255, 0.95);
                backdrop-filter: blur(10px);
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                padding-top: 2rem;
                transition: right 0.3s ease;
            }
            
            .nav-menu.active {
                right: 0;
            }
            
            .nav-menu ul {
                flex-direction: column;
                gap: 1.5rem;
            }
            
            .nav-menu .btn-primary {
                display: block;
                margin-top: 2rem;
            }
            
            .hamburger-menu.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            
            .hamburger-menu.active span:nth-child(2) {
                opacity: 0;
            }
            
            .hamburger-menu.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }
        }
        
        /* Header com scroll */
        .header.scrolled {
            background: rgba(255, 255, 255, 0.98);
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        }
        
        /* Animações adicionais */
        .animate {
            animation: slideInUp 0.6s ease forwards;
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
    `;
    document.head.appendChild(style);
}

// Adicionar estilos dinâmicos
addDynamicStyles();

