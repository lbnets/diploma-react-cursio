// ============ PROGRAM BUILDER (Modules / Lessons / Assignments) ============
const LESSON_TYPES = [
  { value: 'lecture',  label: 'Лекція',     icon: 'book'    },
  { value: 'video',    label: 'Відео',      icon: 'eye'     },
  { value: 'reading',  label: 'Читання',    icon: 'file'    },
  { value: 'workshop', label: 'Воркшоп',    icon: 'users'   },
  { value: 'quiz',     label: 'Квіз',       icon: 'check'   },
  { value: 'task',     label: 'Завдання',   icon: 'edit'    },
];

const seedModules = (programTitle) => ([
  {
    id: 'm1', title: 'Вступ та адаптація', desc: 'Знайомство з програмою, налаштування середовища, очікувані результати навчання.', weeks: 1, expanded: true,
    lessons: [
      { id: 'l1-1', title: 'Огляд програми та результати навчання', type: 'lecture', duration: 45, status: 'published', desc: 'Структура курсу, оцінювання, вимоги до завершення.', materials: 2, assignments: [] },
      { id: 'l1-2', title: 'Налаштування робочого середовища', type: 'workshop', duration: 60, status: 'published', desc: 'Покрокова інструкція, чек-лист готовності.', materials: 3, assignments: [
        { id: 'h1-2-1', title: 'Чек-лист середовища', desc: 'Завантажте скрін підготовленого середовища.', deadline: '2026-01-22', points: 5, type: 'submission' },
      ] },
      { id: 'l1-3', title: 'Вступний квіз', type: 'quiz', duration: 20, status: 'draft', desc: '10 запитань на базові поняття.', materials: 0, assignments: [] },
    ],
  },
  {
    id: 'm2', title: 'Базові концепції I', desc: 'Ключові поняття та фреймворки, які закладають фундамент програми.', weeks: 2, expanded: true,
    lessons: [
      { id: 'l2-1', title: 'Теоретичні засади', type: 'lecture', duration: 60, status: 'published', desc: 'Концепції, термінологія, історичний контекст.', materials: 4, assignments: [] },
      { id: 'l2-2', title: 'Кейс-стаді', type: 'reading', duration: 45, status: 'published', desc: '3 кейси з реальної практики для аналізу.', materials: 3, assignments: [
        { id: 'h2-2-1', title: 'Розбір кейсу №2', desc: 'Письмовий аналіз 600–800 слів.', deadline: '2026-02-05', points: 15, type: 'essay' },
      ] },
      { id: 'l2-3', title: 'Практика в групах', type: 'workshop', duration: 90, status: 'draft', desc: 'Командна робота над невеликою задачею.', materials: 2, assignments: [] },
    ],
  },
  {
    id: 'm3', title: 'Базові концепції II', desc: 'Поглиблення матеріалу, методи розв\u02bcязання типових задач.', weeks: 2, expanded: false,
    lessons: [
      { id: 'l3-1', title: 'Розширені методи', type: 'lecture', duration: 60, status: 'draft', desc: '', materials: 2, assignments: [] },
      { id: 'l3-2', title: 'Самостійна робота', type: 'task', duration: 120, status: 'draft', desc: '', materials: 0, assignments: [
        { id: 'h3-2-1', title: 'Індивідуальне завдання', desc: 'Виконати 5 задач за наданим шаблоном.', deadline: '2026-02-19', points: 20, type: 'submission' },
      ] },
    ],
  },
  {
    id: 'm4', title: 'Прикладний воркшоп', desc: 'Інтеграція матеріалу через практичну роботу з ментором.', weeks: 2, expanded: false,
    lessons: [
      { id: 'l4-1', title: 'Кейс-сесія з ментором', type: 'workshop', duration: 120, status: 'draft', desc: '', materials: 1, assignments: [] },
    ],
  },
  {
    id: 'm5', title: 'Підсумковий проєкт', desc: 'Захист підсумкового проєкту перед комісією.', weeks: 1, expanded: false,
    lessons: [
      { id: 'l5-1', title: 'Брифінг до підсумкового проєкту', type: 'lecture', duration: 45, status: 'draft', desc: '', materials: 1, assignments: [] },
      { id: 'l5-2', title: 'Підсумковий проєкт', type: 'task', duration: 0, status: 'draft', desc: 'Фінальна здача та публічний захист.', materials: 0, assignments: [
        { id: 'h5-2-1', title: 'Підсумковий проєкт', desc: 'Презентація + опис рішення (10 хв захист).', deadline: '2026-03-12', points: 40, type: 'project' },
      ] },
    ],
  },
]);

const LessonTypeIcon = ({ type }) => {
  const t = LESSON_TYPES.find(x => x.value === type) || LESSON_TYPES[0];
  return <Icon name={t.icon} size={14}/>;
};
const LessonTypeLabel = (type) => (LESSON_TYPES.find(x => x.value === type) || LESSON_TYPES[0]).label;

const StatusPill = ({ status }) => (
  <span className={`badge ${status === 'published' ? 'badge-success' : 'badge-neutral'}`}
        style={{ fontSize: 10.5, padding: '2px 8px' }}>
    {status === 'published' ? 'Опубліковано' : 'Чернетка'}
  </span>
);

const BuilderScreen = ({ programId, navigate }) => {
  const program = window.MockData.programs.find(x => x.id === programId) || window.MockData.programs[0];
  const [modules, setModules] = React.useState(() => seedModules(program.title));
  const [selected, setSelected] = React.useState({ moduleId: 'm1', lessonId: 'l1-2' });
  const showToast = React.useContext(ToastContext);

  const totals = React.useMemo(() => {
    let lessons = 0, mins = 0, assignments = 0, published = 0;
    modules.forEach(m => m.lessons.forEach(l => {
      lessons++; mins += l.duration || 0; assignments += l.assignments.length;
      if (l.status === 'published') published++;
    }));
    return { lessons, hours: Math.round(mins / 60 * 10) / 10, assignments, published };
  }, [modules]);

  const setModule = (id, fn) => setModules(ms => ms.map(m => m.id === id ? fn(m) : m));
  const setLesson = (mid, lid, fn) => setModule(mid, m => ({ ...m, lessons: m.lessons.map(l => l.id === lid ? fn(l) : l) }));
  const toggleExpand = (id) => setModule(id, m => ({ ...m, expanded: !m.expanded }));

  const addModule = () => {
    const id = 'm' + (modules.length + 1) + '-' + Date.now().toString(36);
    setModules([...modules, { id, title: 'Новий модуль', desc: '', weeks: 1, expanded: true, lessons: [] }]);
    setSelected({ moduleId: id, lessonId: null });
    showToast('Додано новий модуль', 'success');
  };
  const addLesson = (mid) => {
    const id = 'l-' + Date.now().toString(36);
    setModule(mid, m => ({ ...m, expanded: true, lessons: [...m.lessons, {
      id, title: 'Новий урок', type: 'lecture', duration: 45, status: 'draft', desc: '', materials: 0, assignments: [],
    }] }));
    setSelected({ moduleId: mid, lessonId: id });
    showToast('Додано новий урок', 'success');
  };
  const removeLesson = (mid, lid) => {
    setModule(mid, m => ({ ...m, lessons: m.lessons.filter(l => l.id !== lid) }));
    if (selected.lessonId === lid) setSelected({ moduleId: mid, lessonId: null });
  };
  const removeModule = (mid) => {
    setModules(ms => ms.filter(m => m.id !== mid));
    if (selected.moduleId === mid) setSelected({ moduleId: modules[0]?.id, lessonId: null });
  };

  const currentModule = modules.find(m => m.id === selected.moduleId);
  const currentLesson = currentModule && currentModule.lessons.find(l => l.id === selected.lessonId);

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Панель', to: { screen: 'dashboard' } },
          { label: 'Програми', to: { screen: 'programs' } },
          { label: program.title, to: { screen: 'programs', programId: program.id } },
          { label: 'Конструктор' },
        ]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Конструктор програми</h1>
            <div className="page-subtitle">{program.title} · {program.credits} ECTS · {program.weeks} тижнів</div>
          </div>
          <div className="row gap-8">
            <Button icon="eye" onClick={() => showToast('Відкрито попередній перегляд (демо)')}>Попередній перегляд</Button>
            <Button variant="primary" icon="check" onClick={() => showToast('Зміни збережено', 'success')}>Зберегти</Button>
          </div>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <div className="card kpi"><div className="kpi-label">Модулі</div><div className="kpi-value">{modules.length}</div><div className="t-caption">{modules.reduce((s,m)=>s+m.weeks,0)} тижнів запланованo</div></div>
        <div className="card kpi"><div className="kpi-label">Уроки</div><div className="kpi-value">{totals.lessons}</div><div className="t-caption">{totals.published} опубліковано</div></div>
        <div className="card kpi"><div className="kpi-label">Тривалість</div><div className="kpi-value">{totals.hours} <span style={{fontSize:18,color:'var(--text-secondary)'}}>год</span></div><div className="t-caption">сумарно по уроках</div></div>
        <div className="card kpi"><div className="kpi-label">Завдання</div><div className="kpi-value">{totals.assignments}</div><div className="t-caption">для оцінювання</div></div>
      </div>

      <div className="builder">
        {/* SIDEBAR */}
        <div className="builder-aside">
          <div className="builder-aside-head">
            <div style={{ fontWeight: 600 }}>Структура курсу</div>
            <Button variant="ghost" size="sm" icon="plus" onClick={addModule}>Модуль</Button>
          </div>
          <div className="builder-tree">
            {modules.map((m, mi) => (
              <div key={m.id} className={`mod ${selected.moduleId === m.id && !selected.lessonId ? 'active' : ''}`}>
                <div className="mod-row" onClick={() => setSelected({ moduleId: m.id, lessonId: null })}>
                  <button className="mod-toggle" onClick={(e) => { e.stopPropagation(); toggleExpand(m.id); }}>
                    <Icon name={m.expanded ? 'chevDown' : 'chevRight'} size={12}/>
                  </button>
                  <span className="mod-num">M{mi + 1}</span>
                  <span className="mod-title">{m.title}</span>
                  <span className="mod-count">{m.lessons.length}</span>
                </div>
                {m.expanded && (
                  <div className="lessons">
                    {m.lessons.map((l) => (
                      <div key={l.id}
                           className={`lesson ${selected.lessonId === l.id ? 'active' : ''}`}
                           onClick={() => setSelected({ moduleId: m.id, lessonId: l.id })}>
                        <LessonTypeIcon type={l.type}/>
                        <span className="lesson-title">{l.title}</span>
                        {l.assignments.length > 0 && <span className="dot-badge" title="Має завдання"></span>}
                        <span className="lesson-dur">{l.duration} хв</span>
                      </div>
                    ))}
                    <button className="add-lesson" onClick={() => addLesson(m.id)}>
                      <Icon name="plus" size={12}/> Додати урок
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DETAIL */}
        <div className="builder-main">
          {currentLesson
            ? <LessonEditor key={currentLesson.id} module={currentModule} lesson={currentLesson}
                            onChange={(fn) => setLesson(currentModule.id, currentLesson.id, fn)}
                            onRemove={() => removeLesson(currentModule.id, currentLesson.id)}/>
            : currentModule
              ? <ModuleEditor key={currentModule.id} module={currentModule}
                              onChange={(fn) => setModule(currentModule.id, fn)}
                              onAddLesson={() => addLesson(currentModule.id)}
                              onSelectLesson={(lid) => setSelected({ moduleId: currentModule.id, lessonId: lid })}
                              onRemove={() => removeModule(currentModule.id)}/>
              : <div className="card"><div className="card-body" style={{ textAlign: 'center', padding: 40 }}>Виберіть модуль або урок ліворуч.</div></div>}
        </div>
      </div>
    </>
  );
};

const ModuleEditor = ({ module, onChange, onAddLesson, onSelectLesson, onRemove }) => (
  <div className="card">
    <div className="card-header">
      <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
        <div><div className="card-title">Модуль</div><div className="card-sub">Опис, навантаження та склад уроків</div></div>
        <Button variant="ghost" size="sm" icon="trash" onClick={onRemove}>Видалити</Button>
      </div>
    </div>
    <div className="card-body col gap-16">
      <Field label="Назва модуля">
        <input className="input" value={module.title} onChange={e => onChange(m => ({ ...m, title: e.target.value }))}/>
      </Field>
      <Field label="Опис">
        <textarea className="textarea" rows={3} value={module.desc}
                  onChange={e => onChange(m => ({ ...m, desc: e.target.value }))}/>
      </Field>
      <div className="grid-2">
        <Field label="Тривалість, тижнів">
          <input className="input" type="number" value={module.weeks}
                 onChange={e => onChange(m => ({ ...m, weeks: Number(e.target.value) || 0 }))}/>
        </Field>
        <Field label="Кількість уроків">
          <input className="input" disabled value={module.lessons.length}/>
        </Field>
      </div>

      <div className="divider"/>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div style={{ fontWeight: 600 }}>Уроки модуля</div>
        <Button variant="ghost" size="sm" icon="plus" onClick={onAddLesson}>Додати урок</Button>
      </div>
      <div className="col gap-8">
        {module.lessons.length === 0
          ? <div className="empty-state" style={{ padding: 24 }}>
              <div className="empty-icon"><Icon name="book" size={20}/></div>
              <div style={{ fontWeight: 500 }}>У модулі ще немає уроків</div>
              <div className="t-caption">Натисніть «Додати урок», щоб почати наповнення.</div>
            </div>
          : module.lessons.map((l, i) => (
            <div key={l.id} className="lesson-summary" onClick={() => onSelectLesson(l.id)}>
              <span className="lesson-num">{i + 1}</span>
              <LessonTypeIcon type={l.type}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 500 }}>{l.title}</div>
                <div className="t-caption">{LessonTypeLabel(l.type)} · {l.duration} хв · {l.assignments.length} завдань</div>
              </div>
              <StatusPill status={l.status}/>
              <Icon name="chevRight" size={14}/>
            </div>
          ))
        }
      </div>
    </div>
  </div>
);

const LessonEditor = ({ module, lesson, onChange, onRemove }) => {
  const addAssignment = () => onChange(l => ({
    ...l,
    assignments: [...l.assignments, {
      id: 'h-' + Date.now().toString(36),
      title: 'Нове завдання', desc: '', deadline: '', points: 10, type: 'submission',
    }],
  }));
  const setAssignment = (aid, fn) => onChange(l => ({
    ...l, assignments: l.assignments.map(a => a.id === aid ? fn(a) : a),
  }));
  const removeAssignment = (aid) => onChange(l => ({
    ...l, assignments: l.assignments.filter(a => a.id !== aid),
  }));

  return (
    <div className="col gap-20">
      <div className="card">
        <div className="card-header">
          <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div>
              <div className="card-title">Урок</div>
              <div className="card-sub">{module.title} · {LessonTypeLabel(lesson.type)}</div>
            </div>
            <div className="row gap-8">
              <StatusPill status={lesson.status}/>
              <Button variant="ghost" size="sm" icon="trash" onClick={onRemove}>Видалити</Button>
            </div>
          </div>
        </div>
        <div className="card-body col gap-16">
          <Field label="Назва уроку">
            <input className="input" value={lesson.title}
                   onChange={e => onChange(l => ({ ...l, title: e.target.value }))}/>
          </Field>

          <div className="grid-2">
            <Field label="Тип уроку">
              <select className="select" value={lesson.type}
                      onChange={e => onChange(l => ({ ...l, type: e.target.value }))}>
                {LESSON_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </Field>
            <Field label="Тривалість (хв)">
              <input className="input" type="number" value={lesson.duration}
                     onChange={e => onChange(l => ({ ...l, duration: Number(e.target.value) || 0 }))}/>
            </Field>
          </div>

          <Field label="Короткий опис / результати навчання">
            <textarea className="textarea" rows={3} value={lesson.desc}
                      onChange={e => onChange(l => ({ ...l, desc: e.target.value }))}/>
          </Field>

          <div className="row gap-8">
            <span className="text-secondary" style={{ fontSize: 12.5 }}>Статус публікації:</span>
            <div className="seg">
              <button className={lesson.status === 'draft' ? 'active' : ''}
                      onClick={() => onChange(l => ({ ...l, status: 'draft' }))}>Чернетка</button>
              <button className={lesson.status === 'published' ? 'active' : ''}
                      onClick={() => onChange(l => ({ ...l, status: 'published' }))}>Опубліковано</button>
            </div>
          </div>
        </div>
      </div>

      {/* MATERIALS */}
      <div className="card">
        <div className="card-header">
          <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div><div className="card-title">Матеріали</div><div className="card-sub">Файли, посилання, відео для цього уроку</div></div>
            <Button variant="ghost" size="sm" icon="upload">Завантажити</Button>
          </div>
        </div>
        <div className="card-body col gap-8">
          {[
            { i: 'file', n: 'Слайди заняття.pdf',  s: '2.4 МБ' },
            { i: 'file', n: 'Конспект (нотатки).docx', s: '180 КБ' },
            { i: 'eye',  n: 'Запис лекції — YouTube',  s: 'посилання' },
          ].slice(0, lesson.materials || 0).map((mt, i) => (
            <div key={i} className="material-row">
              <Icon name={mt.i} size={14}/>
              <span style={{ flex: 1, fontWeight: 500 }}>{mt.n}</span>
              <span className="t-caption">{mt.s}</span>
              <button className="icon-btn" title="Видалити"><Icon name="x" size={12}/></button>
            </div>
          ))}
          {!lesson.materials && (
            <div className="empty-state" style={{ padding: 16 }}>
              <div className="empty-icon"><Icon name="upload" size={18}/></div>
              <div className="t-caption">Перетягніть файли сюди або скористайтесь кнопкою «Завантажити».</div>
            </div>
          )}
        </div>
      </div>

      {/* ASSIGNMENTS */}
      <div className="card">
        <div className="card-header">
          <div className="row" style={{ width: '100%', justifyContent: 'space-between' }}>
            <div><div className="card-title">Домашні завдання</div><div className="card-sub">Здача, оцінювання, дедлайн</div></div>
            <Button variant="primary" size="sm" icon="plus" onClick={addAssignment}>Нове завдання</Button>
          </div>
        </div>
        <div className="card-body col gap-12">
          {lesson.assignments.length === 0
            ? <div className="empty-state" style={{ padding: 24 }}>
                <div className="empty-icon"><Icon name="edit" size={18}/></div>
                <div style={{ fontWeight: 500 }}>Завдань для цього уроку поки немає</div>
                <div className="t-caption">Додайте принаймні одне, якщо урок передбачає оцінювання.</div>
              </div>
            : lesson.assignments.map(a => (
              <div key={a.id} className="assign-card">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <div className="row gap-8">
                    <div className="assign-icon"><Icon name="edit" size={14}/></div>
                    <input className="input" style={{ height: 32, fontWeight: 600, minWidth: 240 }}
                           value={a.title}
                           onChange={e => setAssignment(a.id, x => ({ ...x, title: e.target.value }))}/>
                  </div>
                  <button className="icon-btn" onClick={() => removeAssignment(a.id)}><Icon name="trash" size={14}/></button>
                </div>
                <Field label="Опис завдання">
                  <textarea className="textarea" rows={2} value={a.desc}
                            onChange={e => setAssignment(a.id, x => ({ ...x, desc: e.target.value }))}/>
                </Field>
                <div className="grid-3" style={{ marginTop: 10 }}>
                  <Field label="Тип">
                    <select className="select" value={a.type}
                            onChange={e => setAssignment(a.id, x => ({ ...x, type: e.target.value }))}>
                      <option value="submission">Здача файлу</option>
                      <option value="essay">Есе</option>
                      <option value="project">Проєкт</option>
                      <option value="quiz">Квіз</option>
                    </select>
                  </Field>
                  <Field label="Дедлайн">
                    <input className="input" type="date" value={a.deadline}
                           onChange={e => setAssignment(a.id, x => ({ ...x, deadline: e.target.value }))}/>
                  </Field>
                  <Field label="Бали">
                    <input className="input" type="number" value={a.points}
                           onChange={e => setAssignment(a.id, x => ({ ...x, points: Number(e.target.value) || 0 }))}/>
                  </Field>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { BuilderScreen, LessonTypeIcon, LessonTypeLabel });
