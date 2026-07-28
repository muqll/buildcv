// templates/template2.js
function renderTemplate2(data, t) {
  const isRtl = data.language === 'ar';
  const color = data.themeColor;

  return `
    <div style="display: flex; min-height: 100%; direction: ${isRtl ? 'rtl' : 'ltr'}; font-family: 'Tajawal', sans-serif;">
      
      <!-- الشريط الجانبي الملون -->
      <div style="width: 35%; background-color: ${color}; color: white; padding: 30px; box-sizing: border-box;">
        ${data.photo ? `<img src="${data.photo}" style="width: 120px; height: 120px; border-radius: 50%; border: 3px solid white; display: block; margin: 0 auto 20px auto; object-fit: cover;">` : ''}
        
        <h2 style="text-align: center; font-size: 22px; margin: 0; font-weight: 700;">${data.name || t.defaultName}</h2>
        <p style="text-align: center; opacity: 0.9; margin-top: 5px; margin-bottom: 30px; font-size: 14px;">${data.title || t.defaultTitle}</p>
        
        ${(data.email || data.phone) ? `
          <div style="margin-bottom: 30px;">
            <h3 style="border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 5px; margin-bottom: 12px; font-size: 16px;">${t.contactTitle}</h3>
            ${data.email ? `<p style="font-size: 13px; margin-bottom: 8px; word-break: break-word;"><strong>${t.email}:</strong><br>${data.email}</p>` : ''}
            ${data.phone ? `<p style="font-size: 13px;"><strong>${t.phone}:</strong><br>${data.phone}</p>` : ''}
          </div>
        ` : ''}

        ${data.skills && data.skills.length > 0 ? `
          <div>
            <h3 style="border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 5px; margin-bottom: 12px; font-size: 16px;">${t.skillsTitle}</h3>
            <ul style="padding-right: 18px; padding-left: 18px; font-size: 13px; line-height: 1.8;">
              ${data.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>

      <!-- الجزء الرئيسي الأبيض -->
      <div style="width: 65%; padding: 35px; background: white; box-sizing: border-box;">
        
        ${data.about ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}; padding-bottom: 5px; margin-top: 0;">${t.aboutTitle}</h2>
            <p style="margin-top: 10px; line-height: 1.6; color: #444; font-size: 14px;">${data.about}</p>
          </div>
        ` : ''}

        <!-- 1. التعليم والشهادات (الأول) -->
        ${(data.school || data.degree) ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}; padding-bottom: 5px;">${t.educationTitle}</h2>
            <div style="margin-top: 10px;">
              <h3 style="font-size: 15px; color: #111; margin: 0;">${data.school || ''}</h3>
              ${data.degree ? `<p style="margin-top: 4px; color: #666; font-size: 13px;">${data.degree}</p>` : ''}
            </div>
          </div>
        ` : ''}

        <!-- 2. الخبرة العملية (تحت الشهادات) -->
        ${(data.company || data.jobTitle) ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}; padding-bottom: 5px;">${t.experienceTitle}</h2>
            <div style="margin-top: 10px;">
              <h3 style="font-size: 15px; color: #111; margin: 0;">${data.jobTitle || ''} ${data.company ? `— <span style="color: ${color};">${data.company}</span>` : ''}</h3>
              ${data.jobDesc ? `<p style="margin-top: 6px; color: #555; font-size: 13px; line-height: 1.5;">${data.jobDesc}</p>` : ''}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}