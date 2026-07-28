// app.js
document.addEventListener('DOMContentLoaded', () => {

  // ربط جميع المدخلات بالـ State
  const inputs = [
    { id: 'inputName', key: 'name' },
    { id: 'inputTitle', key: 'title' },
    { id: 'inputEmail', key: 'email' },
    { id: 'inputPhone', key: 'phone' },
    { id: 'inputAbout', key: 'about' },
    { id: 'inputCompany', key: 'company' },
    { id: 'inputJobTitle', key: 'jobTitle' },
    { id: 'inputJobDesc', key: 'jobDesc' },
    { id: 'inputSchool', key: 'school' },
    { id: 'inputDegree', key: 'degree' }
  ];

  inputs.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) {
      el.addEventListener('input', (e) => store.updateData(item.key, e.target.value));
    }
  });

  // المهارات
  document.getElementById('inputSkills').addEventListener('input', (e) => {
    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(s => s !== '');
    store.updateData('skills', skillsArray);
  });

  // رفع الصورة
  document.getElementById('inputPhoto').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => store.updateData('photo', evt.target.result);
      reader.readAsDataURL(file);
    }
  });

  // اختيار اللون
  document.getElementById('colorPicker').addEventListener('input', (e) => {
    store.updateData('themeColor', e.target.value);
  });

  // اختيار اللغة
  document.getElementById('langSelect').addEventListener('change', (e) => {
    store.updateData('language', e.target.value);
  });

  // اختيار القالب
  const templateButtons = document.querySelectorAll('.tmpl-btn');
  templateButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      templateButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      store.updateData('selectedTemplate', e.target.getAttribute('data-template'));
    });
  });

  // زر الطباعة
  document.getElementById('printBtn').addEventListener('click', () => {
    window.print();
  });

  // تحديث الرسم الحي (Render)
  store.subscribe((data) => {
    const paper = document.getElementById('cvPaper');
    const langDict = translations[data.language] || translations.ar;

    let templateHTML = '';
    switch(data.selectedTemplate) {
      case '1': templateHTML = renderTemplate1(data, langDict); break;
      case '2': templateHTML = renderTemplate2(data, langDict); break;
      case '3': templateHTML = renderTemplate3(data, langDict); break;
      case '4': templateHTML = renderTemplate4(data, langDict); break;
      default: templateHTML = renderTemplate1(data, langDict);
    }

    paper.innerHTML = templateHTML;
  });

  store.notify();
});