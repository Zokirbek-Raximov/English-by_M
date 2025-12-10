// script.js - основные направления English by M

document.addEventListener('DOMContentLoaded', function() {
    // Плавная прокрутка
    // script.js - основные направления English by M

// ПЕРЕМЕСТИТЕ directionsData В ГЛОБАЛЬНУЮ ОБЛАСТЬ
const directionsData = {
    uz: [
        {
            title: "General English",
            description: "Inglis tilini noldan boshlab o'rganish. Barcha darajalar uchun.",
            icon: "fas fa-language",
            details: "Haftada 3 marta • 1.5 soat • Boshlang'ich daraja"
        },
        {
            title: "Prezident maktabiga tayyorlash",
            description: "Prezident maktablariga kirish imtihonlariga tayyorlov.",
            icon: "fas fa-graduation-cap",
            details: "Maxsus dastur • Test yechish • Muloqot"
        },
        {
            title: "IELTS CEFR",
            description: "Xalqaro IELTS va CEFR sertifikatlari uchun tayyorlov.",
            icon: "fas fa-globe",
            details: "4 mahorat • Practice test • Speaking club"
        },
        {
            title: "KIDS English",
            description: "Bola(lar) uchun maxsus o'quv dasturi. O'yin orqali o'rganish.",
            icon: "fas fa-child",
            details: "5-12 yosh • O'yinli darslar • She'r va qo'shiqlar"
        }
    ],
    ru: [
        {
            title: "General English",
            description: "Изучение английского языка с нуля. Для всех уровней.",
            icon: "fas fa-language",
            details: "3 раза в неделю • 1.5 часа • Начальный уровень"
        },
        {
            title: "Подготовка к Президентским школам",
            description: "Подготовка к вступительным экзаменам в Президентские школы.",
            icon: "fas fa-graduation-cap",
            details: "Специальная программа • Решение тестов • Общение"
        },
        {
            title: "IELTS CEFR",
            description: "Подготовка к международным сертификатам IELTS и CEFR.",
            icon: "fas fa-globe",
            details: "4 навыка • Практические тесты • Speaking club"
        },
        {
            title: "KIDS English",
            description: "Специальная учебная программа для детей. Обучение через игру.",
            icon: "fas fa-child",
            details: "5-12 лет • Игровые занятия • Стихи и песни"
        }
    ]
};

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
    
    console.log('✅ English by M website loaded');
});

// Функция loadDirections должна использовать ГЛОБАЛЬНЫЙ directionsData
function loadDirections() {
    // Определяем текущий язык
    const currentLang = window.currentLang || 'uz';
    const container = document.getElementById('directionsContainer');
    
    if (!container) {
        console.error('❌ Контейнер направлений не найден!');
        return;
    }
    
    // Проверяем, существует ли directionsData для текущего языка
    if (!directionsData[currentLang]) {
        console.error(`❌ Нет данных для языка: ${currentLang}`);
        return;
    }
    
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
    
    console.log(`✅ Загружено ${directionsData[currentLang].length} направлений на языке ${currentLang}`);
}

// Экспортируем функции
if (typeof window !== 'undefined') {
    window.loadDirections = loadDirections;
    window.directionsData = directionsData; // Экспортируем directionsData
}
            {
                title: "KIDS English",
                description: "Bola(lar) uchun maxsus o'quv dasturi. O'yin orqali o'rganish.",
                icon: "fas fa-child",
                details: "5-12 yosh • O'yinli darslar • She'r va qo'shiqlar"
            }
        ],
        ru: [
            {
                title: "General English",
                description: "Изучение английского языка с нуля. Для всех уровней.",
                icon: "fas fa-language",
                details: "3 раза в неделю • 1.5 часа • Начальный уровень"
            },
            {
                title: "Подготовка к Президентским школам",
                description: "Подготовка к вступительным экзаменам в Президентские школы.",
                icon: "fas fa-graduation-cap",
                details: "Специальная программа • Решение тестов • Общение"
            },
            {
                title: "IELTS CEFR",
                description: "Подготовка к международным сертификатам IELTS и CEFR.",
                icon: "fas fa-globe",
                details: "4 навыка • Практические тесты • Speaking club"
            },
            {
                title: "KIDS English",
                description: "Специальная учебная программа для детей. Обучение через игру.",
                icon: "fas fa-child",
                details: "5-12 лет • Игровые занятия • Стихи и песни"
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

// Экспортируем функции
if (typeof window !== 'undefined') {
    window.loadDirections = loadDirections;
}
