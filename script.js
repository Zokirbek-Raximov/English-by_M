// script.js - основной скрипт для English by_M

// Плавная прокрутка для навигации
document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Загружаем направления обучения
    loadDirections();
    
    // Обновляем год в подвале
    updateFooterYear();
    
    console.log('✅ English by_M website loaded successfully');
});

// Функция загрузки направлений
function loadDirections() {
    const directionsData = {
        uz: [
            {
                title: "Ingliz tili",
                description: "Umumiy kurs, biznes-ingliz, IT mutaxassislari uchun. Barcha darajalar Beginner'dan Advancedgacha.",
                icon: "fas fa-language",
                details: "Guruhlar: 6-8 kishi • Davomiylik: 3-9 oy • Sertifikat: bor"
            },
            {
                title: "Dasturlash",
                description: "Python, veb-dasturlash, algoritmlar asoslari. Birinchi darsdan real loyihalar ustida amaliyot.",
                icon: "fas fa-code",
                details: "Guruhlar: 6-8 kishi • Davomiylik: 4-10 oy • Ish bilan ta'minlash yordami"
            },
            {
                title: "Dizayn va grafika",
                description: "Photoshop, Figma, UI/UX dizayn. Amaliyotchi dizayner rahbarligida portfolio yaratish.",
                icon: "fas fa-palette",
                details: "Guruhlar: 6-8 kishi • Davomiylik: 3-6 oy • Diplom loyihasini himoya qilish"
            },
            {
                title: "Imtihonlarga tayyorlov",
                description: "IELTS, TOEFL, DT. Imtihoning barcha qismlarini tahlil qilish va test sinovlari bilan intensiv tayyorlov.",
                icon: "fas fa-graduation-cap",
                details: "Guruhlar: 4-6 kishi • Davomiylik: 2-6 oy • Natija kafolati"
            }
        ],
        ru: [
            {
                title: "Английский язык",
                description: "Общий курс, бизнес-английский, специализированный для IT. Все уровни от Beginner до Advanced.",
                icon: "fas fa-language",
                details: "Группы: 6-8 чел. • Длительность: 3-9 мес. • Сертификат: есть"
            },
            {
                title: "Программирование",
                description: "Python, веб-разработка, основы алгоритмов. Практика на реальных проектах с первого занятия.",
                icon: "fas fa-code",
                details: "Группы: 6-8 чел. • Длительность: 4-10 мес. • Помощь с трудоустройством"
            },
            {
                title: "Дизайн и графика",
                description: "Photoshop, Figma, UI/UX дизайн. Создание портфолио под руководством практикующего дизайнера.",
                icon: "fas fa-palette",
                details: "Группы: 6-8 чел. • Длительность: 3-6 мес. • Защита дипломного проекта"
            },
            {
                title: "Подготовка к экзаменам",
                description: "IELTS, TOEFL, ЕНТ. Интенсивная подготовка с разбором всех частей экзамена и пробными тестами.",
                icon: "fas fa-graduation-cap",
                details: "Группы: 4-6 чел. • Длительность: 2-6 мес. • Гарантия результата"
            }
        ]
    };
    
    // Определяем текущий язык
    const currentLang = window.currentLang || 'uz';
    const container = document.getElementById('directionsContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    directionsData[currentLang].forEach(direction => {
        const directionCard = document.createElement('div');
        directionCard.className = 'direction-card';
        
        directionCard.innerHTML = `
            <div class="direction-icon">
                <i class="${direction.icon}"></i>
            </div>
            <div class="direction-content">
                <h3>${direction.title}</h3>
                <p>${direction.description}</p>
                <div class="direction-details">
                    <p><small>${direction.details}</small></p>
                </div>
                <a href="#contacts" class="btn btn-secondary">${currentLang === 'uz' ? 'Batafsil' : 'Узнать подробнее'}</a>
            </div>
        `;
        
        container.appendChild(directionCard);
    });
}

// Обновление года в подвале
function updateFooterYear() {
    const year = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-copyright');
    
    if (copyrightElement && !copyrightElement.hasAttribute('data-i18n')) {
        // Устанавливаем базовый текст
        copyrightElement.textContent = `© ${year} English by_M. All rights reserved.`;
    }
}

// Экспортируем функции для других файлов
if (typeof window !== 'undefined') {
    window.loadDirections = loadDirections;
    window.updateFooterYear = updateFooterYear;
}
