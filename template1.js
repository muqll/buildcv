// templates/template1.js
function renderTemplate1(data, t) {
  const dir = data.language === 'ar' ? 'rtl' : 'ltr';
  const color = data.themeColor;

  return `
    <div style="padding: 40px; direction: ${dir}; font-family: 'Tajawal', sans-serif;">
      
      <!-- الهيدر والبيانات الأساسية -->
      <div style="display: flex; align-items: center; gap: 20px; border-bottom: 3px solid ${color}; padding-bottom: 20px;">
        ${data.photo ? `<img src="${data.photo}" style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover;">` : ''}
        <div>
          <h1 style="color: ${color}; font-size: 28px; margin: 0;">${data.name || t.defaultName}</h1>
          <h3 style="color: #666; font-size: 18px; margin-top: 5px;">${data.title || t.defaultTitle}</h3>
        </div>
      </div>
      
      <!-- معلومات التواصل -->
      <div style="margin-top: 20px; display: flex; gap: 20px; color: #444; font-size: 14px;">
        ${data.email ? `<p><strong>${t.email}:</strong> ${data.email}</p>` : ''}
        ${data.phone ? `<p><strong>${t.phone}:</strong> ${data.phone}</p>` : ''}
      </div>

      <!-- نبذة عني (اختياري) -->
      ${data.about ? `
        <div style="margin-top: 25px;">
          <h2 style="color: ${color}; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${t.aboutTitle}</h2>
          <p style="margin-top: 10px; line-height: 1.6; color: #333;">${data.about}</p>
        </div>
      ` : ''}

      <!-- 1. التعليم والشهادات (الأول) -->
      ${(data.school || data.degree) ? `
        <div style="margin-top: 25px;">
          <h2 style="color: ${color}; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${t.educationTitle}</h2>
          <div style="margin-top: 10px;">
            <h3 style="font-size: 16px; color: #222;">${data.school || ''}</h3>
            ${data.degree ? `<p style="margin-top: 3px; color: #666; font-size: 14px;">${data.degree}</p>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- 2. الخبرة العملية (تحت الشهادات) -->
      ${(data.company || data.jobTitle) ? `
        <div style="margin-top: 25px;">
          <h2 style="color: ${color}; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${t.experienceTitle}</h2>
          <div style="margin-top: 10px;">
            <h3 style="font-size: 16px; color: #222;">${data.jobTitle || ''} ${data.company ? `— <span style="color: ${color};">${data.company}</span>` : ''}</h3>
            ${data.jobDesc ? `<p style="margin-top: 5px; color: #555; line-height: 1.5;">${data.jobDesc}</p>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- المهارات (اختياري) -->
      ${data.skills && data.skills.length > 0 ? `
        <div style="margin-top: 25px;">
          <h2 style="color: ${color}; font-size: 18px; border-bottom: 1px solid #ddd; padding-bottom: 5px;">${t.skillsTitle}</h2>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px;">
            ${data.skills.map(skill => `<span style="background: ${color}; color: white; padding: 4px 12px; border-radius: 4px; font-size: 13px;">${skill}</span>`).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}