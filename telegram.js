// telegram.js - РАБОЧИЙ КОД ДЛЯ ENGLISH BY M
// Упрощенная версия без HTML ошибок

const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';

// ПРАВИЛЬНЫЕ CHAT_ID
const WORKING_CHAT_IDS = [
    '-1003273735145',  // Группа "Nomzodlar zapros boyicha"
    '8455664873'       // Ваш личный чат
];

// Основная функция отправки
async function sendToTelegram(formData) {
    console.log('📤 Отправляем заявку...');
    
    if (!formData.name || !formData.phone || !formData.course) {
        console.error('❌ Не все поля заполнены');
        return false;
    }
    
    const message = formatTelegramMessage(formData);
    let successCount = 0;
    
    // Отправляем во все чаты
    for (const chatId of WORKING_CHAT_IDS) {
        const success = await sendToChat(chatId, message);
        if (success) successCount++;
    }
    
    return successCount > 0;
}

// Отправка в конкретный чат
async function sendToChat(chatId, message) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML' // Используем HTML, но БЕЗ ошибок
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Отправлено в ${getChatName(chatId)}`);
            return true;
        } else {
            console.warn(`⚠️ Ошибка для ${chatId}:`, data.description);
            return false;
        }
    } catch (error) {
        console.error(`❌ Сетевая ошибка:`, error);
        return false;
    }
}

// Форматирование сообщения (ИСПРАВЛЕННАЯ ВЕРСИЯ)
function formatTelegramMessage(data) {
    const lang = window.currentLang || 'uz';
    const time = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Простое и безопасное форматирование
    if (lang === 'ru') {
        return `<b>🎓 НОВАЯ ЗАЯВКА - English by M</b>\n\n` +
               `<b>👤 Имя:</b> ${escapeHtml(data.name)}\n` +
               `<b>📞 Телефон:</b> <code>${escapeHtml(data.phone)}</code>\n` +
               `<b>🎯 Курс:</b> ${escapeHtml(data.course)}\n` +
               `<b>🌍 Язык сайта:</b> Русский\n` +
               `<b>⏰ Время:</b> ${time}\n` +
               `<b>📍 Адрес:</b> Gazalkent, Musiqa va san'at maktabi\n\n` +
               `<i>🚀 Свяжитесь в течение 10 минут!</i>\n\n` +
               `Телефон для связи: ${data.phone}\n` +
               `WhatsApp: https://wa.me/998949190666`;
    } else {
        return `<b>🎓 YANGI ARIZA - English by M</b>\n\n` +
               `<b>👤 Ism:</b> ${escapeHtml(data.name)}\n` +
               `<b>📞 Telefon:</b> <code>${escapeHtml(data.phone)}</code>\n` +
               `<b>🎯 Kurs:</b> ${escapeHtml(data.course)}\n` +
               `<b>🌍 Sayt tili:</b> O'zbek\n` +
               `<b>⏰ Vaqt:</b> ${time}\n` +
               `<b>📍 Manzil:</b> Gazalkent, Musiqa va san'at maktabi\n\n` +
               `<i>🚀 10 daqiqa ichida aloqaga chiqing!</i>\n\n` +
               `Bog'lanish uchun: ${data.phone}\n` +
               `WhatsApp: https://wa.me/998949190666`;
    }
}

// Вспомогательная функция для экранирования HTML
function escapeHtml(text) {
    if (!text) return '';
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Вспомогательная функция
function getChatName(chatId) {
    switch(chatId) {
        case '-1003273735145': return 'Группа "Nomzodlar"';
        case '8455664873': return 'Личный чат';
        default: return chatId;
    }
}

// Функция показа уведомления на сайте
function showSiteNotification(message, type = 'success') {
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
    
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.add('fade-out');
            setTimeout(() => {
                if (notification.parentNode) notification.remove();
            }, 300);
        }
    }, 5000);
    
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
}

// Проверка подключения
async function checkTelegramConnection() {
    console.log('🔍 Проверяем бота...');
    
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Бот активен: @${data.result.username}`);
            return true;
        } else {
            console.error('❌ Бот недоступен:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        return false;
    }
}

// Обработчик формы
function setupFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('❌ Форма не найдена');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const currentLang = window.currentLang || 'uz';
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value,
            lang: currentLang
        };
        
        // Валидация
        if (!formData.name || formData.name.length < 2) {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, ismingizni kiriting' 
                    : '❌ Пожалуйста, введите имя',
                'error'
            );
            return;
        }
        
        if (!formData.phone || formData.phone.length < 5) {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, telefon raqamingizni kiriting' 
                    : '❌ Пожалуйста, введите номер телефона',
                'error'
            );
            return;
        }
        
        if (!formData.course) {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, kursni tanlang' 
                    : '❌ Пожалуйста, выберите курс',
                'error'
            );
            return;
        }
        
        // Индикатор загрузки
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = currentLang === 'uz' 
            ? '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...' 
            : '<i class="fas fa-spinner fa-spin"></i> Отправляем...';
        submitBtn.disabled = true;
        
        // Отправляем
        const success = await sendToTelegram(formData);
        
        // Результат
        if (success) {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '✅ Arizangiz qabul qilindi! Tez orada aloqaga chiqamiz.' 
                    : '✅ Заявка принята! Скоро с вами свяжемся.',
                'success'
            );
            
            this.reset();
            document.getElementById('course').selectedIndex = 0;
        } else {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, telefon orqali bog\'laning: +998 94 919-06-66' 
                    : '❌ Пожалуйста, позвоните: +998 94 919-06-66',
                'error'
            );
        }
        
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Telegram система загружается...');
    
    setupFormHandler();
    
    setTimeout(() => {
        checkTelegramConnection();
    }, 1000);
    
    console.log('✅ Telegram готов к работе');
    console.log('📋 Chat IDs:', WORKING_CHAT_IDS);
});
