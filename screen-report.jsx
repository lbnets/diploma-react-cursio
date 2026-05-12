// ============ SCREEN 5: ANALYTICAL REPORT ============
const ReportScreen = ({ navigate, programId }) => {
  const programs = window.MockData.programs;
  const program = programs.find((p) => p.id === programId) || programs[0];
  const toast = useToast();

  const dims = [
  { key: 'completion', label: 'Рівень завершення', value: program.completion, avg: 70 },
  { key: 'satisfaction', label: 'Задоволеність учасників', value: Math.round((program.satisfaction || 0) * 20), avg: 76 },
  { key: 'budget', label: 'Ефективність бюджету', value: Math.max(0, 100 - Math.round(program.spent / program.budget * 100 - 50) * 2), avg: 65 },
  { key: 'skills', label: 'Набуті компетентності', value: 78, avg: 72 },
  { key: 'engagement', label: 'Залученість', value: 82, avg: 74 }];


  const [weights, setWeights] = React.useState({ completion: 25, satisfaction: 25, budget: 15, skills: 20, engagement: 15 });
  const setW = (k, v) => setWeights((w) => ({ ...w, [k]: v }));

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const score = Math.round(dims.reduce((s, d) => s + d.value * (weights[d.key] / Math.max(totalWeight, 1)), 0));
  const portfolio = Math.round(dims.reduce((s, d) => s + d.avg * (weights[d.key] / Math.max(totalWeight, 1)), 0));

  const interpretation =
  score >= 80 ? { label: 'Відмінно — верхній квартиль', tone: 'success' } :
  score >= 65 ? { label: 'Вище середнього — програма ефективна', tone: 'success' } :
  score >= 50 ? { label: 'Змішаний — перегляньте структуру слабкого модуля', tone: 'warning' } :
  { label: 'Нижче середнього — розгляньте редизайн або закриття', tone: 'danger' };

  const today = new Date().toISOString().slice(0, 10);
  const periodStart = program.startDate;
  const peers = programs.filter((p) => p.id !== program.id && p.status === 'Active' && p.completion > 0).slice(0, 3);

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
        { label: 'Панель', to: { screen: 'dashboard' } },
        { label: 'Програми', to: { screen: 'programs' } },
        { label: program.title, to: { screen: 'programs', programId: program.id } },
        { label: 'Аналітичний звіт' }]
        } onNavigate={navigate} />
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Аналітичний звіт</h1>
            <div className="page-subtitle">{program.title}  ·  Звітний період: <strong>{periodStart} → {today}</strong>  ·  Сформовано: <strong>{today}</strong></div>
          </div>
          <div className="row gap-8">
            <Button variant="secondary" icon="download" onClick={() => toast('Експорт у PDF…', 'default')}>Експорт PDF</Button>
            <Button variant="secondary" icon="file" onClick={() => toast('Експорт у Excel…', 'default')}>Експорт Excel</Button>
            <Button variant="ghost" icon="share" onClick={() => toast('Посилання скопійовано', 'success')}>Поділитись</Button>
          </div>
        </div>
      </div>

      <div className="grid-2-uneven mb-20">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">Оцінка ефективності програми</div>
              <div className="card-sub">Метод зваженої суми (WSM) · ваги налаштовуються</div>
            </div>
            <Badge tone={interpretation.tone} dot>{interpretation.tone === 'success' ? 'У нормі' : interpretation.tone === 'warning' ? 'Увага' : 'Критично'}</Badge>
          </div>
          <div className="card-body row gap-24" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
            <Circular value={score} max={100} sublabel="зі 100" />
            <div className="col gap-12" style={{ flex: 1, maxWidth: 280 }}>
              <div className={`rec-card ${interpretation.tone}`}>
                <div className="rec-icon"><Icon name={interpretation.tone === 'success' ? 'checkCircle' : 'alert'} size={16} /></div>
                <div>
                  <div className="rec-title">{interpretation.label}</div>
                  <div className="rec-body">Середнє по портфоліо: <strong>{portfolio}</strong>. Програма <strong className={score >= portfolio ? 'text-success' : 'text-danger'}>{score >= portfolio ? '+' : ''}{score - portfolio}</strong> до середнього.</div>
                </div>
              </div>
              <div className="row gap-12 t-caption">
                <span>n = {program.enrolled}</span>
                <span></span>
                <span>5 KPI</span>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header"><div className="card-title">Ваги</div><div className="card-sub">Тягніть для перерахунку · сума {totalWeight}%</div></div>
          <div className="card-body col gap-12">
            {dims.map((d) =>
            <div key={d.key}>
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className="t-body" style={{ fontWeight: 500 }}>{d.label}</span>
                  <span className="tabular t-caption" style={{ fontWeight: 600, color: 'var(--text)' }}>{weights[d.key]}%</span>
                </div>
                <input type="range" min="0" max="100" value={weights[d.key]} className="rng" onChange={(e) => setW(d.key, +e.target.value)} />
              </div>
            )}
            <Button variant="ghost" size="sm" icon="refresh" onClick={() => setWeights({ completion: 25, satisfaction: 25, budget: 15, skills: 20, engagement: 15 })} style={{ alignSelf: 'flex-start' }}>Скинути ваги</Button>
          </div>
        </div>
      </div>

      <div className="card mb-20">
        <div className="card-header">
          <div>
            <div className="card-title">Багатокритеріальний аналіз</div>
            <div className="card-sub">Нормалізовано 0–100 · програма vs середнє по портфоліо</div>
          </div>
          <div className="row gap-12 t-caption">
            <span className="row gap-6"><span style={{ width: 14, height: 8, background: 'var(--primary)', borderRadius: 2 }} />Програма</span>
            <span className="row gap-6"><span style={{ width: 14, height: 8, background: 'var(--border-strong)', borderRadius: 2 }} />Середнє</span>
          </div>
        </div>
        <div className="card-body col gap-16">
          {dims.map((d) =>
          <div key={d.key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr 70px', gap: 12, alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: 13.5 }}>{d.label}</div>
                <div className="t-caption">вага {weights[d.key]}%</div>
              </div>
              <div style={{ position: 'relative', height: 32 }}>
                <div style={{ position: 'absolute', left: 0, top: 6, height: 8, width: `${d.avg}%`, background: 'var(--border-strong)', borderRadius: 4 }} />
                <div style={{ position: 'absolute', left: 0, top: 18, height: 10, width: `${d.value}%`, background: 'var(--primary)', borderRadius: 4, transition: 'width 400ms cubic-bezier(0.2,0.9,0.3,1)' }} />
              </div>
              <div className="tabular" style={{ textAlign: 'right', fontWeight: 600 }}>
                {d.value} <span className={`t-caption ${d.value >= d.avg ? 'text-success' : 'text-danger'}`}>{d.value >= d.avg ? '+' : ''}{d.value - d.avg}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="card mb-20">
        <div className="card-header"><div className="card-title">Порівняння з іншими програмами</div><div className="card-sub">З {peers.length} подібними програмами</div></div>
        <table className="tbl">
          <thead>
            <tr><th>Програма</th><th>Завершення</th><th>Задоволеність</th><th>Ефективність</th><th>ПОРІВНЯННЯ</th></tr>
          </thead>
          <tbody>
            <tr style={{ background: 'var(--primary-50)' }}>
              <td>
                <div style={{ fontWeight: 600 }}>{program.title}</div>
                <div className="t-caption">Поточний звіт · n = {program.enrolled}</div>
              </td>
              <td className="tabular" style={{ fontWeight: 600 }}>{program.completion}%</td>
              <td className="tabular" style={{ fontWeight: 600 }}>{program.satisfaction.toFixed(1)} / 5</td>
              <td className="tabular" style={{ fontWeight: 700, color: 'var(--primary)' }}>{score}</td>
              <td><Badge tone="info">базова</Badge></td>
            </tr>
            {peers.map((p) => {
              const peerScore = Math.round(p.completion * 0.4 + (p.satisfaction || 0) * 20 * 0.4 + 70 * 0.2);
              const sig = peerScore - score;
              return (
                <tr key={p.id}>
                  <td><div style={{ fontWeight: 500 }}>{p.title}</div><div className="t-caption">n = {p.enrolled}</div></td>
                  <td className="tabular">{p.completion}%</td>
                  <td className="tabular">{p.satisfaction.toFixed(1)} / 5</td>
                  <td className="tabular" style={{ fontWeight: 600 }}>{peerScore}</td>
                  <td>{Math.abs(sig) > 8 ? <Badge tone={sig > 0 ? 'success' : 'danger'} dot>p&lt;0,05 ({sig > 0 ? '+' : ''}{sig})</Badge> : <Badge tone="neutral">не знач.</Badge>}</td>
                </tr>);

            })}
          </tbody>
        </table>
      </div>

      <div className="card mb-20">
        <div className="card-header"><div className="card-title">Рекомендації</div><div className="card-sub">Сформовано на основі оцінки показників програми</div></div>
        <div className="card-body grid-2">
          <div className="rec-card success">
            <div className="rec-icon"><Icon name="checkCircle" size={16} /></div>
            <div><div className="rec-title">Зберегти поточну структуру</div><div className="rec-body">Рівень завершення модулів відповідає цільовому показнику. Структурних змін не потрібно.</div></div>
          </div>
          <div className="rec-card warning">
            <div className="rec-icon"><Icon name="alert" size={16} /></div>
            <div><div className="rec-title">Додати підтримку для Модуля 3</div><div className="rec-body">Рівень завершення у <strong>Модулі 3</strong> у Модулі 3. Додайте 1× консультацію та приклад розв\u02bcязання перед наступною когортою.</div></div>
          </div>
          <div className="rec-card success">
            <div className="rec-icon"><Icon name="checkCircle" size={16} /></div>
            <div><div className="rec-title">Бюджет у нормі</div><div className="rec-body">Освоєно <strong>{Math.round(program.spent / program.budget * 100)}%</strong> на 50% часової позначки — у здоровому темпі.</div></div>
          </div>
          <div className="rec-card info">
            <div className="rec-icon"><Icon name="bulb" size={16} /></div>
            <div><div className="rec-title">Рекомендація</div><div className="rec-body"><strong>Програма має вищу задоволеність</strong> , але нижчий рівень завершення. Потрібен додатковий перегляд перед ухваленням рішення. має вищу задоволеність, але нижче завершення. Потрібне експертне рішення.</div></div>
          </div>
        </div>
      </div>

      <div className="grid-2 mb-20">
        <div className="card">
          <div className="card-header"><div className="card-title">Зарахування за час</div></div>
          <div className="card-body"><MiniLine data={[12, 22, 35, 41, 44, 48, 48]} color="#2563EB" /></div>
        </div>
        <div className="card">
          <div className="card-header"><div className="card-title">Тренд завершення</div></div>
          <div className="card-body"><MiniLine data={[0, 10, 28, 45, 62, 78, 85]} color="#10B981" suffix="%" /></div>
        </div>
      </div>

      <div className="row gap-12" style={{ justifyContent: 'flex-end' }}>
        <Button variant="ghost" onClick={() => navigate({ screen: 'dashboard' })}>На панель</Button>
        <Button variant="primary" icon="cert" size="lg" onClick={() => navigate({ screen: 'certificates', programId: program.id })}>
          Сформувати сертифікати для випускників
        </Button>
      </div>
    </>);

};

const MiniLine = ({ data, color = '#2563EB', suffix = '' }) => {
  const W = 460,H = 160,P = 28;
  const max = Math.max(...data, 10);
  const x = (i) => P + i / (data.length - 1) * (W - 2 * P);
  const y = (v) => H - P - v / max * (H - 2 * P);
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${H - P} L ${x(0)} ${H - P} Z`;
  const months = ['Т1', 'Т2', 'Т3', 'Т4', 'Т5', 'Т6', 'Т7'];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 160 }}>
      <defs>
        <linearGradient id={`g-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <line x1={P} x2={W - P} y1={H - P} y2={H - P} stroke="#E2E8F0" />
      {months.map((m, i) => i < data.length && <text key={m} x={x(i)} y={H - 8} fontSize="10" fill="#64748B" textAnchor="middle">{m}</text>)}
      <path d={area} fill={`url(#g-${color})`} />
      <path d={path} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
      {data.map((v, i) => <circle key={i} cx={x(i)} cy={y(v)} r="3" fill={color} stroke="white" strokeWidth="2" />)}
      <text x={x(data.length - 1)} y={y(data[data.length - 1]) - 10} fontSize="11" fontWeight="600" fill={color} textAnchor="end">{data[data.length - 1]}{suffix}</text>
    </svg>);

};

Object.assign(window, { ReportScreen });