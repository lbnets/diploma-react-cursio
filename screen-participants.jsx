// ============ SCREEN 3: PARTICIPANT REGISTRY ============
const ParticipantsScreen = ({ navigate, programId }) => {
  const programs = window.MockData.programs;
  const program = programs.find(p => p.id === programId) || programs[0];
  const [progId, setProgId] = React.useState(program.id);
  const [participants, setParticipants] = React.useState(window.MockData.participants);
  const [selected, setSelected] = React.useState(new Set());
  const [search, setSearch] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('Усі');
  const [showFull, setShowFull] = React.useState(false);
  const [confirmFull, setConfirmFull] = React.useState(false);
  const [addOpen, setAddOpen] = React.useState(false);
  const toast = useToast();

  const STATUS_LABELS = { 'Active':'Активний', 'Completed':'Завершив', 'At Risk':'Під загрозою', 'Withdrawn':'Вибув' };
  const currentProgram = programs.find(p => p.id === progId) || program;
  const filtered = participants.filter(p =>
    (statusFilter === 'Усі' || STATUS_LABELS[p.status] === statusFilter) &&
    (!search || p.fullName.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  const toggleAll = () => {
    if (selected.size === filtered.length) setSelected(new Set());
    else setSelected(new Set(filtered.map(p => p.id)));
  };
  const toggle = (id) => { const s = new Set(selected); s.has(id) ? s.delete(id) : s.add(id); setSelected(s); };
  const onShowFull = (v) => { if (v && !showFull) setConfirmFull(true); else setShowFull(false); };

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Панель', to: { screen: 'dashboard' } },
          { label: 'Програми',  to: { screen: 'programs' } },
          { label: currentProgram.title, to: { screen: 'programs', programId: currentProgram.id } },
          { label: 'Учасники' },
        ]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Реєстр учасників</h1>
            <div className="page-subtitle">{currentProgram.title} · показано {filtered.length} з {participants.length} учасників</div>
          </div>
          <div className="row gap-12">
            <Select value={progId} onChange={e => setProgId(e.target.value)} style={{ width: 280 }}>
              {programs.filter(p => p.status !== 'Planning').map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
            </Select>
          </div>
        </div>
      </div>

      <div className="card mb-20" style={{ padding: 14, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="primary" icon="plus" onClick={() => setAddOpen(true)}>Додати учасника</Button>
        <Button variant="secondary" icon="upload">Імпорт із CSV</Button>
        <div className="seg">
          {['Усі','Активний','Завершив','Під загрозою','Вибув'].map(s => <button key={s} className={statusFilter===s?'active':''} onClick={()=>setStatusFilter(s)}>{s}</button>)}
        </div>
        <div className="input-group" style={{ flex: 1, minWidth: 200, marginLeft: 'auto' }}>
          <span className="input-group-icon"><Icon name="search" size={14}/></span>
          <input className="input" placeholder="Пошук за іменем, email або ID…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>
        <Check label={<span className="row gap-6" style={{fontSize: 12.5}}>Показати повні імена</span>} checked={showFull} onChange={onShowFull}/>
      </div>

      {selected.size > 0 && (
        <div className="card mb-12" style={{ padding: '10px 14px', background: 'var(--primary-50)', borderColor: '#BFDBFE', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontWeight: 600, color: 'var(--primary)' }}>Обрано: {selected.size}</span>
          <Button variant="secondary" size="sm" icon="cert" onClick={() => navigate({ screen: 'certificates', programId: currentProgram.id })}>Видати сертифікати</Button>
          <Button variant="secondary" size="sm" icon="edit" onClick={() => toast(`Оновлено статус для ${selected.size} учасників`, 'success')}>Оновити статус</Button>
          <Button variant="ghost" size="sm" icon="x" onClick={() => setSelected(new Set())}>Очистити</Button>
        </div>
      )}

      <div className="card">
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 40, paddingLeft: 14 }}><Check checked={selected.size === filtered.length && filtered.length > 0} onChange={toggleAll}/></th>
              <th>ID учасника</th>
              <th>Ім\u02bcя</th>
              <th>Зараховано</th>
              <th>Модулі</th>
              <th>Статус</th>
              <th>Остання активність</th>
              <th style={{ width: 50 }}></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={{ paddingLeft: 14 }}><Check checked={selected.has(p.id)} onChange={() => toggle(p.id)}/></td>
                <td className="mono t-caption" style={{color: 'var(--text)'}}>{p.id}</td>
                <td>
                  <div style={{ fontWeight: 500 }}>{showFull ? p.fullName : p.name}</div>
                  <div className="t-caption">{p.email}</div>
                </td>
                <td className="tabular text-secondary">{p.enrolled}</td>
                <td><ProgressMini value={p.modules} total={p.modulesTotal}/></td>
                <td><StatusBadge status={p.status}/></td>
                <td className="tabular text-secondary">{p.lastActivity}</td>
                <td>
                  <DropdownMenu trigger={<button className="btn btn-ghost btn-sm btn-icon"><Icon name="more" size={16}/></button>}
                                items={[
                                  { icon: 'eye', label: 'Переглянути профіль' },
                                  { icon: 'edit', label: 'Редагувати' },
                                  { icon: 'refresh', label: 'Оновити статус' },
                                  { icon: 'cert', label: 'Видати сертифікат', disabled: p.status !== 'Completed', onClick: () => p.status === 'Completed' && navigate({ screen: 'certificates', programId: currentProgram.id }) },
                                  'divider',
                                  { icon: 'x', label: 'Виключити' },
                                ]}/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="t-caption">Показано 1–{filtered.length} з 47</div>
          <div className="row gap-4">
            <Button variant="ghost" size="sm" icon="chevLeft" disabled/>
            <Button variant="secondary" size="sm">1</Button>
            <Button variant="ghost" size="sm">2</Button>
            <Button variant="ghost" size="sm">3</Button>
            <Button variant="ghost" size="sm">4</Button>
            <Button variant="ghost" size="sm" icon="chevRight"/>
          </div>
        </div>
      </div>

      <Modal open={confirmFull} onClose={() => setConfirmFull(false)}
             title="Підтвердження: показати повні імена"
             footer={<>
               <Button variant="ghost" onClick={() => setConfirmFull(false)}>Скасувати</Button>
               <Button variant="primary" onClick={() => { setShowFull(true); setConfirmFull(false); toast('Повні імена відкрито — дію записано в журнал аудиту', 'warning'); }}>Показати повні імена</Button>
             </>}>
        <div className="rec-card warning mb-16">
          <div className="rec-icon"><Icon name="alert" size={16}/></div>
          <div>
            <div className="rec-title">Принцип мінімізації даних</div>
            <div className="rec-body">За замовчуванням прізвища учасників скорочено. Розкриття повних імен — це дія з персональними даними; її буде записано до журналу аудиту під вашим обліковим записом.</div>
          </div>
        </div>
        <div className="t-body text-secondary">Продовжуйте лише якщо вам справді потрібно ідентифікувати окремих учасників.</div>
      </Modal>

      <Modal open={addOpen} onClose={() => setAddOpen(false)}
             title="Додати учасника"
             footer={<>
               <Button variant="ghost" onClick={() => setAddOpen(false)}>Скасувати</Button>
               <Button variant="primary" icon="check" onClick={() => { setAddOpen(false); toast('Учасника додано — лист підтвердження надіслано', 'success'); }}>Додати учасника</Button>
             </>}>
        <div className="col gap-16">
          <div className="grid-2">
            <Field label="Повне ім\u02bcя" required><Input placeholder="напр. Анна Коваленко"/></Field>
            <Field label="Email" required><Input type="email" placeholder="a.kovalenko@example.edu"/></Field>
          </div>
          <div className="grid-2">
            <Field label="Дата народження"><Input type="date"/></Field>
            <Field label="Дата зарахування" required><Input type="date" defaultValue="2026-05-09"/></Field>
          </div>
          <Field label="Нотатки"><Textarea rows={3} placeholder="Внутрішні нотатки (необов\u02bcязково)…"/></Field>
          <div className="rec-card info">
            <div className="rec-icon"><Icon name="info" size={16}/></div>
            <div>
              <div className="rec-title">Підтвердження згоди</div>
              <div className="rec-body">Учаснику буде надіслано лист із повідомленням про обробку даних. Запис стане активним після підтвердження.</div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

Object.assign(window, { ParticipantsScreen });
