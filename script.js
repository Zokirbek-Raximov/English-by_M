// Данные направлений УДАЛЕНЫ отсюда - теперь они в language.js

// Обработка формы (базовая версия)
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const course = document.getElementById('course').value;
    
    // Сообщение будет меняться в language.js
    // Базовая версия на случай, если language.js не загрузится
    alert(`Спасибо, ${name}! Ваша заявка на курс "${course}" принята.`);
    
    // Очистка формы
    this.reset();
    document.getElementById('course').selectedIndex = 0;
});

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

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Направления теперь загружаются через language.js
    
    // Обновляем год в подвале
    const year = new Date().getFullYear();
    document.querySelector('.footer-copyright').innerHTML = 
        `© ${year} Учебный Центр "Прогресс". Все права защищены.`;
});
