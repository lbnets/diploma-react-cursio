// ============ SCREEN 6: CERTIFICATES ============
const CertificatesScreen = ({ navigate, programId }) => {
  const programs = window.MockData.programs;
  const program = programs.find((p) => p.id === programId) || programs[0];
  const toast = useToast();

  const [onlyEligible, setOnlyEligible] = React.useState(true);
  const [selected, setSelected] = React.useState(new Set());
  const [previewFor, setPreviewFor] = React.useState(null);
  const [generated, setGenerated] = React.useState([]);
  const [confettiKey, setConfettiKey] = React.useState(0);

  const all = window.MockData.participants.map((p) => {
    const eligible = p.status === 'Completed' && p.avgScore >= 60;
    const reason = !eligible ?
    p.status === 'Withdrawn' ? 'Вибув до завершення курсу' :
    p.status === 'At Risk' ? `Бал нижче 60% (${p.avgScore || 'без оцінки'})` :
    `Модуль ${p.modules + 1} не завершено (${p.modules}/${p.modulesTotal})` :
    null;
    return { ...p, eligible, reason };
  });
  const eligibleCount = all.filter((p) => p.eligible).length;
  const visible = onlyEligible ? all.filter((p) => p.eligible) : all;

  const toggle = (id) => {const s = new Set(selected);s.has(id) ? s.delete(id) : s.add(id);setSelected(s);};
  const toggleAll = () => {
    const elig = visible.filter((p) => p.eligible).map((p) => p.id);
    if (selected.size === elig.length) setSelected(new Set());else
    setSelected(new Set(elig));
  };

  const generate = () => {
    const list = all.filter((p) => selected.has(p.id));
    setGenerated(list);
    setConfettiKey((k) => k + 1);
    toast(`Сформовано ${list.length} сертифікатів`, 'success');
    setSelected(new Set());
  };

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
        { label: 'Панель', to: { screen: 'dashboard' } },
        { label: 'Програми', to: { screen: 'programs' } },
        { label: program.title, to: { screen: 'programs', programId: program.id } },
        { label: 'Сертифікати' }]
        } onNavigate={navigate} />
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Видача сертифікатів</h1>
            <div className="page-subtitle">{program.title}  ·  <span className="mono">{program.code}</span></div>
          </div>
        </div>
      </div>

      <div className="card mb-20" style={{ padding: 16, display: 'flex', gap: 14, alignItems: 'center', borderLeft: '3px solid var(--info)' }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--info-bg)', display: 'grid', placeItems: 'center', color: 'var(--info)', flex: 'none' }}>
          <Icon name="info" size={18} />
        </div>
        <div className="flex-1">
          <div style={{ fontWeight: 600, fontSize: 13.5 }}>Критерії допуску</div>
          <div className="t-caption">Учасник має право на сертифікат, якщо завершив усі необхідні модулі <strong>І</strong> отримав середній бал не нижче <strong>60%</strong>.</div>
        </div>
        <Badge tone="success" icon="check">{eligibleCount} мають право</Badge>
        <Badge tone="neutral">{all.length - eligibleCount} не відповідають</Badge>
      </div>

      <div className="card mb-20" style={{ padding: 14, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <Check label="Показувати лише тих, хто має право" checked={onlyEligible} onChange={setOnlyEligible} />
        <div className="divider" style={{ height: 24, width: 1 }} />
        <span className="t-caption">Обрано: <strong className="text-primary tabular">{selected.size}</strong> з <strong className="tabular">{eligibleCount}</strong></span>
        <div className="row gap-8" style={{ marginLeft: 'auto' }}>
          <Button variant="ghost" size="sm" onClick={toggleAll}>{selected.size === visible.filter((p) => p.eligible).length && selected.size > 0 ? 'Зняти виділення' : 'Обрати всіх'}</Button>
        </div>
      </div>

      <div className="grid-2 mb-20">
        {visible.filter((p) => p.eligible).map((p) =>
        <div key={p.id} className="card"
        style={{ padding: 16, borderColor: selected.has(p.id) ? 'var(--primary)' : 'var(--border)', boxShadow: selected.has(p.id) ? '0 0 0 3px var(--primary-100)' : 'var(--shadow-sm)', cursor: 'pointer', transition: 'all 150ms' }}
        onClick={() => toggle(p.id)}>
            <div className="row gap-12" style={{ alignItems: 'flex-start' }}>
              <Check checked={selected.has(p.id)} onChange={() => toggle(p.id)} />
              <div className="avatar" style={{ width: 40, height: 40, fontSize: 14, background: 'linear-gradient(135deg,#10B981,#2563EB)' }}>
                {p.name.split(' ').map((s) => s[0]).join('')}
              </div>
              <div className="flex-1">
                <div style={{ fontWeight: 600 }}>{p.name}</div>
                <div className="t-caption mono">{p.id}</div>
                <div className="row gap-12 mt-8">
                  <Badge tone="success" icon="check">Завершив усі модулі</Badge>
                  <span className="t-caption">Бал <strong className="tabular" style={{ color: 'var(--text)' }}>{p.avgScore}%</strong></span>
                </div>
              </div>
              <Button variant="ghost" size="sm" icon="eye" onClick={(e) => {e.stopPropagation();setPreviewFor(p);}}>Перегляд</Button>
            </div>
          </div>
        )}
      </div>

      {!onlyEligible && all.filter((p) => !p.eligible).length > 0 &&
      <div className="card mb-20" style={{ background: 'var(--bg)' }}>
          <div className="card-header">
            <div>
              <div className="card-title row gap-8" style={{ color: 'var(--text-secondary)' }}><Icon name="xCircle" size={16} /> Не мають права ({all.filter((p) => !p.eligible).length})</div>
              <div className="card-sub">XOR-гілка «ні» — процес для них завершується</div>
            </div>
          </div>
          <table className="tbl" style={{ opacity: 0.75 }}>
            <thead>
              <tr><th>ID</th><th>Ім\u02bcя</th><th>Статус</th><th>Причина</th></tr>
            </thead>
            <tbody>
              {all.filter((p) => !p.eligible).map((p) =>
            <tr key={p.id}>
                  <td className="mono t-caption">{p.id}</td>
                  <td>{p.name}</td>
                  <td><StatusBadge status={p.status} /></td>
                  <td className="text-secondary">{p.reason}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      }

      {generated.length > 0 &&
      <div className="card mb-20" style={{ borderColor: 'var(--success)', borderLeft: '3px solid var(--success)' }}>
          <div className="card-header">
            <div>
              <div className="card-title row gap-8 text-success"><Icon name="checkCircle" size={16} /> Сформовано {generated.length} сертифікатів</div>
              <div className="card-sub">Видано {new Date().toISOString().slice(0, 10)} · готові до завантаження</div>
            </div>
            <Button variant="primary" icon="download" size="sm" onClick={() => toast(`Завантаження ${generated.length} PDF…`, 'default')}>Завантажити всі</Button>
          </div>
          <div className="card-body col gap-8">
            {generated.map((p) =>
          <div key={p.id} className="row gap-12" style={{ padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 8, background: 'var(--surface)' }}>
                <Icon name="cert" size={16} stroke={1.6} />
                <div className="flex-1">
                  <div style={{ fontWeight: 500 }}>{p.name}</div>
                  <div className="t-caption mono">{program.code}-{p.id.split('-').pop()}</div>
                </div>
                <Button variant="ghost" size="sm" icon="eye" onClick={() => setPreviewFor(p)}>Перегляд</Button>
                <Button variant="secondary" size="sm" icon="download">PDF</Button>
              </div>
          )}
          </div>
        </div>
      }

      <div className="card" style={{ padding: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', bottom: 16 }}>
        <div className="t-caption">Кожен сертифікат має унікальний ID та QR-код для перевірки.</div>
        <div className="row gap-8">
          <Button variant="ghost" onClick={() => navigate({ screen: 'reports', programId: program.id })}>Скасувати</Button>
          <Button variant="primary" icon="cert" size="lg" disabled={selected.size === 0} onClick={generate}>
            Сформувати обрані ({selected.size})
          </Button>
        </div>
      </div>

      <Modal open={!!previewFor} onClose={() => setPreviewFor(null)} width={680}
      title="Попередній перегляд сертифіката"
      footer={<>
               <Button variant="ghost" onClick={() => setPreviewFor(null)}>Закрити</Button>
               <Button variant="primary" icon="download" onClick={() => toast('PDF завантажено', 'success')}>Завантажити PDF</Button>
             </>}>
        {previewFor && <CertificatePreview participant={previewFor} program={program} />}
      </Modal>

      {confettiKey > 0 && <Confetti key={confettiKey} />}
    </>);

};

const CertificatePreview = ({ participant, program }) => {
  const certId = `${program.code}-${participant.id.split('-').pop()}`;
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="cert-preview">
      <div className="cert-corner tl" /><div className="cert-corner tr" />
      <div className="cert-corner bl" /><div className="cert-corner br" />

      <div className="row gap-12" style={{ justifyContent: 'center', marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--primary)', display: 'grid', placeItems: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>U</div>
        <div className="col" style={{ alignItems: 'flex-start', gap: 0 }}>
          <span className="t-caption">Місце для логотипа університету</span>
          <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Заклад, що видає</span>
        </div>
      </div>

      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.3em', color: 'var(--primary)', marginBottom: 12 }}>СЕРТИФІКАТ ПРО ЗАВЕРШЕННЯ</div>
      <div className="t-caption mb-12">Цим засвідчуємо, що</div>
      <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'Georgia, serif', color: 'var(--text)', marginBottom: 12 }}>{participant.fullName}</div>
      <div className="t-body" style={{ maxWidth: 480, margin: '0 auto', color: 'var(--text-secondary)' }}>
        успішно завершив(ла) мікрокредитну програму <strong style={{ color: 'var(--text)' }}>{program.title}</strong> у обсязі <strong style={{ color: 'var(--text)' }}>{program.credits} ECTS-кредитів</strong>.
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: 28, padding: '0 24px' }}>
        <div className="col" style={{ alignItems: 'flex-start' }}>
          <div style={{ width: 140, borderTop: '1px solid var(--text-secondary)', paddingTop: 6 }} className="t-caption">Менеджер програм</div>
        </div>
        <div className="col gap-4" style={{ alignItems: 'center' }}>
          <div style={{ width: 60, height: 60, background: 'white', border: '1px solid var(--border)', borderRadius: 4, display: 'grid', placeItems: 'center' }}>
            <Icon name="qr" size={36} stroke={1.5} />
          </div>
          <div className="t-caption" style={{ fontSize: 10 }}>Перевірити онлайн</div>
        </div>
        <div className="col" style={{ alignItems: 'flex-end' }}>
          <div style={{ width: 140, borderTop: '1px solid var(--text-secondary)', paddingTop: 6 }} className="t-caption">Ректор університету</div>
        </div>
      </div>

      <div className="row" style={{ justifyContent: 'space-between', marginTop: 20, padding: '12px 24px 0', borderTop: '1px dashed var(--border)' }}>
        <span className="t-caption">Видано: <strong className="mono" style={{ color: 'var(--text)' }}>{today}</strong></span>
        <span className="t-caption">ID сертифіката: <strong className="mono" style={{ color: 'var(--text)' }}>{certId}</strong></span>
      </div>
    </div>);

};

const Confetti = () => {
  const colors = ['#2563EB', '#10B981', '#F59E0B', '#3B82F6', '#A78BFA'];
  const pieces = Array.from({ length: 60 }).map((_, i) => ({
    left: Math.random() * 100, color: colors[i % colors.length], delay: Math.random() * 200,
    dx: (Math.random() - 0.5) * 200 + 'px', rot: Math.random() * 720 + 'deg'
  }));
  const [show, setShow] = React.useState(true);
  React.useEffect(() => {const t = setTimeout(() => setShow(false), 2200);return () => clearTimeout(t);}, []);
  if (!show) return null;
  return (
    <div className="confetti-host">
      {pieces.map((p, i) =>
      <span key={i} className="confetti-piece" style={{
        left: `${p.left}%`, background: p.color, animationDelay: `${p.delay}ms`,
        '--dx': p.dx, '--rot': p.rot
      }} />
      )}
    </div>);

};

Object.assign(window, { CertificatesScreen });