// templates/template3.js
function renderTemplate3(data, t) {
  const dir = data.language === 'ar' ? 'rtl' : 'ltr';
  const color = data.themeColor;

  return `
    <div style="padding: 30px; direction: ${dir}; font-family: 'Tajawal', sans-serif; background: #f8fafc; min-height: 100%;">
      
      <div style="background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); text-align: center; border-top: 4px solid ${color};">
        ${data.photo ? `<img src="${data.photo}" style="width: 90px; height: 90px; border-radius: 50%; object-fit: cover; margin-bottom: 10px;">` : ''}
        <h1 style="color: ${color}; font-size: 24px; margin: 0;">${data.name || t.defaultName}</h1>
        <p style="color: #64748b; margin-top: 4px; font-weight: 500;">${data.title || t.defaultTitle}</p>
        
        <div style="margin-top: 12px; font-size: 13px; color: #475569; display: flex; justify-content: center; gap: 15px;">
          ${data.email ? `<span>✉️ ${data.email}</span>` : ''}
          ${data.phone ? `<span>📞 ${data.phone}</span>` : ''}
        </div>
      </div>

      ${data.about ? `
        <div style="margin-top: 15px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="color: ${color}; font-size: 16px; margin-bottom: 8px;">${t.aboutTitle}</h3>
          <p style="color: #334155; line-height: 1.6; font-size: 14px;">${data.about}</p>
        </div>
      ` : ''}

      <!-- 1. التعليم والشهادات (الأول) -->
      ${(data.school || data.degree) ? `
        <div style="margin-top: 15px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="color: ${color}; font-size: 16px; margin-bottom: 8px;">${t.educationTitle}</h3>
          <div>
            <h4 style="font-size: 15px; color: #1e293b;">${data.school || ''}</h4>
            ${data.degree ? `<p style="margin-top: 3px; color: #64748b; font-size: 13px;">${data.degree}</p>` : ''}
          </div>
        </div>
      ` : ''}

      <!-- 2. الخبرة العملية (تحت الشهادات) -->
      ${(data.company || data.jobTitle) ? `
        <div style="margin-top: 15px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="color: ${color}; font-size: 16px; margin-bottom: 10px;">${t.experienceTitle}</h3>
          <div>
            <h4 style="font-size: 15px; color: #1e293b;">${data.jobTitle || ''} ${data.company ? `— <span style="color: ${color};">${data.company}</span>` : ''}</h4>
            ${data.jobDesc ? `<p style="margin-top: 5px; color: #475569; font-size: 13px; line-height: 1.5;">${data.jobDesc}</p>` : ''}
          </div>
        </div>
      ` : ''}

      ${data.skills && data.skills.length > 0 ? `
        <div style="margin-top: 15px; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
          <h3 style="color: ${color}; font-size: 16px; margin-bottom: 10px;">${t.skillsTitle}</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            ${data.skills.map(s => `<span style="border: 1px solid ${color}; color: ${color}; padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 500;">${s}</span>`).join('')}
          </div>
        </div>
      ` : ''}

    </div>
  `;
}