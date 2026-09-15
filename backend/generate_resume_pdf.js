const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const targetDirs = [
  path.join(__dirname, '..', 'frontend', 'src', 'assets', 'resume'),
  path.join(__dirname, '..', 'frontend', 'public', 'resume'),
  path.join(__dirname, '..', 'frontend', 'public', 'assets', 'resume')
];

targetDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

const primaryFile = path.join(targetDirs[0], 'Shubham_Bhavar_Resume.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 36, bottom: 36, left: 40, right: 40 }
});

const stream = fs.createWriteStream(primaryFile);
doc.pipe(stream);

// Colors
const primaryColor = '#1a365d';
const secondaryColor = '#0f766e';
const textColor = '#1f2937';
const mutedColor = '#4b5563';
const dividerColor = '#cbd5e1';

// Header
doc.font('Helvetica-Bold').fontSize(22).fillColor(primaryColor).text('Shubham Bhavar', { align: 'center' });
doc.moveDown(0.3);

doc.font('Helvetica-Bold').fontSize(11).fillColor(secondaryColor).text('Full Stack Developer | Frontend Developer | Data Science Graduate', { align: 'center' });
doc.moveDown(0.4);

doc.font('Helvetica').fontSize(9).fillColor(mutedColor).text(
  'Email: shubhambhavar2821@gmail.com   |   Phone: +91 9890982446   |   Location: Pune, Maharashtra',
  { align: 'center' }
);
doc.font('Helvetica').fontSize(9).fillColor('#2563eb').text(
  'GitHub: https://github.com/shubhambhavar2821   |   LinkedIn: https://www.linkedin.com/in/shubham-bhavar-a3506025b/',
  { align: 'center' }
);
doc.moveDown(0.5);

// Helper function for sections
function addSectionHeader(title) {
  doc.font('Helvetica-Bold').fontSize(12).fillColor(primaryColor).text(title.toUpperCase());
  doc.moveTo(40, doc.y + 2).lineTo(555, doc.y + 2).lineWidth(1.2).strokeColor(dividerColor).stroke();
  doc.moveDown(0.5);
}

// SUMMARY
addSectionHeader('Summary');
doc.font('Helvetica').fontSize(9.5).fillColor(textColor).text(
  'Recent IT graduate with strong technical skills in full stack and frontend engineering, coupled with a proactive approach to problem-solving. Proficient in modern web technologies (Angular, TypeScript, Node.js, Express, MongoDB) and passionate about building scalable, responsive, and user-centric digital experiences.',
  { align: 'justify', lineGap: 2 }
);
doc.moveDown(0.6);

// EXPERIENCE
addSectionHeader('Experience');
doc.font('Helvetica-Bold').fontSize(10.5).fillColor(textColor).text('Frontend Developer');
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('Suguna Foods Pvt  |  Nashik, Maharashtra', { continued: true });
doc.font('Helvetica').fontSize(9).fillColor(mutedColor).text('                April 2022 – October 2023', { align: 'right' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(9).fillColor(textColor).list([
  'Developed and optimized responsive web interfaces using modern frontend architectures.',
  'Collaborated with cross-functional teams to translate business requirements into intuitive UI designs.',
  'Enhanced application load performance, cross-browser compatibility, and accessibility standards.'
], { bulletRadius: 2, textIndent: 12, lineGap: 2 });
doc.moveDown(0.6);

// EDUCATION BACKGROUND
addSectionHeader('Education Background');

doc.font('Helvetica-Bold').fontSize(10).fillColor(textColor).text('MCA – Data Science', { continued: true });
doc.font('Helvetica').fontSize(9).fillColor(mutedColor).text(' (2026)', { align: 'right' });
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('MIT ADT Pune University, Pune, Maharashtra');
doc.moveDown(0.4);

doc.font('Helvetica-Bold').fontSize(10).fillColor(textColor).text('Bachelor of Science (BSc) – Completed with 69.60%', { continued: true });
doc.font('Helvetica').fontSize(9).fillColor(mutedColor).text(' (2024)', { align: 'right' });
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('Dr. Babasaheb Ambedkar Marathwada University');
doc.moveDown(0.4);

doc.font('Helvetica-Bold').fontSize(10).fillColor(textColor).text('Higher Secondary (Science)', { continued: true });
doc.font('Helvetica').fontSize(9).fillColor(mutedColor).text(' (2019)', { align: 'right' });
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('K.T.H.M College, Nashik');
doc.moveDown(0.6);

// IT SKILLS
addSectionHeader('Technical Skills');
doc.font('Helvetica-Bold').fontSize(9.5).fillColor(textColor).text('• Programming Languages: ', { continued: true });
doc.font('Helvetica').fontSize(9.5).fillColor(mutedColor).text('Java, C++, C, TypeScript, JavaScript');

doc.font('Helvetica-Bold').fontSize(9.5).fillColor(textColor).text('• Frontend Technologies: ', { continued: true });
doc.font('Helvetica').fontSize(9.5).fillColor(mutedColor).text('Angular, HTML5, CSS3/SCSS, Bootstrap, jQuery, Responsive Design');

doc.font('Helvetica-Bold').fontSize(9.5).fillColor(textColor).text('• Backend & Database: ', { continued: true });
doc.font('Helvetica').fontSize(9.5).fillColor(mutedColor).text('Node.js, Express.js, MongoDB, RESTful APIs');

doc.font('Helvetica-Bold').fontSize(9.5).fillColor(textColor).text('• Tools & Platforms: ', { continued: true });
doc.font('Helvetica').fontSize(9.5).fillColor(mutedColor).text('Git, GitHub, VS Code, Postman, Linux');
doc.moveDown(0.6);

// PROJECTS
addSectionHeader('Key Projects');

doc.font('Helvetica-Bold').fontSize(10).fillColor(textColor).text('Online Food Store Platform');
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('Technologies: Angular, Node.js, Express.js, MongoDB');
doc.font('Helvetica').fontSize(9).fillColor(textColor).text(
  'A full-stack digital e-commerce web platform designed for browsing food catalogs, order management, and secure customer delivery tracking.',
  { lineGap: 1.5 }
);
doc.moveDown(0.4);

doc.font('Helvetica-Bold').fontSize(10).fillColor(textColor).text('Fitness Club Website');
doc.font('Helvetica-Oblique').fontSize(9).fillColor(secondaryColor).text('Technologies: HTML5, CSS3, JavaScript, Bootstrap');
doc.font('Helvetica').fontSize(9).fillColor(textColor).text(
  'A modern, high-conversion frontend web application built to promote fitness memberships, showcase training facilities, and provide schedule information.',
  { lineGap: 1.5 }
);
doc.moveDown(0.6);

// CERTIFICATIONS & COURSES
addSectionHeader('Certifications & Training');
doc.font('Helvetica').fontSize(9).fillColor(textColor).list([
  'Workshop on RDBMS Concepts – MIT ADT Pune University',
  'Full Stack Web Development Certification – Spark IT Institute (HTML, CSS, JavaScript, TypeScript, Angular, Node.js)',
  'Android Application Development Training – Spark Institute (Java, Android Studio, Firebase, SQLite, REST APIs)'
], { bulletRadius: 2, textIndent: 12, lineGap: 2 });

doc.end();

stream.on('finish', () => {
  console.log('✅ Generated resume at:', primaryFile);
  // Copy to backup paths
  targetDirs.slice(1).forEach(dir => {
    fs.copyFileSync(primaryFile, path.join(dir, 'Shubham_Bhavar_Resume.pdf'));
    console.log('✅ Copied resume to:', dir);
  });
});
