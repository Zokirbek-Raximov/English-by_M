// Данные направлений (ЗАМЕНИТЕ ЭТИ ДАННЫЕ НА СВОИ!)
const directionsData = [
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
];

// Функция для загрузки направлений на страницу
function loadDirections() {
    const container = document.getElementById('directionsContainer');
    
    directionsData.forEach(direction => {
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
                <a href="#contacts" class="btn btn-secondary">Узнать подробнее</a>
            </div>
        `;
        
        container.appendChild(directionCard);
    });
}

// Обработка формы
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    
    // В реальном проекте здесь будет отправка на сервер
    alert(`Спасибо, ${name}! Ваша заявка на курс "${course}" принята. Мы перезвоним вам по номеру ${phone} в течение 2 часов.`);
    
    // Очистка формы
    this.reset();
    document.getElementById('course').selectedIndex = 0;
});

// Плавная прокрутка для навигации
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

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    loadDirections();
    
    // Добавляем текущий год в подвал
    document.querySelector('.footer-copyright').innerHTML = 
        `© ${new Date().getFullYear()} Учебный Центр "Прогресс". Все права защищены.`;
});
