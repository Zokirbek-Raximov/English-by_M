// Словари перевода
const translations = {
    uz: {
        // Навигация
        "nav.home": "Bosh sahifa",
        "nav.about": "Biz haqimizda",
        "nav.directions": "Yo'nalishlar",
        "nav.teachers": "O'qituvchilar",
        "nav.contacts": "Aloqa",
        "nav.apply": "Ro'yxatdan o'tish",
        
        // Герой
        "hero.title": "Eshik ochadigan ta'lim",
        "hero.text": "Amaliy yo'nalishdagi professional kurslar. Karyera, imtihonlarga tayyorlaymiz yoki yangi kasbni noldan o'rganishga yordam beramiz.",
        "hero.btn_course": "Kursni tanlash",
        "hero.btn_consult": "Bepul maslahat",
        
        // О нас
        "about.title": "Nima uchun bizni tanlashadi?",
        "about.feature1.title": "Tajribali o'qituvchilar",
        "about.feature1.text": "5 yildan ortiq amaliy tajribaga ega mutaxassislar.",
        "about.feature2.title": "Bitiruvda sertifikat",
        "about.feature2.text": "Yangilaringizni tasdiqlovchi rasmiy sertifikat beramiz.",
        "about.feature3.title": "Kichik guruhlar",
        "about.feature3.text": "Har biriga maksimal e'tibor - 6-8 kishilik guruhlarda.",
        "about.feature4.title": "1-kundan amaliyot",
        "about.feature4.text": "Vaqtning 80% - real vazifalar va ko'nikmalarni rivojlantirish.",
        
        // Направления
        "directions.title": "O'quv yo'nalishlari",
        "directions.subtitle": "Maqsadlaringizga mos kursni tanlang",
        
        // Преподаватели
        "teachers.title": "Bizning o'qituvchilar",
        "teachers.teacher1.subject": "Ingliz tili, IELTS",
        "teachers.teacher1.info": "Lingvist, 10 yillik tajriba, CELTA sertifikati.",
        "teachers.teacher2.subject": "Dasturlash, Python",
        "teachers.teacher2.info": "Senior Developer, yangi boshlanuvchilar uchun kurslar olib boradi.",
        "teachers.teacher3.subject": "Dizayn, UI/UX, Figma",
        "teachers.teacher3.info": "IT kompaniyasida Art-direktor, amaliyotchi dizayner.",
        
        // Контакты
        "contacts.title": "Kurslarga yozilish",
        "contacts.info_title": "Aloqa",
        "contacts.address": "Shahar, Markaziy ko'cha, 123",
        "contacts.worktime": "Dushanba-Juma: 9:00-20:00, Shanba-Yakshanba: 10:00-18:00",
        "contacts.form_title": "Ariza qoldiring",
        
        // Форма
        "form.name": "Ismingiz",
        "form.phone": "Telefon raqami",
        "form.course_select": "Kursni tanlang",
        "form.submit": "Arizani yuborish",
        "form.note": "Biz sizga 2 soat ichida qayta aloqaga chiqamiz",
        
        // Подвал
        "footer.copyright": "© 2023 \"Progress\" O'quv Markazi. Barcha huquqlar himoyalangan.",
        "footer.made": "Sayt imkoniyatlarni namoyish qilish uchun yaratilgan"
    },
    ru: {
        // Навигация
        "nav.home": "Главная",
        "nav.about": "О нас",
        "nav.directions": "Направления",
        "nav.teachers": "Преподаватели",
        "nav.contacts": "Контакты",
        "nav.apply": "Записаться",
        
        // Герой
        "hero.title": "Образование, которое открывает двери",
        "hero.text": "Профессиональные курсы с практической направленностью. Подготовим к карьере, экзаменам или поможем освоить новую профессию с нуля.",
        "hero.btn_course": "Выбрать курс",
        "hero.btn_consult": "Бесплатная консультация",
        
        // О нас
        "about.title": "Почему выбирают нас?",
        "about.feature1.title": "Опытные педагоги",
        "about.feature1.text": "Преподаватели-практики с опытом работы более 5 лет в своей сфере.",
        "about.feature2.title": "Сертификат по окончании",
        "about.feature2.text": "Выдаём официальный сертификат, подтверждающий ваши новые навыки.",
        "about.feature3.title": "Малые группы",
        "about.feature3.text": "Занятия в группах 6-8 человек для максимального внимания каждому.",
        "about.feature4.title": "Практика с 1-го дня",
        "about.feature4.text": "80% времени — решение реальных задач и отработка навыков.",
        
        // Направления
        "directions.title": "Направления обучения",
        "directions.subtitle": "Выберите курс, который соответствует вашим целям",
        
        // Преподаватели
        "teachers.title": "Наши преподаватели",
        "teachers.teacher1.subject": "Английский язык, IELTS",
        "teachers.teacher1.info": "Лингвист, опыт 10 лет, сертификат CELTA.",
        "teachers.teacher2.subject": "Программирование, Python",
        "teachers.teacher2.info": "Senior Developer, ведёт курсы для начинающих.",
        "teachers.teacher3.subject": "Дизайн, UI/UX, Figma",
        "teachers.teacher3.info": "Арт-директор в IT-компании, практикующий дизайнер.",
        
        // Контакты
        "contacts.title": "Запись на курсы",
        "contacts.info_title": "Контакты",
        "contacts.address": "г. Город, ул. Центральная, 123",
        "contacts.worktime": "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
        "contacts.form_title": "Оставьте заявку",
        
        // Форма
        "form.name": "Ваше имя",
        "form.phone": "Номер телефона",
        "form.course_select": "Выберите курс",
        "form.submit": "Отправить заявку",
        "form.note": "Мы перезвоним вам в течение 2 часов",
        
        // Подвал
        "footer.copyright": "© 2023 Учебный Центр \"Прогресс\". Все права защищены.",
        "footer.made": "Сайт создан для демонстрации возможностей"
    }
};

// Текущий язык (по умолчанию узбекский)
let currentLang = 'uz';

// Функция перевода страницы
function translatePage(lang) {
    currentLang = lang;
    
    // Сохраняем язык в localStorage
    localStorage.setItem('preferredLang', lang);
    
    // Обновляем текст кнопки переключения
    document.getElementById('currentLang').textContent = lang.toUpperCase();
    
    // Меняем атрибут lang у html
    document.documentElement.lang = lang;
    
    // Меняем title страницы
    if (lang === 'uz') {
        document.title = "O'quv Markazi 'Progress' | Sifatli ta'lim";
    } else {
        document.title = "Учебный Центр 'Прогресс' | Качественное образование";
    }
    
    // Переводим все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Переводим placeholder'ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[lang] && translations[lang][key]) {
            element.placeholder = translations[lang][key];
        }
    });
    
    // Обновляем направления (вместе с языком)
    updateDirectionsForLang(lang);
    
    // Обновляем сообщение формы
    updateFormMessage(lang);
}

// Функция обновления направлений в зависимости от языка
function updateDirectionsForLang(lang) {
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
    
    const container = document.getElementById('directionsContainer');
    container.innerHTML = '';
    
    directionsData[lang].forEach(direction => {
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
                <a href="#contacts" class="btn btn-secondary">${lang === 'uz' ? 'Batafsil' : 'Узнать подробнее'}</a>
            </div>
        `;
        
        container.appendChild(directionCard);
    });
}

// Функция обновления сообщения формы
function updateFormMessage(lang) {
    const form = document.getElementById('contactForm');
    const oldSubmitHandler = form.onsubmit;
    
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const course = document.getElementById('course').value;
        
        let message = '';
        if (lang === 'uz') {
            message = `Rahmat, ${name}! "${course}" kursiga arizangiz qabul qilindi. Biz sizga ${phone} raqamiga 2 soat ichida qayta aloqaga chiqamiz.`;
        } else {
            message = `Спасибо, ${name}! Ваша заявка на курс "${course}" принята. Мы перезвоним вам по номеру ${phone} в течение 2 часов.`;
        }
        
        alert(message);
        
        // Очистка формы
        this.reset();
        document.getElementById('course').selectedIndex = 0;
    };
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('preferredLang') || 'uz';
    
    // Устанавливаем язык
    translatePage(savedLang);
    
    // Назначаем обработчик кнопки переключения
    document.getElementById('langToggle').addEventListener('click', function() {
        const newLang = currentLang === 'uz' ? 'ru' : 'uz';
        translatePage(newLang);
    });
    
    // Добавляем текущий год в подвал
    document.querySelector('.footer-copyright').innerHTML = 
        currentLang === 'uz' 
            ? `© ${new Date().getFullYear()} "Progress" O'quv Markazi. Barcha huquqlar himoyalangan.`
            : `© ${new Date().getFullYear()} Учебный Центр "Прогресс". Все права защищены.`;
});
