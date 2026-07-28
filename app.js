// app.js

// 1. حالة التطبيق (State Store)
const store = {
  data: {
    language: 'ar',
    themeColor: '#593BFE',
    name: '',
    title: '',
    email: '',
    phone: '',
    about: '',
    school: '',
    degree: '',
    company: '',
    jobTitle: '',
    jobDesc: '',
    skills: [],
    photo: ''
  }
};

// 2. النصوص المترجمة (Translations)
const translations = {
  ar: {
    defaultName: 'الاسم الكامل هنا',
    defaultTitle: 'المسمى الوظيفي الخاص بك',
    email: 'البريد',
    phone: 'الهاتف',
    aboutTitle: 'نبذة عني',
    educationTitle: 'التعليم والشهادات',
    experienceTitle: 'الخبرة العملية',
    skillsTitle: 'المهارات',
    contactTitle: 'معلومات التواصل'
  },
  en: {
    defaultName: 'Your Full Name',
    defaultTitle: 'Your Job Title',
    email: 'Email',
    phone: 'Phone',
    aboutTitle: 'About Me',
    educationTitle: 'Education',
    experienceTitle: 'Work Experience',
    skillsTitle: 'Skills',
    contactTitle: 'Contact Info'
  }
};

// 3. دالة تحديث المعاينة الحية (Render CV Preview)
function updatePreview() {
  const cvPaper = document.getElementById('cvPaper');
  if (!cvPaper) return;

  const currentLang = store.data.language;
  const t = translations[currentLang] || translations.ar;
  const selectedTemplate = document.getElementById('templateSelect')?.value || '1';

  let htmlContent = '';
  if (selectedTemplate === '1' && typeof renderTemplate1 === 'function') {
    htmlContent = renderTemplate1(store.data, t);
  } else if (selectedTemplate === '2' && typeof renderTemplate2 === 'function') {
    htmlContent = renderTemplate2(store.data, t);
  } else if (selectedTemplate === '3' && typeof renderTemplate3 === 'function') {
    htmlContent = renderTemplate3(store.data, t);
  } else if (selectedTemplate === '4' && typeof renderTemplate4 === 'function') {
    htmlContent = renderTemplate4(store.data, t);
  } else if (typeof renderTemplate1 === 'function') {
    htmlContent = renderTemplate1(store.data, t);
  }

  cvPaper.innerHTML = htmlContent;
}

// 4. ربط حقول المدخلات بالحالة (Form Inputs Event Listeners)
function initFormListeners() {
  const inputs = [
    'name', 'title', 'email', 'phone', 
    'about', 'school', 'degree', 'company', 
    'jobTitle', 'jobDesc'
  ];

  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', (e) => {
        store.data[id] = e.target.value;
        updatePreview();
      });
    }
  });

  // المهارات
  const skillsInput = document.getElementById('skills');
  if (skillsInput) {
    skillsInput.addEventListener('input', (e) => {
      const val = e.target.value;
      store.data.skills = val ? val.split(',').map(s => s.trim()).filter(Boolean) : [];
      updatePreview();
    });
  }

  // الصورة الشخصية
  const photoInput = document.getElementById('photo');
  if (photoInput) {
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          store.data.photo = evt.target.result;
          updatePreview();
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // اختيار القالب
  const templateSelect = document.getElementById('templateSelect');
  if (templateSelect) {
    templateSelect.addEventListener('change', () => {
      updatePreview();
    });
  }

  // اختيار اللون
  const themeColorInput = document.getElementById('themeColor');
  if (themeColorInput) {
    themeColorInput.addEventListener('input', (e) => {
      store.data.themeColor = e.target.value;
      document.documentElement.style.setProperty('--cv-theme-color', e.target.value);
      updatePreview();
    });
  }

  // اختيار اللغة
  const langSelect = document.getElementById('langSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      store.data.language = e.target.value;
      updatePreview();
    });
  }
}

// 5. دالة التنزيل المضمونة للطباعة وتحويل PDF
function initPDFExport() {
  const printBtn = document.getElementById('printBtn');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    const cvElement = document.getElementById('cvPaper');
    if (!cvElement) return;

    // إنشاء iframe مخفي لإنشاء نسخة طباعة قياسية A4
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow.document;
    
    // كتابة محتوى السيفي مع التنسيقات الخاصة بالطباعة
    doc.open();
    doc.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="UTF-8">
        <title>CV</title>
        <link href="https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
          :root {
            --cv-theme-color: ${store.data.themeColor || '#593BFE'};
          }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Tajawal', sans-serif; }
          body { background: white; width: 210mm; margin: 0 auto; padding: 10mm; }
          @page { size: A4 portrait; margin: 0; }
        </style>
      </head>
      <body>
        ${cvElement.innerHTML}
      </body>
      </html>
    `);
    doc.close();

    // تشغيل أمر الطباعة فور تجهيز المستند في الـ iframe
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 1000);
    }, 300);
  });
}

// 6. تشغيل السكربت عند التكليف
document.addEventListener('DOMContentLoaded', () => {
  initFormListeners();
  initPDFExport();
  updatePreview();
});
