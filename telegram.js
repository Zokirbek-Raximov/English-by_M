// telegram.js - ИСПРАВЛЕННЫЙ ВЕРСИЯ

// ВАРИАНТ 1: Личный чат (если хотите получать заявки себе)
const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';
const CHAT_ID = '1003273735145'; // Ваш chat_id

// ВАРИАНТ 2: Группа (если хотите чтобы все видели)
// const CHAT_ID = '-1001234567890'; // ID группы (если есть)

// Функция проверки chat_id
async function testChatId(chatId) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${chatId}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Чат найден: ${data.result.title || data.result.first_name}`);
            console.log('Тип чата:', data.result.type);
            return true;
        } else {
            console.error(`❌ Ошибка: ${data.description}`);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        return false;
    }
}

// Улучшенная функция отправки
async function sendToTelegram(formData) {
    if (!formData.name || !formData.phone || !formData.course) {
        return false;
    }
    
    const message = formatTelegramMessage(formData);
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    console.log('Отправляем в чат:', CHAT_ID);
    console.log('Токен бота:', BOT_TOKEN.substring(0, 10) + '...');
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message,
                parse_mode: 'HTML',
                disable_notification: false
            })
        });
        
        const data = await response.json();
        console.log('Ответ Telegram:', data);
        
        if (data.ok) {
            console.log('✅ Заявка отправлена! ID:', data.result.message_id);
            return true;
        } else {
            console.error('❌ Ошибка Telegram:', data.description);
            
            // Попробуем альтернативные chat_id
            if (data.description.includes('chat not found')) {
                console.log('Пробуем альтернативные chat_id...');
                return await tryAlternativeChatIds(formData);
            }
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        return false;
    }
}

// Пробуем разные chat_id
async function tryAlternativeChatIds(formData) {
    const alternativeChatIds = [
        '1003273735145',    // Ваш указанный
        '8455664873',       // Старый из кода
        '-1001234567890'    // Пример ID группы
    ];
    
    const message = formatTelegramMessage(formData);
    
    for (const chatId of alternativeChatIds) {
        console.log('Пробуем chat_id:', chatId);
        
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message,
                    parse_mode: 'HTML'
                })
            });
            
            const data = await response.json();
            if (data.ok) {
                console.log(`✅ Успешно отправлено в chat_id: ${chatId}`);
                // Сохраняем рабочий chat_id
                localStorage.setItem('working_chat_id', chatId);
                return true;
            }
        } catch (e) {
            continue; // Пробуем следующий
        }
    }
    
    return false;
}

// Форматирование сообщения (оставить как было)
function formatTelegramMessage(data) {
    const lang = window.currentLang || 'uz';
    const time = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        hour12: false
    });
    
    if (lang === 'ru') {
        return `🎓 <b>НОВАЯ ЗАЯВКА - English by M</b>\n\n` +
               `👤 <b>Имя:</b> ${data.name}\n` +
               `📞 <b>Телефон:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Курс:</b> ${data.course}\n` +
               `🌍 <b>Язык сайта:</b> Русский\n` +
               `⏰ <b>Время:</b> ${time}\n` +
               `🔗 <b>Сайт:</b> English by M\n\n` +
               `🚀 <i>Свяжитесь в течение 10 минут!</i>`;
    } else {
        return `🎓 <b>YANGI ARIZA - English by M</b>\n\n` +
               `👤 <b>Ism:</b> ${data.name}\n` +
               `📞 <b>Telefon:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Kurs:</b> ${data.course}\n` +
               `🌍 <b>Sayt tili:</b> O'zbek\n` +
               `⏰ <b>Vaqt:</b> ${time}\n` +
               `🔗 <b>Sayt:</b> English by M\n\n` +
               `🚀 <i>10 daqiqa ichida aloqaga chiqing!</i>`;
    }
}

// Инициализация с проверкой
document.addEventListener('DOMContentLoaded', function() {
    // Проверяем chat_id при загрузке
    setTimeout(async () => {
        console.log('🔍 Проверяем доступность чата...');
        const isValid = await testChatId(CHAT_ID);
        
        if (!isValid) {
            console.warn('⚠️ Текущий chat_id не работает. Проверьте альтернативы.');
            showNotification(
                window.currentLang === 'uz' 
                    ? '⚠️ Telegram sozlamalari tekshirilmoqda...' 
                    : '⚠️ Проверяем настройки Telegram...',
                'error'
            );
        }
    }, 2000);
    
    // ... остальной код инициализации
});
