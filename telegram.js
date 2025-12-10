// telegram.js - ИСПРАВЛЕННЫЙ КОД С РАБОЧИМИ ID

const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';

// РАБОЧИЕ CHAT_ID (из вашего сообщения)
const CHAT_IDS = [
    '-1003273735145',  // ✅ Группа "Nomzodlar zapros boyicha" (ОСНОВНОЙ)
    '8455664873'       // ✅ Ваш личный чат (дополнительно)
];

// Основная функция отправки - отправляем во ВСЕ чаты
async function sendToTelegram(formData) {
    if (!formData.name || !formData.phone || !formData.course) {
        return false;
    }
    
    const message = formatTelegramMessage(formData);
    let atLeastOneSuccess = false;
    
    console.log('📤 Отправляем заявку в Telegram...');
    
    // Отправляем во все указанные чаты
    for (const chatId of CHAT_IDS) {
        const success = await sendToSingleChat(chatId, message);
        if (success) {
            atLeastOneSuccess = true;
            console.log(`✅ Успешно отправлено в чат: ${chatId}`);
        }
    }
    
    return atLeastOneSuccess;
}

// Отправка в один конкретный чат
async function sendToSingleChat(chatId, message) {
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
                disable_notification: false
            })
        });
        
        const data = await response.json();
        
        if (data.ok) {
            console.log(`📨 Сообщение отправлено в ${chatId}, ID: ${data.result.message_id}`);
            return true;
        } else {
            console.warn(`⚠️ Ошибка для ${chatId}:`, data.description);
            return false;
        }
    } catch (error) {
        console.error(`❌ Сетевая ошибка для ${chatId}:`, error);
        return false;
    }
}

// Тестовая функция для проверки
async function testTelegramConnection() {
    console.log('🧪 Тестируем подключение к Telegram...');
    
    for (const chatId of CHAT_IDS) {
        console.log(`Проверяем чат: ${chatId}`);
        
        const testUrl = `https://api.telegram.org/bot${BOT_TOKEN}/getChat?chat_id=${chatId}`;
        
        try {
            const response = await fetch(testUrl);
            const data = await response.json();
            
            if (data.ok) {
                console.log(`✅ Чат доступен: ${data.result.title || 'Личный чат'}`);
                console.log(`   Тип: ${data.result.type}`);
            } else {
                console.warn(`❌ Чат недоступен: ${data.description}`);
            }
        } catch (error) {
            console.error(`❌ Ошибка проверки:`, error);
        }
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
        minute: '2-digit',
        second: '2-digit'
    });
    
    if (lang === 'ru') {
        return `🎓 <b>НОВАЯ ЗАЯВКА - English by M</b>\n\n` +
               `👤 <b>Имя:</b> ${data.name}\n` +
               `📞 <b>Телефон:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Курс:</b> ${data.course}\n` +
               `🌍 <b>Язык сайта:</b> Русский\n` +
               `⏰ <b>Время:</b> ${time}\n` +
               `📍 <b>Адрес:</b> Gazalkent, Musiqa va san'at maktabi\n` +
               `🔗 <b>Сайт:</b> English by M\n\n` +
               `🚀 <i>Свяжитесь в течение 10 минут!</i>\n` +
               `📱 <a href="tel:${data.phone}">Позвонить</a> | ` +
               `<a href="https://wa.me/998949190666?text=Здравствуйте! Я оставлял заявку: ${encodeURIComponent(data.name)}">WhatsApp</a>`;
    } else {
        return `🎓 <b>YANGI ARIZA - English by M</b>\n\n` +
               `👤 <b>Ism:</b> ${data.name}\n` +
               `📞 <b>Telefon:</b> <code>${data.phone}</code>\n` +
               `🎯 <b>Kurs:</b> ${data.course}\n` +
               `🌍 <b>Sayt tili:</b> O'zbek\n` +
               `⏰ <b>Vaqt:</b> ${time}\n` +
               `📍 <b>Manzil:</b> Gazalkent, Musiqa va san'at maktabi\n` +
               `🔗 <b>Sayt:</b> English by M\n\n` +
               `🚀 <i>10 daqiqa ichida aloqaga chiqing!</i>\n` +
               `📱 <a href="tel:${data.phone}">Qo'ng'iroq qilish</a> | ` +
               `<a href="https://wa.me/998949190666?text=Assalomu alaykum! Men ariza qoldirdim: ${encodeURIComponent(data.name)}">WhatsApp</a>`;
    }
}

// Функция показа уведомления
function showNotification(message, type = 'success') {
    // Удаляем старые уведомления
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
        
        if (!formData.phone || formData.phone.replace(/\D/g, '').length < 9) {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Iltimos, to\'g\'ri telefon raqam kiriting' 
                    : '❌ Пожалуйста, введите корректный номер телефона',
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
                    ? '✅ English by M: Ariza qabul qilindi! 5-10 daqiqa ichida aloqaga chiqamiz.' 
                    : '✅ English by M: Заявка принята! Свяжемся в течение 5-10 минут.',
                'success'
            );
            
            // Очищаем форму
            this.reset();
            document.getElementById('course').selectedIndex = 0;
            
            // Сохраняем в localStorage (резерв)
            saveToLocalStorage(formData);
        } else {
            showNotification(
                currentLang === 'uz' 
                    ? '❌ Xatolik yuz berdi. Iltimos, telefon orqali bog\'laning: +998 94 919-06-66' 
                    : '❌ Ошибка отправки. Позвоните, пожалуйста: +998 94 919-06-66',
                'error'
            );
        }
        
        // Восстанавливаем кнопку
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    });
}

// Сохранение в localStorage (резерв)
function saveToLocalStorage(formData) {
    try {
        const saved = JSON.parse(localStorage.getItem('englishbym_requests') || '[]');
        saved.push({
            ...formData,
            savedAt: new Date().toISOString(),
            sentToTelegram: true
        });
        
        // Храним только последние 50 заявок
        if (saved.length > 50) {
            saved = saved.slice(-50);
        }
        
        localStorage.setItem('englishbym_requests', JSON.stringify(saved));
        console.log('✅ Заявка сохранена в localStorage');
    } catch (error) {
        console.error('❌ Ошибка сохранения:', error);
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Настраиваем обработчик формы
    setupFormHandler();
    
    // Тестируем подключение при загрузке
    setTimeout(() => {
        testTelegramConnection();
    }, 2000);
    
    // Показываем информацию о боте
    console.log('🤖 Бот: @english_by_m_bot');
    console.log('👤 Личный chat_id: 8455664873');
    console.log('👥 Группа chat_id: -1003273735145');
    console.log('📝 Группа: "Nomzodlar zapros boyicha"');
    console.log('✅ Telegram system loaded for English by M');
});
