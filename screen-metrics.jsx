// ============ SCREEN 4: METRICS INPUT ============
const MetricsScreen = ({ navigate, programId }) => {
  const programs = window.MockData.programs;
  const program = programs.find(p => p.id === programId) || programs[0];
  const [tab, setTab] = React.useState('quant');
  const [period, setPeriod] = React.useState(`Тиждень 4 з ${program.weeks}`);
  const toast = useToast();

  const [m, setM] = React.useState({
    enrolled: program.enrolled, active: 41, dropped: 4, hours: 96,
    spent: program.spent, satisfaction: 4, feedback: 28, issues: '',
  });
  const set = (k, v) => setM(s => ({ ...s, [k]: v }));
  const utilization = (m.spent / program.budget) * 100;
  const costPer = m.enrolled > 0 ? m.spent / m.enrolled : 0;

  const submit = () => {
    toast('Показники подано. Триває перерахунок інтегрального показника ефективності…', 'success');
    setTimeout(() => navigate({ screen: 'reports', programId: program.id }), 900);
  };

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Панель', to: { screen: 'dashboard' } },
          { label: 'Програми',  to: { screen: 'programs' } },
          { label: program.title, to: { screen: 'programs', programId: program.id } },
          { label: 'Показники' },
        ]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Показники реалізації</h1>
            <div className="page-subtitle">{program.title}  ·  <span className="mono">{program.code}</span></div>
          </div>
          <div className="row gap-12">
            <span className="t-caption">Звітний період</span>
            <Select value={period} onChange={e => setPeriod(e.target.value)} style={{ width: 200 }}>
              {Array.from({ length: program.weeks }, (_, i) => `Тиждень ${i + 1} з ${program.weeks}`).map(w => <option key={w}>{w}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <Tabs value={tab} onChange={setTab} tabs={[
            { value: 'quant',  label: 'Кількісні' },
            { value: 'fin',    label: 'Фінансові' },
            { value: 'qual',   label: 'Якісні' },
          ]}/>

          {tab === 'quant' && (
            <div className="col gap-20">
              <div className="t-caption">Фіксуються щотижнево. Базові значення підтягуються з реєстру учасників.</div>
              <div className="grid-2">
                <Field label="Кількість зарахованих учасників" helper="Підтягнуто з реєстру">
                  <Input type="number" value={m.enrolled} onChange={e => set('enrolled', +e.target.value)} disabled style={{ background: 'var(--bg)' }}/>
                </Field>
                <Field label="Активних учасників цього тижня" required>
                  <Input type="number" value={m.active} onChange={e => set('active', +e.target.value)}/>
                </Field>
                <Field label="Вибуло (за період)" required>
                  <Input type="number" value={m.dropped} onChange={e => set('dropped', +e.target.value)}/>
                </Field>
                <Field label="Аудиторні години (всього)" required>
                  <Input type="number" value={m.hours} onChange={e => set('hours', +e.target.value)}/>
                </Field>
              </div>
              <div className="row gap-12" style={{ padding: 14, background: 'var(--bg)', borderRadius: 10 }}>
                <Icon name="info" size={16}/>
                <div className="t-caption">Активність за період: <strong className="text-primary">{Math.round((m.active/m.enrolled)*100)}%</strong>  ·  Відсів накопичений: <strong>{m.dropped}/{m.enrolled}</strong></div>
              </div>
            </div>
          )}

          {tab === 'fin' && (
            <div className="col gap-20">
              <div className="grid-2">
                <Field label="Запланований бюджет" helper="Зафіксовано при створенні програми">
                  <Input value={`€${program.budget.toLocaleString()}`} disabled style={{ background: 'var(--bg)' }} className="tabular"/>
                </Field>
                <Field label="Витрачено" required>
                  <div className="input-group">
                    <span className="input-group-icon" style={{ left: 12, color: 'var(--text-secondary)' }}>€</span>
                    <Input type="number" value={m.spent} onChange={e => set('spent', +e.target.value)} className="tabular"/>
                  </div>
                </Field>
                <Field label="Витрати на одного учасника" helper="Розраховано автоматично">
                  <Input value={`€${costPer.toFixed(2)}`} disabled style={{ background: 'var(--bg)' }} className="tabular"/>
                </Field>
                <Field label="Освоєння бюджету" helper="Розраховано автоматично">
                  <div style={{ height: 38, border: '1px solid var(--border)', borderRadius: 8, background: 'var(--bg)', padding: '0 12px', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Progress value={utilization} width={120}/>
                    <span className="tabular" style={{ fontWeight: 600 }}>{utilization.toFixed(1)}%</span>
                  </div>
                </Field>
              </div>
              <div className="row gap-12" style={{ padding: 14, background: utilization > 80 ? 'var(--warning-bg)' : 'var(--bg)', borderRadius: 10 }}>
                <Icon name={utilization > 80 ? 'alert' : 'info'} size={16}/>
                <div className="t-caption">
                  {utilization > 80
                    ? <>Темп витрат завищений. Перегляньте прогноз до тижня {program.weeks - 1}.</>
                    : <>Темп витрат у нормі для тижня 4 з {program.weeks}.</>}
                </div>
              </div>
            </div>
          )}

          {tab === 'qual' && (
            <div className="col gap-20">
              <Field label="Середня задоволеність учасників" helper="1 = дуже незадоволений, 5 = дуже задоволений">
                <div className="row gap-16">
                  <StarRating value={m.satisfaction} onChange={v => set('satisfaction', v)}/>
                  <span className="tabular t-subhead">{m.satisfaction}.0 / 5</span>
                </div>
              </Field>
              <Field label="Кількість поданих відгуків">
                <Input type="number" value={m.feedback} onChange={e => set('feedback', +e.target.value)} style={{ width: 200 }}/>
              </Field>
              <Field label="Виявлені проблеми" helper="Вільний текст від викладачів та координаторів">
                <Textarea rows={5} value={m.issues} placeholder="напр. брифінг до Модуля 3 був незрозумілим; 4 учасники просили продовжити терміни." onChange={e => set('issues', e.target.value)}/>
              </Field>
            </div>
          )}
        </div>

        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="t-caption">Останнє подання: <strong>02.05.2026</strong> · координатор {program.code}</div>
          <div className="row gap-8">
            <Button variant="secondary" onClick={() => toast('Чернетку збережено', 'success')}>Зберегти чернетку</Button>
            <Button variant="primary" icon="check" onClick={submit}>Подати показники</Button>
          </div>
        </div>
      </div>

      <div className="card mt-24">
        <div className="card-header"><div className="card-title">Хід процесу</div><div className="card-sub">IDEF3 — поточний крок підсвічено</div></div>
        <div className="card-body">
          <FlowDiagram active={5}/>
        </div>
      </div>
    </>
  );
};

const FlowDiagram = ({ active }) => {
  const node = (n, label, sub, x, y, w = 130) => {
    const isActive = n === active;
    const isDone = n < active;
    return (
      <g key={n} transform={`translate(${x} ${y})`}>
        <rect width={w} height="50" rx="8" fill={isActive ? '#DBEAFE' : isDone ? '#ECFDF5' : 'white'}
              stroke={isActive ? '#2563EB' : isDone ? '#10B981' : '#E2E8F0'} strokeWidth={isActive ? 2 : 1}/>
        <text x={w/2} y="22" fontSize="11" fontWeight="600" fill={isActive ? '#2563EB' : isDone ? '#047857' : '#0F172A'} textAnchor="middle">{label}</text>
        <text x={w/2} y="38" fontSize="10" fill="#64748B" textAnchor="middle">{sub}</text>
        {isDone && <circle cx={w - 12} cy="12" r="6" fill="#10B981"/>}
        {isDone && <path d={`M ${w-15} 12 l 2 2 l 4 -4`} stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round"/>}
      </g>
    );
  };
  const arrow = (x1, y1, x2, y2, dashed) => (
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray={dashed ? '4 4' : '0'} markerEnd="url(#arr)"/>
  );
  return (
    <svg viewBox="0 0 980 220" style={{ width: '100%', height: 220 }}>
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8"/>
        </marker>
      </defs>
      {node(1, 'Опис програми',     'Менеджер',   10,  85)}
      {node(2, 'Реєстрація',        'Координатор',160, 85)}
      {node(3, 'Проведення курсу',  'Зовнішнє',   310, 85)}
      <text x="465" y="95" fontSize="12" fill="#94A3B8" textAnchor="middle">∥ AND</text>
      {node(4, 'Оновл. статусів',   'Гілка A',    490, 30)}
      {node(5, 'Введення показ.',   'Гілка B',    490, 140)}
      <text x="640" y="95" fontSize="12" fill="#94A3B8" textAnchor="middle">∥ JOIN</text>
      {node(6, 'Розрахунок ефект.', 'Авто',       660, 85)}
      {node(7, 'Формув. звіту',     'Система',    810, 85)}
      <text x="945" y="95" fontSize="14" fill="#F59E0B" textAnchor="middle">⤳ XOR</text>
      {arrow(140, 110, 160, 110)}
      {arrow(290, 110, 310, 110)}
      {arrow(440, 110, 490, 55)}
      {arrow(440, 110, 490, 165)}
      {arrow(620, 55,  660, 100)}
      {arrow(620, 165, 660, 120)}
      {arrow(790, 110, 810, 110)}
    </svg>
  );
};

Object.assign(window, { MetricsScreen });
