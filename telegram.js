// telegram.js - Отправка заявок в Telegram
const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';
const CHAT_ID = '8455664873';

// НЕ объявляем currentLang здесь - она уже есть в language.js
// let currentLang = 'uz'; // <-- УДАЛИТЬ ЭТУ СТРОКУ!

// Функция отправки в Telegram
async function sendToTelegram(formData) {
    // Проверяем, все ли поля заполнены
    if (!formData.name || !formData.phone || !formData.course) {
        return false;
    }
    
    // Форматируем сообщение
    const message = formatTelegramMessage(formData);
    
    // URL для отправки
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_notification: false
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            console.log('✅ Заявка отправлена в Telegram:', data.result.message_id);
            return true;
        } else {
            console.error('❌ Ошибка Telegram:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        return false;
    }
}

// Форматирование сообщения
function formatTelegramMessage(data) {
    // Получаем currentLang из глобальной области
    const lang = window.currentLang || 'uz';
    const time = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        hour12: false
    });
    
    if (lang === 'ru') {
        return `📥 <b>НОВАЯ ЗАЯВКА С САЙТА</b>\n\n` +
               `👤 <b>Имя:</b> ${data.name}\n` +
               `📞 <b>Телефон:</b> <code>${data.phone}</code>\n` +
               `🎓 <b>Курс:</b> ${data.course}\n` +
               `🌍 <b>Язык сайта:</b> Русский\n` +
               `⏰ <b>Время:</b> ${time}\n` +
               `🔗 <b>Источник:</b> ${window.location.href}\n\n` +
               `🚀 <i>Свяжитесь в течение 10 минут!</i>`;
    } else {
        return `📥 <b>SAYTDAN YANGI ARIZA</b>\n\n` +
               `👤 <b>Ism:</b> ${data.name}\n` +
               `📞 <b>Telefon:</b> <code>${data.phone}</code>\n` +
               `🎓 <b>Kurs:</b> ${data.course}\n` +
               `🌍 <b>Sayt tili:</b> O'zbek\n` +
               `⏰ <b>Vaqt:</b> ${time}\n` +
               `🔗 <b>Manba:</b> ${window.location.href}\n\n` +
               `🚀 <i>10 daqiqa ichida aloqaga chiqing!</i>`;
    }
}

// Функция показа уведомления
function showNotification(message, type = 'success') {
    // Удаляем предыдущие уведомления
    const oldNotifications = document.querySelectorAll('.notification');
    oldNotifications.forEach(n => n.remove());
    
    // Создаем новое уведомление
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    document.body.appendChild(notification);
    
    // Автоудаление через 5 секунд
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
    
    // Закрытие по клику
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Обработчик формы
function setupFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('❌ Форма не найдена!');
        return;
    }
    
    // Удаляем старые обработчики
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Добавляем новый обработчик
    newForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Получаем currentLang из глобальной области
        const currentLang = window.currentLang || 'uz';
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value,
            lang: currentLang,
            timestamp: new Date().toISOString()
        };
        
        // Валидация
        if (!formData.name || formData.name.length < 2) {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, ismingizni kiriting (kamida 2 harf)' 
                    : '❌ Пожалуйста, введите имя (минимум 2 буквы)',
                'error'
            );
            return;
        }
        
        if (!formData.phone || formData.phone.length < 5) {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, telefon raqamingizni kiriting' 
                    : '❌ Пожалуйста, введите номер телефона',
                'error'
            );
            return;
        }
        
        if (!formData.course) {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, kursni tanlang' 
                    : '❌ Пожалуйста, выберите курс',
                'error'
            );
            return;
        }
        
        // Визуальная обратная связь
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        const originalWidth = submitBtn.offsetWidth;
        
        submitBtn.style.width = `${originalWidth}px`;
        submitBtn.innerHTML = currentLang === 'uz' 
            ? '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...' 
            : '<i class="fas fa-spinner fa-spin"></i> Отправляем...';
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        const success = await sendToTelegram(formData);
        
        // Показываем результат
        if (success) {
            showNotification(
                currentLang === 'uz' 
                    ? '✅ Arizangiz qabul qilindi! 5-10 daqiqa ichida aloqaga chiqamiz.' 
                    : '✅ Заявка принята! Свяжемся в течение 5-10 минут.',
                'success'
            );
            
            // Очищаем форму
            this.reset();
            document.getElementById('course').selectedIndex = 0;
        } else {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Xatolik yuz berdi. Iltimos, telefon orqali bog\'laning.' 
                    : '❌ Ошибка отправки. Позвоните, пожалуйста.',
                'error'
            );
        }
        
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.width = '';
    });
}

// Обновляем currentLang при переключении языка
function updateCurrentLang(lang) {
    window.currentLang = lang;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Инициализируем глобальную переменную
    window.currentLang = window.currentLang || 'uz';
    
    // Настраиваем обработчик формы
    setupFormHandler();
    
    // Мониторим переключение языка
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            // Обновляем currentLang после переключения
            setTimeout(() => {
                const langText = document.getElementById('currentLang').textContent;
                window.currentLang = langText.toLowerCase();
            }, 100);
        });
    }
    
    // Проверяем доступность бота (опционально)
    checkBotAvailability();
});

// Проверка доступности бота
async function checkBotAvailability() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Бот активен: @${data.result.username}`);
        } else {
            console.error('❌ Бот не доступен:', data.description);
        }
    } catch (error) {
        console.error('❌ Ошибка проверки бота:', error);
    }
}

// Экспортируем функции для использования в других файлах
if (typeof window !== 'undefined') {
    window.sendToTelegram = sendToTelegram;
    window.showNotification = showNotification;
    window.updateCurrentLang = updateCurrentLang;
}
