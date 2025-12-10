// telegram.js - РАБОЧАЯ ВЕРСИЯ ДЛЯ ENGLISH BY M

const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';

// ПРАВИЛЬНЫЕ CHAT_ID (с минусом для группы!)
const WORKING_CHAT_IDS = [
    '-1003273735145',  // ✅ Группа "Nomzodlar zapros boyicha" (ОСНОВНОЙ)
    '8455664873'       // ✅ Ваш личный чат
];

// Основная функция отправки
async function sendToTelegram(formData) {
    console.log('📤 Начинаем отправку заявки в Telegram...');
    
    if (!formData.name || !formData.phone || !formData.course) {
        console.error('❌ Не все поля заполнены');
        return false;
    }
    
    const message = formatTelegramMessage(formData);
    let successCount = 0;
    
    // Отправляем во все рабочие чаты
    for (const chatId of WORKING_CHAT_IDS) {
        try {
            const success = await sendToChat(chatId, message);
            if (success) {
                successCount++;
                console.log(`✅ Отправлено в ${chatId}`);
            }
        } catch (error) {
            console.warn(`⚠️ Ошибка при отправке в ${chatId}:`, error.message);
        }
    }
    
    return successCount > 0; // Успех, если хотя бы в один чат отправлено
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
                parse_mode: 'HTML',
                disable_web_page_preview: false,
                disable_notification: false
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            console.log(`📨 Сообщение #${data.result.message_id} отправлено в ${getChatName(chatId)}`);
            return true;
        } else {
            console.warn(`⚠️ Telegram ошибка для ${chatId}:`, data.description);
            return false;
        }
    } catch (error) {
        console.error(`❌ Сетевая ошибка:`, error);
        return false;
    }
}

// Форматирование сообщения
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
    
    if (lang === 'ru') {
        return `🎓 <b>НОВАЯ ЗАЯВКА - English by M</b>\n\n` +
               `👤 <b>Имя:</b> ${data.name}\n` +
               `📞 <b>Телефон:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Курс:</b> ${data.course}\n` +
               `🌍 <b>Язык сайта:</b> Русский\n` +
               `⏰ <b>Время:</b> ${time}\n` +
               `📍 <b>Адрес:</b> Gazalkent, Musiqa va san'at maktabi\n\n` +
               `🚀 <i>Свяжитесь в течение 10 минут!</i>\n\n` +
               `📱 <a href="tel:${data.phone}">Позвонить</a> | ` +
               `<a href="https://wa.me/998949190666?text=Здравствуйте! Я ${encodeURIComponent(data.name)}, оставлял заявку на курс ${encodeURIComponent(data.course)}">WhatsApp</a>`;
    } else {
        return `🎓 <b>YANGI ARIZA - English by M</b>\n\n` +
               `👤 <b>Ism:</b> ${data.name}\n` +
               `📞 <b>Telefon:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Kurs:</b> ${data.course}\n` +
               `🌍 <b>Sayt tili:</b> O'zbek\n` +
               `⏰ <b>Vaqt:</b> ${time}\n` +
               `📍 <b>Manzil:</b> Gazalkent, Musiqa va san'at maktabi\n\n` +
               `🚀 <i>10 daqiqa ichida aloqaga chiqing!</i>\n\n` +
               `📱 <a href="tel:${data.phone}">Qo'ng'iroq qilish</a> | ` +
               `<a href="https://wa.me/998949190666?text=Assalomu alaykum! Men ${encodeURIComponent(data.name)}, "${encodeURIComponent(data.course)}" kursiga ariza qoldirdim">WhatsApp</a>`;
    }
}

// Вспомогательная функция для имени чата
function getChatName(chatId) {
    switch(chatId) {
        case '-1003273735145': return 'Группа "Nomzodlar"';
        case '8455664873': return 'Личный чат Zokirbek';
        default: return chatId;
    }
}

// Функция показа уведомления на сайте
function showSiteNotification(message, type = 'success') {
    // Создаем элемент уведомления
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

// Простая проверка подключения
async function checkTelegramConnection() {
    console.log('🔍 Проверяем подключение к Telegram...');
    
    // Просто проверяем бота
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getMe`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Бот активен: @${data.result.username}`);
            console.log(`📊 Готов к отправке в ${WORKING_CHAT_IDS.length} чата(ов)`);
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
        console.error('❌ Форма не найдена на странице');
        return;
    }
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Получаем данные
        const currentLang = window.currentLang || 'uz';
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value,
            lang: currentLang
        };
        
        // Простая валидация
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
        
        // Показываем индикатор загрузки
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = currentLang === 'uz' 
            ? '<i class="fas fa-spinner fa-spin"></i> Yuborilmoqda...' 
            : '<i class="fas fa-spinner fa-spin"></i> Отправляем...';
        submitBtn.disabled = true;
        
        // Отправляем в Telegram
        const success = await sendToTelegram(formData);
        
        // Обрабатываем результат
        if (success) {
            showSiteNotification(
                currentLang === 'uz' 
                    ? '✅ Arizangiz qabul qilindi! Tez orada aloqaga chiqamiz.' 
                    : '✅ Заявка принята! Скоро с вами свяжемся.',
                'success'
            );
            
            // Очищаем форму
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
    console.log('🚀 Инициализируем Telegram систему...');
    
    // Настраиваем форму
    setupFormHandler();
    
    // Проверяем подключение
    setTimeout(() => {
        checkTelegramConnection();
    }, 1000);
    
    console.log('✅ Telegram система готова к работе!');
    console.log('📋 Будет отправлять в:');
    console.log('  1. Группу: "-1003273735145" (Nomzodlar zapros boyicha)');
    console.log('  2. Личный чат: "8455664873"');
});
