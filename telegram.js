// telegram.js - English by M

const BOT_TOKEN = '8506286493:AAE-mPIm05vH_KLPQ4mTdoPPlWj3gl4G-YM';
const CHAT_ID = '1003273735145';

// Функция отправки в Telegram
async function sendToTelegram(formData) {
    // Проверяем, все ли поля заполнены
    if (!formData.name || !formData.phone || !formData.course) {
        return false;
    }
    
    // Форматируем сообщение
    const message = formatTelegramMessage(formData);
    
    // URL для отправки с CORS прокси
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
            console.log('✅ Заявка отправлена в Telegram от English by M');
            return true;
        } else {
            console.error('❌ Ошибка Telegram:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка сети:', error);
        
        // Альтернативный метод через прокси
        try {
            return await sendViaProxy(formData);
        } catch (proxyError) {
            console.error('❌ Ошибка прокси:', proxyError);
            return false;
        }
    }
}

// Альтернативная отправка через прокси
async function sendViaProxy(formData) {
    const message = formatTelegramMessage(formData);
    const proxyUrl = `https://corsproxy.io/?https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(proxyUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: CHAT_ID,
            text: message,
            parse_mode: 'HTML'
        })
    });
    
    const data = await response.json();
    return data.ok;
}

// Форматирование сообщения для English by M
function formatTelegramMessage(data) {
    const lang = window.currentLang || 'uz';
    const time = new Date().toLocaleString('uz-UZ', {
        timeZone: 'Asia/Tashkent',
        hour12: false,
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

// Обработчик формы для English by M
function setupFormHandler() {
    const form = document.getElementById('contactForm');
    
    if (!form) {
        console.error('❌ Форма не найдена на сайте English by M!');
        return;
    }
    
    // Удаляем старые обработчики
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    // Добавляем новый обработчик
    newForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Получаем текущий язык
        const currentLang = window.currentLang || 'uz';
        
        // Получаем данные формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            course: document.getElementById('course').value,
            lang: currentLang,
            timestamp: new Date().toISOString(),
            source: 'English by M Website'
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
            
            // Сохраняем в localStorage
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

// Сохранение в localStorage
function saveToLocalStorage(formData) {
    try {
        const saved = JSON.parse(localStorage.getItem('englishbym_requests') || '[]');
        saved.push({
            ...formData,
            savedAt: new Date().toISOString()
        });
        
        // Храним только последние 20 заявок
        if (saved.length > 20) {
            saved = saved.slice(-20);
        }
        
        localStorage.setItem('englishbym_requests', JSON.stringify(saved));
        console.log('✅ Заявка сохранена в localStorage для English by M');
    } catch (error) {
        console.error('❌ Ошибка сохранения в localStorage:', error);
    }
}

// Проверка доступности бота
async function checkBotAvailability() {
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`);
        const data = await response.json();
        
        if (data.ok) {
            console.log(`✅ Бот English by M активен: @${data.result.username}`);
            return true;
        } else {
            console.error('❌ Бот English by M не доступен:', data.description);
            return false;
        }
    } catch (error) {
        console.error('❌ Ошибка проверки бота English by M:', error);
        return false;
    }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    // Настраиваем обработчик формы
    setupFormHandler();
    
    // Проверяем бота при загрузке
    setTimeout(checkBotAvailability, 2000);
    
    // Мониторим переключение языка
    const langToggle = document.getElementById('langToggle');
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            setTimeout(() => {
                const langText = document.getElementById('currentLang').textContent;
                window.currentLang = langText.toLowerCase();
            }, 100);
        });
    }
    
    console.log('✅ Telegram system loaded for English by M');
});

// Экспортируем функции
if (typeof window !== 'undefined') {
    window.sendToTelegram = sendToTelegram;
    window.showNotification = showNotification;
}
