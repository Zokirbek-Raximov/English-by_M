// language.js - переводы для English by M

const translations = {
    uz: {
        // Навигация
        "nav.home": "Bosh sahifa",
        "nav.about": "Biz haqimizda",
        "nav.directions": "Yo'nalishlar",
        "nav.teachers": "Foto lavhalar",
        "nav.contacts": "Aloqa",
        "nav.apply": "Kursga yozilish",
        
        // Герой
        "hero.title": "Kelajakka eshik ochadigan ta'lim",
        "hero.text": "Inglis tilini noldan o'rgatamiz. Prezident maktablariga tayyorlaymiz. General English. IELTS CEFR",
        "hero.btn_course": "Kursni tanlash",
        "hero.btn_consult": "Bepul maslahat",
        
        // О нас
        "about.title": "Nima uchun bizni tanlashadi?",
        "about.feature1.title": "Tajribali o'qituvchilar",
        "about.feature1.text": "5 yildan ortiq amaliy tajribaga ega mutaxassislar.",
        "about.feature2.title": "Qulay lokatsiya",
        "about.feature2.text": "O'quv markazi qulay manzilda joylashgan.",
        "about.feature3.title": "Kichik guruhlar",
        "about.feature3.text": "Har biriga maksimal e'tibor - 6-8 kishilik guruhlarda.",
        "about.feature4.title": "1-kundan amaliyot",
        "about.feature4.text": "Vaqtning 80% - real vazifalar va ko'nikmalarni rivojlantirish.",
        
        // Направления
        "directions.title": "O'quv yo'nalishlari",
        "directions.subtitle": "Maqsadlaringizga mos kursni tanlang",
        
        // Контакты
        "contacts.title": "Kurslarga yozilish",
        "contacts.info_title": "Aloqa",
        "contacts.worktime": "Dushanba-Juma: 9:00-20:00, Shanba-Yakshanba: 10:00-18:00",
        "contacts.form_title": "Ariza qoldiring",
        
        // Форма
        "form.name": "Ismingiz",
        "form.phone": "Telefon raqami",
        "form.course_select": "Kursni tanlang",
        "form.submit": "Arizani yuborish",
        "form.note": "Biz sizga 2 soat ichida qayta aloqaga chiqamiz",
        
        // Социальные сети
        "social.note": "Ijtimoiy tarmoqlarimizga obuna bo'ling",
        
        // Подвал
        "footer.copyright": "© 2024 \"English by M\" O'quv Markazi. Barcha huquqlar himoyalangan.",
        "footer.made": "Sayt imkoniyatlarni namoyish qilish uchun yaratilgan"
    },
    ru: {
        // Навигация
        "nav.home": "Главная",
        "nav.about": "О нас",
        "nav.directions": "Направления",
        "nav.teachers": "Фото процесса",
        "nav.contacts": "Контакты",
        "nav.apply": "Записаться на курс",
        
        // Герой
        "hero.title": "Образование, которое открывает двери в будущее",
        "hero.text": "Обучаем английскому с нуля. Готовим к Президентским школам. General English. IELTS CEFR",
        "hero.btn_course": "Выбрать курс",
        "hero.btn_consult": "Бесплатная консультация",
        
        // О нас
        "about.title": "Почему выбирают нас?",
        "about.feature1.title": "Опытные педагоги",
        "about.feature1.text": "Преподаватели-практики с опытом работы более 5 лет.",
        "about.feature2.title": "Удобное расположение",
        "about.feature2.text": "Учебный центр расположен в удобном месте.",
        "about.feature3.title": "Малые группы",
        "about.feature3.text": "Занятия в группах 6-8 человек для максимального внимания.",
        "about.feature4.title": "Практика с 1-го дня",
        "about.feature4.text": "80% времени — решение реальных задач и отработка навыков.",
        
        // Направления
        "directions.title": "Направления обучения",
        "directions.subtitle": "Выберите курс, который соответствует вашим целям",
        
        // Контакты
        "contacts.title": "Запись на курсы",
        "contacts.info_title": "Контакты",
        "contacts.worktime": "Пн-Пт: 9:00-20:00, Сб-Вс: 10:00-18:00",
        "contacts.form_title": "Оставьте заявку",
        
        // Форма
        "form.name": "Ваше имя",
        "form.phone": "Номер телефона",
        "form.course_select": "Выберите курс",
        "form.submit": "Отправить заявку",
        "form.note": "Мы перезвоним вам в течение 2 часов",
        
        // Социальные сети
        "social.note": "Подпишитесь на наши социальные сети",
        
        // Подвал
        "footer.copyright": "© 2024 Учебный Центр \"English by M\". Все права защищены.",
        "footer.made": "Сайт создан для демонстрации возможностей"
    }
};

let currentLang = 'uz';

function translatePage(lang) {
    currentLang = lang;
    
    // Сохраняем язык в localStorage
    localStorage.setItem('preferredLang', lang);
    
    // Обновляем текст кнопки переключения
    const currentLangElement = document.getElementById('currentLang');
    if (currentLangElement) {
        currentLangElement.textContent = lang.toUpperCase();
    }
    
    // Меняем атрибут lang у html
    document.documentElement.lang = lang;
    
    // Меняем title страницы
    if (lang === 'uz') {
        document.title = "English by M | Sifatli ta'lim";
    } else {
        document.title = "English by M | Качественное образование";
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
    
    // Обновляем текущий язык в глобальной области
    window.currentLang = lang;
    
    // Обновляем направления обучения через 100ms (даём время на обновление DOM)
    setTimeout(function() {
        if (typeof window.loadDirections === 'function') {
            console.log('Обновляем направления для языка:', lang);
            window.loadDirections();
        } else if (typeof window.loadSimpleDirections === 'function') {
            console.log('Используем простую загрузку направлений');
            window.loadSimpleDirections();
        } else {
            console.error('Функции загрузки направлений не найдены!');
        }
    }, 100);
    
    console.log('✅ Язык изменён на:', lang);
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем сохраненный язык
    const savedLang = localStorage.getItem('preferredLang') || 'uz';
    
    // Устанавливаем начальный язык
    translatePage(savedLang);
    
    // Назначаем обработчик кнопки переключения
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            const newLang = currentLang === 'uz' ? 'ru' : 'uz';
            translatePage(newLang);
        });
    }
    
    // Делаем currentLang глобальной переменной для других файлов
    window.currentLang = currentLang;
    
    console.log('✅ Language system loaded for English by M');
});

// Экспортируем функции
if (typeof window !== 'undefined') {
    window.translatePage = translatePage;
    window.currentLang = currentLang;
}
