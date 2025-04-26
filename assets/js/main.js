// ملف main.js
document.addEventListener("DOMContentLoaded", function() {
    AOS.init({
        duration: 1200,
        once: true
    });
});



document.addEventListener("DOMContentLoaded", () => {
    const steps = document.querySelectorAll(".form-step");
    let current = 0;
  
    const showStep = (i) => {
      steps.forEach((step, index) => {
        step.classList.toggle("active", index === i);
      });
    };
  
    document.querySelectorAll(".next-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (current < steps.length - 1) current++;
        showStep(current);
      });
    });
  
    document.querySelectorAll(".prev-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (current > 0) current--;
        showStep(current);
      });
    });
  
    // Optional: Handle form submission
    document.getElementById("project-form").addEventListener("submit", e => {
      e.preventDefault();
      alert("تم إرسال طلبك بنجاح! ✅");
      // يمكنك لاحقًا إضافة إرسال البيانات بـ fetch/AJAX أو PHP
    });
  });

  

// ربط واجهة المحادثة بـ OpenAI API
const API_KEY = "";

document.getElementById('send-btn').addEventListener('click', async function () {
  const inputEl = document.getElementById('user-input');
  const userInput = inputEl.value.trim();

  if (!userInput) return;

  // أضف رسالة المستخدم في الواجهة
  const userMessage = document.createElement('div');
  userMessage.classList.add('chat-message', 'user-message');
  userMessage.innerHTML = `<p>${userInput}</p>`;
  document.querySelector('.chat-box').appendChild(userMessage);
  inputEl.value = "";

  // Scroll لتحت
  document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;

  // أضف رسالة انتظار
  const botMessage = document.createElement('div');
  botMessage.classList.add('chat-message', 'bot-message');
  botMessage.innerHTML = `<p>⏳ جاري التفكير...</p>`;
  document.querySelector('.chat-box').appendChild(botMessage);

  try {
    // إرسال طلب للـ OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "أنت مساعد تصميم شعارات، مهمتك مساعدة العميل على وصف فكرة الشعار بشكل واضح لتقوم برسم فكرة أولية (سكتش) بقلم رصاص على ورقة." },
          { role: "user", content: userInput }
        ],
        temperature: 0.7
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "عذرًا، لم أتمكن من الرد الآن.";

    botMessage.innerHTML = `<p>${reply}</p>`;
    document.querySelector('.chat-box').scrollTop = document.querySelector('.chat-box').scrollHeight;
  } catch (error) {
    console.error(error);
    botMessage.innerHTML = `<p>⚠️ حدث خطأ أثناء الاتصال بالخدمة.</p>`;
  }
});

// ✅ زر فتح الشات الجانبي (مثلاً يفتح لينك تواصل)
document.getElementById("support-chat-btn").addEventListener("click", () => {
  window.open("https://wa.me/201234567890", "_blank");
});

// ✅ زر إرسال نتيجة المحادثة للمصمم
document.getElementById("send-results-btn").addEventListener("click", () => {
  const clientName = document.getElementById("client-name").value.trim();
  if (!clientName) {
    alert("من فضلك أدخل اسمك قبل الإرسال");
    return;
  }

  const messages = [...document.querySelectorAll(".chat-message")].map(m => m.innerText).join("\n---\n");

  const fullContent = `اسم العميل: ${clientName}\n\nالمحادثة:\n${messages}`;
  
  // مثال بسيط على إرسال البيانات عبر webhook أو backend
  console.log(fullContent); // في الواقع ترسلها بـ fetch

  alert("تم إرسال الفكرة بنجاح للمصممين! 👌");
});


const chatWindow = document.getElementById("chat-window");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const sendResult = document.getElementById("send-result");

function sendMessage(e) {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  appendMessage("user", message);
  userInput.value = "";

  // Simulate bot response
  setTimeout(() => {
    const botReply = generateBotReply(message);
    appendMessage("bot", botReply);

    // Show "send to designer" after 3 exchanges
    if (chatWindow.querySelectorAll(".message.user").length >= 3) {
      sendResult.style.display = "block";
    }
  }, 800);
}

function appendMessage(type, text) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function generateBotReply(msg) {
  // ردود مؤقتة – ممكن تطويرها لاحقًا
  if (msg.includes("ألوان")) return "هل تفضل ألوان دافئة أم باردة؟";
  if (msg.includes("شكل")) return "هل تفضل الشعار نصي أم أيقوني؟";
  return "جميل! ممكن توضح أكثر فكرتك؟";
}

function sendToDesigner() {
  alert("تم إرسال نتيجة المحادثة إلى المصمم ✅");
}


// Ripple effect on buttons
document.querySelectorAll('.ripple').forEach(btn => {
  btn.addEventListener('click', function (e) {
    const circle = document.createElement('span');
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple-circle');

    const ripple = btn.getElementsByClassName('ripple-circle')[0];

    if (ripple) {
      ripple.remove();
    }

    btn.appendChild(circle);
  });
});
