// templates/template4.js
function renderTemplate4(data, t) {
  const dir = data.language === 'ar' ? 'rtl' : 'ltr';
  const color = data.themeColor;

  return `
    <div style="direction: ${dir}; font-family: 'Tajawal', sans-serif; color: #2d3748; background: #ffffff; min-height: 100%;">
      
      <div style="background-color: ${color}; color: white; padding: 40px; display: flex; justify-content: space-between; align-items: center;">
        <div>
          <h1 style="font-size: 30px; margin: 0; font-weight: 700;">${data.name || t.defaultName}</h1>
          <p style="font-size: 18px; margin-top: 5px; opacity: 0.9;">${data.title || t.defaultTitle}</p>
          <div style="margin-top: 15px; font-size: 14px; opacity: 0.85; display: flex; gap: 15px;">
            ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
            ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
          </div>
        </div>
        ${data.photo ? `<img src="${data.photo}" style="width: 110px; height: 110px; border-radius: 12px; border: 3px solid rgba(255,255,255,0.8); object-fit: cover;">` : ''}
      </div>

      <div style="padding: 40px;">
        
        ${data.about ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}22; padding-bottom: 8px;">${t.aboutTitle}</h3>
            <p style="margin-top: 10px; line-height: 1.7; color: #4a5568;">${data.about}</p>
          </div>
        ` : ''}

        <!-- 1. التعليم والشهادات (الأول) -->
        ${(data.school || data.degree) ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}22; padding-bottom: 8px;">${t.educationTitle}</h3>
            <div style="margin-top: 12px;">
              <h4 style="font-size: 16px; color: #1a202c;">${data.school || ''}</h4>
              ${data.degree ? `<p style="margin-top: 4px; color: #718096; font-size: 14px;">${data.degree}</p>` : ''}
            </div>
          </div>
        ` : ''}

        <!-- 2. الخبرة العملية (تحت الشهادات) -->
        ${(data.company || data.jobTitle) ? `
          <div style="margin-bottom: 30px;">
            <h3 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}22; padding-bottom: 8px;">${t.experienceTitle}</h3>
            <div style="margin-top: 12px;">
              <h4 style="font-size: 16px; color: #1a202c;">${data.jobTitle || ''} ${data.company ? `— <span style="color: ${color};">${data.company}</span>` : ''}</h4>
              ${data.jobDesc ? `<p style="margin-top: 6px; color: #4a5568; line-height: 1.6;">${data.jobDesc}</p>` : ''}
            </div>
          </div>
        ` : ''}

        ${data.skills && data.skills.length > 0 ? `
          <div>
            <h3 style="color: ${color}; font-size: 18px; border-bottom: 2px solid ${color}22; padding-bottom: 8px;">${t.skillsTitle}</h3>
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 12px;">
              ${data.skills.map(s => `<span style="background: ${color}15; color: ${color}; font-weight: bold; padding: 6px 14px; border-radius: 6px; font-size: 13px;">${s}</span>`).join('')}
            </div>
          </div>
        ` : ''}

      </div>
    </div>
  `;
}