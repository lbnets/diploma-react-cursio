// ============ LEARNER VIEW ============
const learnerCourses = () => ([
  {
    id: 'lc-1', code: 'MC-2026-001', title: 'Аналітика даних для освітян', credits: 6, weeks: 8,
    instructor: 'Олена Ковач', progress: 62, status: 'active',
    nextDeadline: 'Завтра, 23:59', nextTask: 'Розбір кейсу №2',
    cover: 'linear-gradient(135deg, #2563EB 0%, #4F46E5 100%)',
    modules: [
      { title: 'Вступ та адаптація', lessons: 3, done: 3 },
      { title: 'Базові концепції I',  lessons: 3, done: 2 },
      { title: 'Базові концепції II', lessons: 2, done: 0 },
      { title: 'Прикладний воркшоп',  lessons: 1, done: 0 },
      { title: 'Підсумковий проєкт',  lessons: 2, done: 0 },
    ],
  },
  {
    id: 'lc-2', code: 'MC-2026-005', title: 'Штучний інтелект у вищій освіті', credits: 7, weeks: 9,
    instructor: 'Андрій Левченко', progress: 89, status: 'active',
    nextDeadline: 'П\u02bcятниця, 18:00', nextTask: 'Підсумковий квіз',
    cover: 'linear-gradient(135deg, #0EA5E9 0%, #14B8A6 100%)',
    modules: [
      { title: 'AI та педагогіка', lessons: 4, done: 4 },
      { title: 'LLM у класі',       lessons: 3, done: 3 },
      { title: 'Етика та оцінювання',lessons: 3, done: 2 },
      { title: 'Підсумкова робота', lessons: 1, done: 0 },
    ],
  },
  {
    id: 'lc-3', code: 'MC-2025-009', title: 'Ощадливі операції', credits: 5, weeks: 8,
    instructor: 'Ірина Бондаренко', progress: 100, status: 'completed',
    nextDeadline: '', nextTask: '',
    cover: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
    modules: [
      { title: 'Lean-мислення', lessons: 3, done: 3 },
      { title: 'Картування потоку', lessons: 3, done: 3 },
      { title: 'Кайдзен на практиці', lessons: 2, done: 2 },
    ],
  },
]);

const upcoming = [
  { course: 'Аналітика даних для освітян', task: 'Розбір кейсу №2', type: 'Есе',     due: 'Завтра, 23:59', urgent: true,  points: 15 },
  { course: 'ШІ у вищій освіті',           task: 'Підсумковий квіз',  type: 'Квіз',    due: 'П\u02bcятниця, 18:00', urgent: false, points: 20 },
  { course: 'Аналітика даних для освітян', task: 'Воркшоп: групова робота', type: 'Воркшоп', due: 'Наступний тиждень', urgent: false, points: 10 },
];

const recentActivity = [
  { t: 'Оцінено: «Чек-лист середовища»', sub: 'Аналітика даних для освітян · 5/5 балів', icon: 'checkCircle', tone: 'success', when: '2 год тому' },
  { t: 'Завантажено новий матеріал', sub: 'ШІ у вищій освіті · Слайди заняття 7', icon: 'upload', tone: 'info', when: 'учора' },
  { t: 'Нагадування про дедлайн', sub: 'Розбір кейсу №2 — завтра 23:59', icon: 'clock', tone: 'warning', when: 'учора' },
  { t: 'Опубліковано урок', sub: 'ШІ у вищій освіті · Етика та оцінювання', icon: 'book', tone: 'info', when: '3 дні тому' },
];

const LearnerTopBar = ({ route, navigate, onLogout }) => {
  const NAV = [
    { key: 'home',   label: 'Мої курси'    },
    { key: 'tasks',  label: 'Завдання'     },
    { key: 'certs',  label: 'Сертифікати'  },
  ];
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">C</div>
        <span className="brand-name">Cursio</span>
        <span className="brand-sub">Учень</span>
      </div>
      <div className="nav">
        {NAV.map(n => (
          <button key={n.key} className={`nav-item ${route.lscreen === n.key ? 'active' : ''}`}
                  onClick={() => navigate({ lscreen: n.key })}>
            {n.label}
          </button>
        ))}
      </div>
      <DropdownMenu
        trigger={
          <button className="user-trigger">
            <div className="avatar" style={{ background: 'linear-gradient(135deg,#0EA5E9,#14B8A6)' }}>АК</div>
            <div className="col" style={{ alignItems: 'flex-start', gap: 0 }}>
              <span className="user-name">Анна Коваленко</span>
              <span className="user-role">Учасник · P-2026-0142</span>
            </div>
            <Icon name="chevDown" size={14}/>
          </button>
        }
        items={[
          { icon: 'eye', label: 'Профіль' },
          { icon: 'settings', label: 'Налаштування' },
          'divider',
          { icon: 'logout', label: 'Вийти', onClick: onLogout },
        ]}
      />
    </div>
  );
};

const LearnerHome = ({ navigate }) => {
  const courses = learnerCourses();
  const active = courses.filter(c => c.status === 'active');
  const done   = courses.filter(c => c.status === 'completed');
  return (
    <>
      <div className="page-header">
        <h1 className="t-display">Вітаємо, Анна 👋</h1>
        <div className="page-subtitle">У вас {active.length} активних курси та {upcoming.length} найближчих завдань.</div>
      </div>

      <div className="grid-4 mb-20">
        <div className="card kpi"><div className="kpi-label">Активні курси</div><div className="kpi-value">{active.length}</div><div className="t-caption">всього {courses.length}</div></div>
        <div className="card kpi"><div className="kpi-label">Завершених модулів</div><div className="kpi-value">{courses.reduce((s,c)=>s+c.modules.reduce((x,m)=>x+m.done,0),0)}</div><div className="t-caption">з {courses.reduce((s,c)=>s+c.modules.reduce((x,m)=>x+m.lessons,0),0)} запланованих</div></div>
        <div className="card kpi"><div className="kpi-label">Сертифікатів</div><div className="kpi-value">1</div><div className="t-caption">отримано цього року</div></div>
        <div className="card kpi"><div className="kpi-label">Серед. оцінка</div><div className="kpi-value">87<span style={{fontSize:18,color:'var(--text-secondary)'}}>/100</span></div><div className="t-caption">за останні 30 днів</div></div>
      </div>

      <div className="grid-2-uneven mb-20">
        <div>
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
            <h2 className="t-heading">Продовжити навчання</h2>
            <a className="link-muted" onClick={(e)=>{e.preventDefault(); navigate({lscreen:'home'});}} href="#">Усі курси →</a>
          </div>
          <div className="col gap-12">
            {active.map(c => (
              <div key={c.id} className="course-card" onClick={() => navigate({ lscreen: 'course', courseId: c.id })}>
                <div className="course-cover" style={{ background: c.cover }}>
                  <span className="mono">{c.code}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{c.title}</div>
                  <div className="t-caption">{c.instructor} · {c.credits} ECTS · {c.weeks} тижнів</div>
                  <div className="row gap-12" style={{ marginTop: 10 }}>
                    <Progress value={c.progress} width={180}/>
                    <span className="tabular" style={{ fontWeight: 600 }}>{c.progress}%</span>
                  </div>
                  {c.nextTask && (
                    <div className="course-next">
                      <Icon name="clock" size={12}/>
                      <span>Наступне: <strong>{c.nextTask}</strong> · {c.nextDeadline}</span>
                    </div>
                  )}
                </div>
                <Icon name="chevRight" size={16}/>
              </div>
            ))}
          </div>

          {done.length > 0 && (
            <>
              <h2 className="t-heading" style={{ marginTop: 28, marginBottom: 12 }}>Завершені курси</h2>
              <div className="col gap-12">
                {done.map(c => (
                  <div key={c.id} className="course-card" style={{ opacity: 0.92 }} onClick={() => navigate({ lscreen: 'course', courseId: c.id })}>
                    <div className="course-cover" style={{ background: c.cover }}>
                      <Icon name="checkCircle" size={20}/>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{c.title}</div>
                      <div className="t-caption">{c.instructor} · {c.credits} ECTS</div>
                    </div>
                    <Badge tone="success" dot>Завершено</Badge>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="col gap-16">
          <div className="card">
            <div className="card-header"><div className="card-title">Найближчі дедлайни</div></div>
            <div className="card-body col gap-10">
              {upcoming.map((u, i) => (
                <div key={i} className={`task-row ${u.urgent ? 'urgent' : ''}`}>
                  <div className="task-icon">
                    <Icon name={u.urgent ? 'alert' : 'clock'} size={14}/>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 500, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.task}</div>
                    <div className="t-caption">{u.course}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11.5, fontWeight: 600, color: u.urgent ? 'var(--danger)' : 'var(--text-secondary)' }}>{u.due}</div>
                    <div className="t-caption">{u.points} балів</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header"><div className="card-title">Стрічка активності</div></div>
            <div className="card-body col gap-12">
              {recentActivity.map((a, i) => (
                <div key={i} className="row gap-12" style={{ alignItems: 'flex-start' }}>
                  <div className={`activity-dot tone-${a.tone}`}><Icon name={a.icon} size={12}/></div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: 13 }}>{a.t}</div>
                    <div className="t-caption">{a.sub}</div>
                  </div>
                  <div className="t-caption" style={{ whiteSpace: 'nowrap' }}>{a.when}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const LearnerCourse = ({ courseId, navigate }) => {
  const courses = learnerCourses();
  const c = courses.find(x => x.id === courseId) || courses[0];
  const [tab, setTab] = React.useState('overview');
  const [openModule, setOpenModule] = React.useState(1);
  const totalLessons = c.modules.reduce((s,m)=>s+m.lessons,0);
  const doneLessons  = c.modules.reduce((s,m)=>s+m.done,0);

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Мої курси', to: { lscreen: 'home' } },
          { label: c.title },
        ]} onNavigate={(to) => navigate(to)}/>
        <div className="course-hero" style={{ background: c.cover }}>
          <div>
            <div className="course-hero-eyebrow">{c.code} · {c.credits} ECTS · {c.weeks} тижнів</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 6 }}>{c.title}</h1>
            <div style={{ opacity: 0.85, fontSize: 14 }}>Викладач: {c.instructor}</div>
          </div>
          <div className="course-hero-stats">
            <div><span className="hero-num">{c.progress}%</span><span className="hero-lbl">завершено</span></div>
            <div><span className="hero-num">{doneLessons}/{totalLessons}</span><span className="hero-lbl">уроків</span></div>
            <div><span className="hero-num">87</span><span className="hero-lbl">сер. бал</span></div>
          </div>
        </div>
      </div>

      <Tabs value={tab} onChange={setTab} tabs={[
        { value: 'overview', label: 'Огляд'    },
        { value: 'content',  label: 'Зміст'    },
        { value: 'tasks',    label: 'Завдання' },
        { value: 'grades',   label: 'Оцінки'   },
      ]}/>

      {tab === 'overview' && (
        <div className="grid-2-uneven">
          <div className="card">
            <div className="card-header"><div className="card-title">Про курс</div></div>
            <div className="card-body col gap-12">
              <p style={{ lineHeight: 1.55 }}>Курс «{c.title}» формує практичні навички, потрібні для роботи з даними у щоденних освітніх процесах. Поєднує теоретичні концепції з кейсами та воркшопами.</p>
              <div className="divider"/>
              <div style={{ fontWeight: 600 }}>Результати навчання</div>
              <ul style={{ paddingLeft: 18, lineHeight: 1.7, margin: 0 }}>
                <li>Розуміння ключових концепцій предметної галузі</li>
                <li>Здатність виконувати самостійний аналіз даних</li>
                <li>Командна робота над прикладними кейсами</li>
                <li>Підготовка та публічний захист підсумкового проєкту</li>
              </ul>
            </div>
          </div>
          <div className="col gap-16">
            <div className="card">
              <div className="card-header"><div className="card-title">Прогрес</div></div>
              <div className="card-body col gap-10">
                {c.modules.map((m,i)=>(
                  <div key={i} className="row gap-12">
                    <span className="text-muted mono" style={{ width: 28 }}>М{i+1}</span>
                    <span style={{ flex: 1, fontSize: 13 }}>{m.title}</span>
                    <Progress value={Math.round(m.done/m.lessons*100)} width={80}/>
                    <span className="tabular t-caption">{m.done}/{m.lessons}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header"><div className="card-title">Графік</div></div>
              <div className="card-body col gap-8">
                <div className="row gap-8"><Icon name="calendar" size={14}/><span className="t-caption">Старт: 15.01.2026</span></div>
                <div className="row gap-8"><Icon name="calendar" size={14}/><span className="t-caption">Кінець: 12.03.2026</span></div>
                <div className="row gap-8"><Icon name="users" size={14}/><span className="t-caption">У групі: 48 учасників</span></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'content' && (
        <div className="col gap-12">
          {c.modules.map((m, mi) => {
            const open = openModule === mi;
            const lessonsDemo = Array.from({ length: m.lessons }, (_, j) => ({
              title: ['Огляд', 'Теорія', 'Практика', 'Кейс', 'Самостійна'][j % 5] + ` ${j+1}`,
              type: ['lecture','video','reading','task','quiz'][j % 5],
              dur: [45, 25, 30, 60, 20][j % 5],
              done: j < m.done,
            }));
            return (
              <div key={mi} className="card">
                <div className="card-header" style={{ cursor: 'pointer' }} onClick={() => setOpenModule(open ? -1 : mi)}>
                  <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
                    <div className="row gap-12">
                      <span className="text-muted mono">М{mi+1}</span>
                      <div>
                        <div className="card-title">{m.title}</div>
                        <div className="card-sub">{m.lessons} уроків · {m.done}/{m.lessons} завершено</div>
                      </div>
                    </div>
                    <div className="row gap-12">
                      <Progress value={Math.round(m.done/m.lessons*100)} width={120}/>
                      <Icon name={open ? 'chevDown' : 'chevRight'} size={16}/>
                    </div>
                  </div>
                </div>
                {open && (
                  <div className="card-body col gap-6" style={{ paddingTop: 0 }}>
                    {lessonsDemo.map((l, li) => (
                      <div key={li} className={`learner-lesson ${l.done ? 'done' : ''}`}>
                        <span className={`circle-check ${l.done ? 'on' : ''}`}>
                          {l.done ? <Icon name="check" size={11}/> : <span>{li+1}</span>}
                        </span>
                        <LessonTypeIcon type={l.type}/>
                        <span style={{ flex: 1, fontWeight: l.done ? 400 : 500 }}>{l.title}</span>
                        <span className="t-caption">{LessonTypeLabel(l.type)} · {l.dur} хв</span>
                        <Button variant={l.done ? 'ghost' : 'primary'} size="sm">
                          {l.done ? 'Переглянути' : 'Почати'}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {tab === 'tasks' && (
        <div className="card">
          <table className="tbl">
            <thead><tr><th>Завдання</th><th>Тип</th><th>Дедлайн</th><th>Статус</th><th>Бал</th></tr></thead>
            <tbody>
              <tr><td><div style={{fontWeight:500}}>Чек-лист середовища</div><div className="t-caption">Модуль 1 · Урок 2</div></td><td>Здача файлу</td><td>22.01.2026</td><td><Badge tone="success" dot>Зараховано</Badge></td><td className="tabular" style={{fontWeight:600}}>5/5</td></tr>
              <tr><td><div style={{fontWeight:500}}>Розбір кейсу №2</div><div className="t-caption">Модуль 2 · Урок 2</div></td><td>Есе</td><td><span style={{color:'var(--danger)',fontWeight:600}}>Завтра, 23:59</span></td><td><Badge tone="warning" dot>Очікує здачі</Badge></td><td className="tabular text-muted">—/15</td></tr>
              <tr><td><div style={{fontWeight:500}}>Воркшоп: групова робота</div><div className="t-caption">Модуль 2 · Урок 3</div></td><td>Воркшоп</td><td>Наступний тиждень</td><td><Badge tone="neutral">Заплановано</Badge></td><td className="tabular text-muted">—/10</td></tr>
              <tr><td><div style={{fontWeight:500}}>Індивідуальне завдання</div><div className="t-caption">Модуль 3 · Урок 2</div></td><td>Здача файлу</td><td>19.02.2026</td><td><Badge tone="neutral">Заплановано</Badge></td><td className="tabular text-muted">—/20</td></tr>
              <tr><td><div style={{fontWeight:500}}>Підсумковий проєкт</div><div className="t-caption">Модуль 5 · Урок 2</div></td><td>Проєкт</td><td>12.03.2026</td><td><Badge tone="neutral">Заплановано</Badge></td><td className="tabular text-muted">—/40</td></tr>
            </tbody>
          </table>
        </div>
      )}

      {tab === 'grades' && (
        <div className="card">
          <div className="card-body col gap-16">
            <div className="row" style={{ justifyContent: 'space-between' }}>
              <div>
                <div className="t-caption">Поточна середня оцінка</div>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--primary)' }}>87 / 100</div>
              </div>
              <Badge tone="success" dot>Над цільовим рівнем (60)</Badge>
            </div>
            <div className="divider"/>
            <table className="tbl" style={{ marginTop: 0 }}>
              <thead><tr><th>Завдання</th><th>Бал</th><th>Зворотний зв'язок</th></tr></thead>
              <tbody>
                <tr><td>Чек-лист середовища</td><td className="tabular">5/5 · 100%</td><td className="text-secondary">«Усе виконано чітко, дотримано чек-листа.»</td></tr>
                <tr><td>Вступний квіз</td><td className="tabular">9/10 · 90%</td><td className="text-secondary">—</td></tr>
                <tr><td>Розбір кейсу №1</td><td className="tabular">13/15 · 87%</td><td className="text-secondary">«Аргументація сильна, бракує економічної інтерпретації.»</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

const LearnerTasks = () => (
  <>
    <div className="page-header">
      <h1 className="t-display">Усі завдання</h1>
      <div className="page-subtitle">Завдання з усіх ваших курсів за дедлайном.</div>
    </div>
    <div className="card">
      <table className="tbl">
        <thead><tr><th>Завдання</th><th>Курс</th><th>Тип</th><th>Дедлайн</th><th>Статус</th><th>Бал</th></tr></thead>
        <tbody>
          {[
            { t: 'Розбір кейсу №2', c: 'Аналітика даних', tp: 'Есе', d: 'Завтра, 23:59', urg: true, st: 'warning', stl: 'Очікує здачі', s: '—/15' },
            { t: 'Підсумковий квіз', c: 'ШІ у вищій освіті', tp: 'Квіз', d: 'П\u02bcятниця, 18:00', urg: false, st: 'warning', stl: 'Очікує здачі', s: '—/20' },
            { t: 'Воркшоп: групова робота', c: 'Аналітика даних', tp: 'Воркшоп', d: 'Наст. тиждень', urg: false, st: 'neutral', stl: 'Заплановано', s: '—/10' },
            { t: 'Чек-лист середовища', c: 'Аналітика даних', tp: 'Здача', d: '22.01.2026', urg: false, st: 'success', stl: 'Зараховано', s: '5/5' },
            { t: 'Вступний квіз', c: 'Аналітика даних', tp: 'Квіз', d: '17.01.2026', urg: false, st: 'success', stl: 'Зараховано', s: '9/10' },
            { t: 'Розбір кейсу №1', c: 'Аналітика даних', tp: 'Есе', d: '01.02.2026', urg: false, st: 'success', stl: 'Зараховано', s: '13/15' },
          ].map((r,i)=>(
            <tr key={i}>
              <td style={{fontWeight:500}}>{r.t}</td>
              <td className="text-secondary">{r.c}</td>
              <td>{r.tp}</td>
              <td style={{color: r.urg ? 'var(--danger)' : '', fontWeight: r.urg ? 600 : 400}}>{r.d}</td>
              <td><Badge tone={r.st} dot={r.st!=='neutral'}>{r.stl}</Badge></td>
              <td className="tabular">{r.s}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </>
);

const LearnerCerts = () => (
  <>
    <div className="page-header">
      <h1 className="t-display">Мої сертифікати</h1>
      <div className="page-subtitle">Сертифікати, отримані за завершення мікрокредитних програм.</div>
    </div>
    <div className="grid-3" style={{ gap: 16 }}>
      {[
        { code: 'MC-2025-009', title: 'Ощадливі операції', date: '15.12.2025', credits: 5, id: 'MC-2025-009-P0142' },
      ].map((c,i)=>(
        <div key={i} className="card">
          <div className="card-body" style={{ padding: 0 }}>
            <div className="cert-mini">
              <div className="cert-mini-eyebrow">Сертифікат</div>
              <div className="cert-mini-title">{c.title}</div>
              <div className="t-caption" style={{ marginTop: 8 }}>{c.credits} ECTS · {c.date}</div>
              <div className="t-caption mono" style={{ marginTop: 4 }}>{c.id}</div>
            </div>
            <div style={{ padding: 14, display: 'flex', gap: 8, justifyContent: 'space-between', borderTop: '1px solid var(--border)' }}>
              <Button variant="ghost" size="sm" icon="eye">Перегляд</Button>
              <Button variant="primary" size="sm" icon="download">PDF</Button>
            </div>
          </div>
        </div>
      ))}
      <div className="card" style={{ borderStyle: 'dashed', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
        <div className="empty-state" style={{ padding: 20 }}>
          <div className="empty-icon"><Icon name="cert" size={20}/></div>
          <div style={{ fontWeight: 500 }}>Завершіть курс, щоб отримати наступний</div>
          <div className="t-caption">Активних курсів: 2</div>
        </div>
      </div>
    </div>
  </>
);

const LearnerApp = ({ onLogout }) => {
  const [route, setRoute] = React.useState({ lscreen: 'home' });
  const navigate = (r) => { setRoute(r); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return (
    <div className="app">
      <LearnerTopBar route={route} navigate={navigate} onLogout={onLogout}/>
      <div className="main">
        {route.lscreen === 'home'   && <LearnerHome navigate={navigate}/>}
        {route.lscreen === 'course' && <LearnerCourse courseId={route.courseId} navigate={navigate}/>}
        {route.lscreen === 'tasks'  && <LearnerTasks/>}
        {route.lscreen === 'certs'  && <LearnerCerts/>}
      </div>
    </div>
  );
};

Object.assign(window, { LearnerApp });
