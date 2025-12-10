// script.js - основные направления English by M
// directionsData должен быть в ГЛОБАЛЬНОЙ области

// Глобальный объект с данными направлений
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
    
    // Загружаем направления обучения при загрузке страницы
    setTimeout(function() {
        if (typeof loadDirections === 'function') {
            loadDirections();
        } else {
            loadSimpleDirections(); // Запасной вариант
        }
    }, 100);
    
    console.log('✅ English by M website loaded');
});

// Основная функция загрузки направлений
function loadDirections() {
    // Определяем текущий язык
    const currentLang = window.currentLang || 'uz';
    const container = document.getElementById('directionsContainer');
    
    console.log('loadDirections вызвана, язык:', currentLang);
    console.log('Контейнер:', container);
    console.log('Данные для языка:', directionsData[currentLang]);
    
    if (!container) {
        console.error('❌ Контейнер направлений не найден!');
        return;
    }
    
    // Проверяем наличие данных для текущего языка
    if (!directionsData || !directionsData[currentLang]) {
        console.error(`❌ Нет данных направлений для языка: ${currentLang}`);
        // Используем запасной вариант
        loadSimpleDirections();
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

// Запасная функция (простая версия)
function loadSimpleDirections() {
    const container = document.getElementById('directionsContainer');
    if (!container) return;
    
    const courses = [
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
    ];
    
    container.innerHTML = '';
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'direction-card';
        card.innerHTML = `
            <div class="direction-icon">
                <i class="${course.icon}"></i>
            </div>
            <div class="direction-content">
                <h3>${course.title}</h3>
                <p>${course.description}</p>
                <div class="direction-details">
                    <p><small>${course.details}</small></p>
                </div>
                <a href="#contacts" class="btn btn-secondary">Batafsil</a>
            </div>
        `;
        container.appendChild(card);
    });
    
    console.log('✅ Направления загружены (простая версия)');
}

// Делаем функции доступными глобально
if (typeof window !== 'undefined') {
    window.loadDirections = loadDirections;
    window.loadSimpleDirections = loadSimpleDirections;
    window.directionsData = directionsData; // Экспортируем данные
}

// Автоматическая загрузка при готовности DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        setTimeout(loadDirections, 500);
    });
} else {
    setTimeout(loadDirections, 500);
}
