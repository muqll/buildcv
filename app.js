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

  // اختيار القالب المناسب حسب القيمة المحددة
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

  // المهارات (تحويل النص إلى مصفوفة يفصل بينها فاصلة)
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

// 5. دالة تنزيل الـ PDF (مع ضبط الأبعاد الذكي للموبايل)
// app.js - الدالة المعدلة لمنع الصفحة البيضاء عند التحميل

// app.js - الحل المضمون 100% للطباعة وتنزيل الـ PDF
function initPDFExport() {
  const printBtn = document.getElementById('printBtn');
  if (!printBtn) return;

  printBtn.addEventListener('click', () => {
    // فتح نافذة الطباعة/حفظ PDF المدمجة في النظام
    window.print();
  });
}


    // 1. إنشاء نسخة مطابقة للمعاينة في الخلفية بأبعاد A4 حقيقية
    const clone = cvElement.cloneNode(true);
    clone.style.width = '210mm';
    clone.style.minHeight = '297mm';
    clone.style.position = 'absolute';
    clone.style.left = '-9999px';
    clone.style.top = '0';
    clone.style.background = '#ffffff';
    
    document.body.appendChild(clone);

    // 2. إعدادات html2pdf المضمونة للتصوير
    const opt = {
      margin: 0,
      filename: `${personName}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2, 
        useCORS: true, 
        logging: false,
        scrollX: 0,
        scrollY: 0
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // 3. التصدير من النسخة المخفية ثم حذفها
    html2pdf().set(opt).from(clone).save().then(() => {
      document.body.removeChild(clone);
      printBtn.innerText = originalText;
      printBtn.disabled = false;
    }).catch(err => {
      console.error('حدث خطأ أثناء تحميل الـ PDF:', err);
      if (document.body.contains(clone)) {
        document.body.removeChild(clone);
      }
      printBtn.innerText = originalText;
      printBtn.disabled = false;
    });
  });
}


    // تطبيق أبعاد A4 الحقيقية مؤقتاً للتصدير
    cvElement.style.width = '210mm';
    cvElement.style.minHeight = '297mm';

    const opt = {
      margin:       0,
      filename:     `${personName}_CV.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true, logging: false },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(cvElement).save().then(() => {
      // إعادة التصميم للوضع المرن بعد التنزيل
      cvElement.style.width = '';
      cvElement.style.minHeight = '';
      printBtn.innerText = originalText;
      printBtn.disabled = false;
    }).catch(err => {
      console.error('حدث خطأ أثناء تحميل الـ PDF:', err);
      cvElement.style.width = '';
      cvElement.style.minHeight = '';
      printBtn.innerText = originalText;
      printBtn.disabled = false;
    });
  });
}

// 6. تشغيل السكربت عند اكتمال تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
  initFormListeners();
  initPDFExport();
  updatePreview();
});
