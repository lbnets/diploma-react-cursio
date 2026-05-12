// ============ MOCK DATA ============
window.MockData = (() => {
  const programs = [
    { id: 'mc-001', code: 'MC-2026-001', title: 'Аналітика даних для освітян', credits: 6, weeks: 8, language: 'Англійська', status: 'Active', enrolled: 48, completed: 41, completion: 85, satisfaction: 4.4, budget: 18000, spent: 12060, persona: 'Працюючі фахівці', startDate: '2026-01-15' },
    { id: 'mc-002', code: 'MC-2026-002', title: 'Основи цифрового маркетингу', credits: 5, weeks: 6, language: 'Англійська', status: 'Active', enrolled: 64, completed: 58, completion: 91, satisfaction: 4.6, budget: 12500, spent: 9800, persona: 'Випускники', startDate: '2026-02-01' },
    { id: 'mc-003', code: 'MC-2026-003', title: 'Основи управління проєктами', credits: 8, weeks: 10, language: 'Англійська', status: 'Active', enrolled: 32, completed: 24, completion: 75, satisfaction: 4.2, budget: 22000, spent: 14300, persona: 'Працюючі фахівці', startDate: '2026-01-10' },
    { id: 'mc-004', code: 'MC-2025-014', title: 'Облік і фінансовий аналіз', credits: 5, weeks: 8, language: 'Англійська', status: 'Active', enrolled: 28, completed: 13, completion: 47, satisfaction: 3.4, budget: 14000, spent: 11200, persona: 'Працюючі фахівці', startDate: '2025-11-20', flag: 'Нижче середнього ', recommendation: 'Переглянути структуру' },
    { id: 'mc-005', code: 'MC-2026-005', title: 'Штучний інтелект у вищій освіті', credits: 7, weeks: 9, language: 'Англійська', status: 'Active', enrolled: 75, completed: 70, completion: 93, satisfaction: 4.7, budget: 25000, spent: 17500, persona: 'Працюючі фахівці', startDate: '2026-01-08', flag: 'Вище середнього', recommendation: 'Розширити' },
    { id: 'mc-006', code: 'MC-2025-018', title: 'Основи кібербезпеки', credits: 4, weeks: 6, language: 'Англійська', status: 'Active', enrolled: 56, completed: 42, completion: 76, satisfaction: 4.1, budget: 9500, spent: 8400, persona: 'Працюючі фахівці', startDate: '2025-12-02' },
    { id: 'mc-007', code: 'MC-2026-007', title: 'Методологія наукових досліджень', credits: 6, weeks: 8, language: 'Англійська', status: 'Active', enrolled: 22, completed: 14, completion: 64, satisfaction: 3.8, budget: 11000, spent: 7700, persona: 'Випускники', startDate: '2026-02-12' },
    { id: 'mc-008', code: 'MC-2025-022', title: 'Міжкультурна комунікація', credits: 4, weeks: 6, language: 'Англійська', status: 'Active', enrolled: 38, completed: 17, completion: 45, satisfaction: 3.2, budget: 8000, spent: 6800, persona: 'Іноземні студенти', startDate: '2025-10-15', flag: 'Нижче середнього ', recommendation: 'Закрити' },
    { id: 'mc-009', code: 'MC-2025-009', title: 'Ощадливі операції', credits: 5, weeks: 8, language: 'Англійська', status: 'Completed', enrolled: 45, completed: 39, completion: 87, satisfaction: 4.3, budget: 13000, spent: 12800, persona: 'Працюючі фахівці', startDate: '2025-09-01' },
    { id: 'mc-010', code: 'MC-2026-010', title: 'Моделювання кліматичних ризиків', credits: 7, weeks: 10, language: 'Англійська', status: 'Planning', enrolled: 0, completed: 0, completion: 0, satisfaction: 0, budget: 20000, spent: 0, persona: 'Працюючі фахівці', startDate: '2026-04-01' },
    { id: 'mc-011', code: 'MC-2026-011', title: 'Аналітика громадського здоровʼя', credits: 6, weeks: 8, language: 'Англійська', status: 'Active', enrolled: 31, completed: 20, completion: 65, satisfaction: 3.9, budget: 13500, spent: 9000, persona: 'Випускники', startDate: '2026-02-20' },
    { id: 'mc-012', code: 'MC-2026-012', title: 'EdTech-педагогіка', credits: 5, weeks: 7, language: 'Англійська', status: 'Active', enrolled: 48, completed: 38, completion: 79, satisfaction: 4.5, budget: 11500, spent: 7600, persona: 'Працюючі фахівці', startDate: '2026-02-05' },
  ];

  const participants = [
    { id: 'P-2026-0142', name: 'Анна К.', fullName: 'Анна Коваленко', email: 'a.kovalenko@lpnu.ua', enrolled: '2026-01-15', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 87, lastActivity: '2026-04-02' },
    { id: 'P-2026-0143', name: 'Марʼян Г.', fullName: 'Марʼян Гриценко', email: 'm.hrytsenko@lpnu.ua', enrolled: '2026-01-15', modules: 4, modulesTotal: 5, status: 'Active', avgScore: 76, lastActivity: '2026-05-04' },
    { id: 'P-2026-0144', name: 'Олександр П.', fullName: 'Олександр Петренко', email: 'o.petrenko@lpnu.ua', enrolled: '2026-01-15', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 92, lastActivity: '2026-04-01' },
    { id: 'P-2026-0145', name: 'Софія М.', fullName: 'Софія Мельник', email: 's.melnyk@lpnu.ua', enrolled: '2026-01-16', modules: 2, modulesTotal: 5, status: 'At Risk', avgScore: 54, lastActivity: '2026-03-22' },
    { id: 'P-2026-0146', name: 'Лукас Д.', fullName: 'Lucas Dietrich', email: 'l.dietrich@lpnu.ua', enrolled: '2026-01-16', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 81, lastActivity: '2026-04-03' },
    { id: 'P-2026-0147', name: 'Юлія Ш.', fullName: 'Юлія Шевченко', email: 'y.shevchenko@lpnu.ua', enrolled: '2026-01-17', modules: 3, modulesTotal: 5, status: 'Active', avgScore: 68, lastActivity: '2026-05-06' },
    { id: 'P-2026-0148', name: 'Ахмед Р.', fullName: 'Ahmed Rahimi', email: 'a.rahimi@lpnu.ua', enrolled: '2026-01-17', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 79, lastActivity: '2026-04-05' },
    { id: 'P-2026-0149', name: 'Ірина Б.', fullName: 'Ірина Бондаренко', email: 'i.bondarenko@lpnu.ua', enrolled: '2026-01-18', modules: 1, modulesTotal: 5, status: 'Withdrawn', avgScore: 0, lastActivity: '2026-02-14' },
    { id: 'P-2026-0150', name: 'Марія Ф.', fullName: 'Maria Ferrer', email: 'm.ferrer@lpnu.ua', enrolled: '2026-01-19', modules: 4, modulesTotal: 5, status: 'Active', avgScore: 73, lastActivity: '2026-05-07' },
    { id: 'P-2026-0151', name: 'Володимир Т.', fullName: 'Володимир Ткаченко', email: 'v.tkachenko@lpnu.ua', enrolled: '2026-01-20', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 88, lastActivity: '2026-04-04' },
    { id: 'P-2026-0152', name: 'Ніна Л.', fullName: 'Ніна Лисенко', email: 'n.lysenko@lpnu.ua', enrolled: '2026-01-22', modules: 3, modulesTotal: 5, status: 'Active', avgScore: 71, lastActivity: '2026-05-05' },
    { id: 'P-2026-0153', name: 'Генрік Й.', fullName: 'Henrik Johansson', email: 'h.johansson@lpnu.ua', enrolled: '2026-01-23', modules: 5, modulesTotal: 5, status: 'Completed', avgScore: 84, lastActivity: '2026-04-06' },
  ];

  return { programs, participants };
})();
