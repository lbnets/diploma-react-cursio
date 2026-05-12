// ============ SCREEN 1: DASHBOARD ============
const DashboardScreen = ({ navigate }) => {
  const programs = window.MockData.programs;
  const [year, setYear] = React.useState('2025/2026');
  const [statusFilter, setStatusFilter] = React.useState('Усі');
  const [search, setSearch] = React.useState('');

  const STATUS_LABELS = { 'Active': 'Активна', 'Completed': 'Завершена', 'At Risk': 'Під загрозою', 'Withdrawn': 'Вибув', 'Planning': 'Планування' };
  const filtered = programs.filter((p) =>
  (statusFilter === 'Усі' || STATUS_LABELS[p.status] === statusFilter) && (
  !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.code.toLowerCase().includes(search.toLowerCase()))
  );

  const kpis = [
  { label: 'Активні програми', value: 12, delta: '+3', dir: 'up', tone: 'success', sub: 'до минулого семестру' },
  { label: 'Усього учасників', value: 487, delta: '+124', dir: 'up', tone: 'success', sub: 'до минулого семестру' },
  { label: 'Середній рівень завершення', value: '76%', delta: '-2%', dir: 'down', tone: 'danger', sub: 'до минулого семестру' },
  { label: 'Видано сертифікатів', value: 312, delta: '+88', dir: 'up', tone: 'success', sub: 'до минулого семестру' }];


  const chartData = filtered.filter((p) => p.status === 'Active').slice(0, 8);
  const flagged = programs.filter((p) => p.flag);

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[{ label: 'Панель' }]} />
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Портфоліо програм</h1>
            <div className="page-subtitle">Операційний огляд та підтримка прийняття рішень за всіма мікрокредитними програмами.</div>
          </div>
          <Button variant="primary" icon="plus" size="lg" onClick={() => navigate({ screen: 'create' })}>
            Створити програму
          </Button>
        </div>
      </div>

      <div className="card mb-20" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="row gap-8">
          <span className="t-caption" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Навчальний рік</span>
          <Select value={year} onChange={(e) => setYear(e.target.value)} style={{ width: 140 }}>
            <option>2025/2026</option><option>2024/2025</option><option>2023/2024</option>
          </Select>
        </div>
        <div className="row gap-8">
          <span className="t-caption" style={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Статус</span>
          <div className="seg">
            {['Усі', 'Активна', 'Завершена', 'Планування'].map((s) =>
            <button key={s} className={statusFilter === s ? 'active' : ''} onClick={() => setStatusFilter(s)}>{s}</button>
            )}
          </div>
        </div>
        <div className="input-group" style={{ flex: 1, minWidth: 200, marginLeft: 'auto' }}>
          <span className="input-group-icon"><Icon name="search" size={14} /></span>
          <input className="input" placeholder="Пошук за назвою або кодом програми…" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      <div className="grid-4 mb-20">
        {kpis.map((k) =>
        <div key={k.label} className="card kpi">
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className={`kpi-trend ${k.dir}`}>
              <Icon name={k.dir === 'up' ? 'arrowUp' : 'arrowDown'} size={12} stroke={2.5} /> {k.delta}
              <span className="text-muted" style={{ fontWeight: 400, marginLeft: 4 }}>{k.sub}</span>
            </div>
          </div>
        )}
      </div>

      <div className="grid-2-uneven mb-20">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Рівень завершення за програмами</div>
              <div className="card-sub">Активні програми · показано {chartData.length}</div>
            </div>
            <div className="row gap-12 t-caption">
              <span className="row gap-4"><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--success)' }} />≥75%</span>
              <span className="row gap-4"><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--warning)' }} />50-75%</span>
              <span className="row gap-4"><span style={{ width: 8, height: 8, borderRadius: 2, background: 'var(--danger)' }} />&lt;50%</span>
            </div>
          </div>
          <div className="card-body">
            <BarChart data={chartData} />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Динаміка зарахувань</div>
              <div className="card-sub">Останні 6 місяців · фактичні vs планові</div>
            </div>
          </div>
          <div className="card-body">
            <LineChart />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header" style={{ paddingBottom: 12 }}>
          <div>
            <div className="card-title row gap-8"><Icon name="alert" size={16} /> Програми, що потребують уваги</div>
            <div className="card-sub">Статистична значущість vs середнє по портфоліо · позначено {flagged.length}</div>
          </div>
          <Button variant="ghost" size="sm" iconRight="arrowRight" onClick={() => navigate({ screen: 'programs' })}>Усі програми</Button>
        </div>
        <table className="tbl">
          <thead>
            <tr>
              <th>Програма</th>
              <th>Завершення</th>
              <th>СТАН ПРОГРАМИ</th>
              <th>Рекомендована дія</th>
              <th style={{ width: 60 }}></th>
            </tr>
          </thead>
          <tbody>
            {flagged.map((p) =>
            <tr key={p.id} onClick={() => navigate({ screen: 'reports', programId: p.id })} style={{ cursor: 'pointer' }}>
                <td>
                  <div style={{ fontWeight: 600 }}>{p.title}</div>
                  <div className="t-caption mono">{p.code}</div>
                </td>
                <td>
                  <div className="row gap-12">
                    <Progress value={p.completion} width={100} />
                    <span className="tabular" style={{ fontWeight: 600 }}>{p.completion}%</span>
                  </div>
                </td>
                <td><Badge tone={p.recommendation === 'Розширити' ? 'success' : 'warning'} dot>{p.flag}</Badge></td>
                <td>
                  <span style={{ fontWeight: 500 }}>
                    {p.recommendation === 'Розширити' && <span className="text-success">↗ </span>}
                    {p.recommendation === 'Закрити' && <span className="text-danger">↘ </span>}
                    {p.recommendation === 'Переглянути структуру' && <span className="text-warning">⟳ </span>}
                    {p.recommendation}
                  </span>
                </td>
                <td><Icon name="chevRight" size={16} /></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>);

};

const BarChart = ({ data }) => {
  const max = 100;
  const colorFor = (v) => v >= 75 ? 'var(--success)' : v >= 50 ? 'var(--warning)' : 'var(--danger)';
  return (
    <div className="col gap-8" style={{ paddingTop: 4 }}>
      {data.map((p) =>
      <div key={p.id} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 50px', alignItems: 'center', gap: 12 }}>
          <div className="t-body" style={{ fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.title}</div>
          <div style={{ height: 22, background: 'var(--bg)', borderRadius: 4, position: 'relative' }}>
            <div style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
            width: `${p.completion / max * 100}%`,
            background: colorFor(p.completion),
            borderRadius: 4,
            transition: 'width 600ms cubic-bezier(0.2,0.9,0.3,1)'
          }} />
          </div>
          <div className="tabular" style={{ fontWeight: 600, textAlign: 'right' }}>{p.completion}%</div>
        </div>
      )}
    </div>);

};

const LineChart = () => {
  const months = ['Лис', 'Гру', 'Січ', 'Лют', 'Бер', 'Кві'];
  const planned = [60, 75, 95, 110, 120, 125];
  const actual = [52, 71, 88, 102, 118, 124];
  const W = 460,H = 220,P = 32;
  const max = 140;
  const x = (i) => P + i / (months.length - 1) * (W - 2 * P);
  const y = (v) => H - P - v / max * (H - 2 * P);
  const path = (vals) => vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const area = (vals) => `${path(vals)} L ${x(vals.length - 1)} ${H - P} L ${x(0)} ${H - P} Z`;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 220 }}>
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0, 35, 70, 105, 140].map((v) =>
        <g key={v}>
            <line x1={P} x2={W - P} y1={y(v)} y2={y(v)} stroke="#E2E8F0" strokeDasharray="3 3" />
            <text x={6} y={y(v) + 4} fontSize="10" fill="#94A3B8">{v}</text>
          </g>
        )}
        {months.map((m, i) => <text key={m} x={x(i)} y={H - 10} fontSize="11" fill="#64748B" textAnchor="middle">{m}</text>)}
        <path d={path(planned)} fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="5 4" />
        <path d={area(actual)} fill="url(#lg)" />
        <path d={path(actual)} fill="none" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" />
        {actual.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3.5" fill="#2563EB" stroke="white" strokeWidth="2" />)}
      </svg>
      <div className="row gap-16" style={{ marginTop: 8, justifyContent: 'center' }}>
        <span className="row gap-6 t-caption"><span style={{ width: 16, height: 2, background: '#2563EB' }} />Фактичні зарахування</span>
        <span className="row gap-6 t-caption"><span style={{ width: 16, height: 0, borderTop: '2px dashed #94A3B8' }} />План</span>
      </div>
    </div>);

};

Object.assign(window, { DashboardScreen });