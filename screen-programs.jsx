// ============ PROGRAMS LIST + DETAIL ============
const ProgramsListScreen = ({ navigate, programId }) => {
  if (programId) return <ProgramDetailScreen programId={programId} navigate={navigate}/>;
  const programs = window.MockData.programs;
  const [q, setQ] = React.useState('');
  const [status, setStatus] = React.useState('Усі');
  const STATUS_LABELS = { 'Active': 'Активна', 'Completed': 'Завершена', 'Planning': 'Планування' };
  const filtered = programs.filter(p =>
    (status === 'Усі' || STATUS_LABELS[p.status] === status) &&
    (!q || p.title.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[{ label: 'Панель', to: { screen: 'dashboard' } }, { label: 'Програми' }]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Усі програми</h1>
            <div className="page-subtitle">{programs.length} програм у поточному портфоліо.</div>
          </div>
          <Button variant="primary" icon="plus" onClick={() => navigate({ screen: 'create' })}>Нова програма</Button>
        </div>
      </div>

      <div className="card mb-20" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="seg">
          {['Усі','Активна','Завершена','Планування'].map(s => <button key={s} className={status===s?'active':''} onClick={()=>setStatus(s)}>{s}</button>)}
        </div>
        <div className="input-group" style={{ flex: 1, marginLeft: 'auto', minWidth: 200 }}>
          <span className="input-group-icon"><Icon name="search" size={14}/></span>
          <input className="input" placeholder="Пошук…" value={q} onChange={e => setQ(e.target.value)}/>
        </div>
      </div>

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th>Програма</th><th>Статус</th><th>Учасники</th><th>Завершення</th><th>Задоволеність</th><th>Бюджет</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id} onClick={() => navigate({ screen: 'programs', programId: p.id })} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div className="t-caption mono">{p.code} · {p.credits} ECTS · {p.weeks} тиж</div>
                </td>
                <td><StatusBadge status={p.status}/></td>
                <td className="tabular"><span style={{fontWeight:600}}>{p.enrolled}</span> <span className="text-muted">/ {p.completed} зав.</span></td>
                <td>
                  <div className="row gap-12">
                    <Progress value={p.completion} width={80}/>
                    <span className="tabular" style={{ fontWeight: 600 }}>{p.completion}%</span>
                  </div>
                </td>
                <td className="tabular">{p.satisfaction ? `${p.satisfaction.toFixed(1)} / 5` : '—'}</td>
                <td className="tabular text-secondary">€{p.budget.toLocaleString()}</td>
                <td><Icon name="chevRight" size={16}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const ProgramDetailScreen = ({ programId, navigate }) => {
  const p = window.MockData.programs.find(x => x.id === programId) || window.MockData.programs[0];
  const utilization = (p.spent / p.budget) * 100;
  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Панель', to: { screen: 'dashboard' } },
          { label: 'Програми', to: { screen: 'programs' } },
          { label: p.title },
        ]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <div className="row gap-12 mb-8">
              <StatusBadge status={p.status}/>
              <span className="t-caption mono">{p.code}</span>
            </div>
            <h1 className="t-display">{p.title}</h1>
            <div className="page-subtitle">{p.credits} ECTS · {p.weeks} тижнів · {p.language} · {p.persona}</div>
          </div>
          <div className="row gap-8">
            <Button icon="edit" onClick={() => navigate({ screen: 'builder', programId: p.id })}>Конструктор</Button>
            <Button icon="users" onClick={() => navigate({ screen: 'participants', programId: p.id })}>Учасники</Button>
            <Button icon="chart" onClick={() => navigate({ screen: 'metrics', programId: p.id })}>Оновити показники</Button>
            <Button variant="primary" icon="file" onClick={() => navigate({ screen: 'reports', programId: p.id })}>Відкрити звіт</Button>
          </div>
        </div>
      </div>

      <div className="grid-4 mb-20">
        <div className="card kpi"><div className="kpi-label">Зараховано</div><div className="kpi-value">{p.enrolled}</div><div className="t-caption">ціль 30–80</div></div>
        <div className="card kpi"><div className="kpi-label">Завершення</div><div className="kpi-value">{p.completion}%</div><div className="t-caption">{p.completed} з {p.enrolled} учасників</div></div>
        <div className="card kpi"><div className="kpi-label">Задоволеність</div><div className="kpi-value">{p.satisfaction ? p.satisfaction.toFixed(1) : '—'}</div><div className="t-caption">сер. оцінка 1–5</div></div>
        <div className="card kpi"><div className="kpi-label">Використано бюджет</div><div className="kpi-value">{Math.round(utilization)}%</div><div className="t-caption">€{p.spent.toLocaleString()} з €{p.budget.toLocaleString()}</div></div>
      </div>

      <div className="detail-grid">
        <div className="card">
          <div className="card-header"><div className="card-title">Модулі</div></div>
          <div className="card-body col gap-8">
            {[
              { t: 'Вступ та адаптація', c: 1, h: 8 },
              { t: 'Базові концепції I',  c: 1, h: 12 },
              { t: 'Базові концепції II', c: 1, h: 12 },
              { t: 'Прикладний воркшоп',  c: 1, h: 16 },
              { t: 'Підсумковий проєкт',  c: 2, h: 20 },
            ].map((m, i) => (
              <div key={i} className="module-row" style={{ gridTemplateColumns: '24px 1fr 90px 90px' }}>
                <span className="text-muted mono">{i + 1}</span>
                <span style={{ fontWeight: 500 }}>{m.t}</span>
                <span className="text-secondary tabular">{m.c} ECTS</span>
                <span className="text-secondary tabular">{m.h} год</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Відповідність</div></div>
          <div className="card-body col gap-12">
            <div className="row gap-8"><Icon name="checkCircle" size={16} stroke={2}/><div><div style={{fontWeight:500}}>Рекомендація Ради ЄС 2022</div><div className="t-caption">Рамка мікрокваліфікацій</div></div></div>
            <div className="row gap-8"><Icon name="checkCircle" size={16}/><div><div style={{fontWeight:500}}>Внутрішні положення університету</div><div className="t-caption">Затверджено Вченою радою, 04.12.2025</div></div></div>
            <div className="row gap-8"><Icon name="checkCircle" size={16}/><div><div style={{fontWeight:500}}>Академічна доброчесність</div><div className="t-caption">Кодекс університету дотримано</div></div></div>
          </div>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { ProgramsListScreen });
