// ============ SCREEN 2: CREATE PROGRAM ============
const CreateProgramScreen = ({ navigate }) => {
  const toast = useToast();
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    title: '', code: 'MC-2026-013', credits: 5, weeks: 8, language: 'Англійська',
    description: '',
    modules: [
      { id: 1, title: '', credits: 1, hours: 8 },
      { id: 2, title: '', credits: 1, hours: 12 },
      { id: 3, title: '', credits: 1, hours: 12 },
    ],
    minP: 15, maxP: 60, prereqs: ['Ступінь бакалавра', 'Англійська B2'],
    persona: 'Працюючі фахівці',
    eu: false, internal: false, gdpr: false,
  });
  const [errors, setErrors] = React.useState({});
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const validateStep = () => {
    const e = {};
    if (step === 1) {
      if (!data.title.trim()) e.title = 'Назва програми обов\u02bcязкова';
      if (data.credits < 1 || data.credits > 30) e.credits = 'Кількість ECTS має бути від 1 до 30';
      if (data.description.length > 500) e.description = 'Максимум 500 символів';
    }
    if (step === 2) {
      if (data.modules.filter(m => m.title.trim()).length < 1) e.modules = 'Додайте принаймні один модуль із назвою';
    }
    if (step === 3) {
      if (data.minP > data.maxP) e.minP = 'Мінімум не може перевищувати максимум';
    }
    if (step === 4) {
      if (!data.eu || !data.internal || !data.gdpr) e.compliance = 'Усі пункти відповідності мають бути підтверджені';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => Math.min(4, s + 1)); };
  const submit = () => {
    if (!validateStep()) return;
    toast(`Програму "${data.title || 'Без назви'}" подано на затвердження`, 'success');
    setTimeout(() => navigate({ screen: 'dashboard' }), 700);
  };

  const STEPS = [
    { n: 1, label: 'Загальні відомості' },
    { n: 2, label: 'Модулі' },
    { n: 3, label: 'Цільова аудиторія' },
    { n: 4, label: 'Відповідність' },
  ];

  return (
    <>
      <div className="page-header">
        <Breadcrumbs items={[
          { label: 'Панель', to: { screen: 'dashboard' } },
          { label: 'Програми',  to: { screen: 'programs' } },
          { label: 'Нова програма' },
        ]} onNavigate={navigate}/>
        <div className="page-title-row">
          <div>
            <h1 className="t-display">Створення мікрокредитної програми</h1>
            <div className="page-subtitle">Опис нової програми · мікрокваліфікація з ECTS-кредитами</div>
          </div>
          <div className="row gap-8">
            <Button variant="ghost" onClick={() => navigate({ screen: 'dashboard' })}>Скасувати</Button>
            <Button variant="secondary" icon="file" onClick={() => toast('Чернетку збережено', 'success')}>Зберегти чернетку</Button>
          </div>
        </div>
      </div>

      <div className="stepper mb-24">
        {STEPS.map(s => (
          <div key={s.n} className={`step ${step === s.n ? 'active' : step > s.n ? 'done' : ''}`} onClick={() => setStep(s.n)}>
            <div className="step-num">{step > s.n ? <Icon name="check" size={11} stroke={3}/> : s.n}</div>
            <div className="step-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-body" style={{ padding: 28 }}>
          {step === 1 && <StepBasic data={data} set={set} errors={errors}/>}
          {step === 2 && <StepModules data={data} set={set} errors={errors}/>}
          {step === 3 && <StepAudience data={data} set={set} errors={errors}/>}
          {step === 4 && <StepCompliance data={data} set={set} errors={errors}/>}
        </div>
        <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="ghost" icon="chevLeft" disabled={step === 1} onClick={() => setStep(s => s - 1)}>Назад</Button>
          <div className="t-caption">Крок {step} з 4</div>
          {step < 4
            ? <Button variant="primary" iconRight="chevRight" onClick={next}>Далі</Button>
            : <Button variant="primary" icon="check" onClick={submit}>Подати на затвердження</Button>}
        </div>
      </div>
    </>
  );
};

const StepBasic = ({ data, set, errors }) => (
  <div className="col gap-20">
    <div className="t-subhead mb-8">Загальні відомості</div>
    <div className="grid-2">
      <Field label="Назва програми" required error={errors.title}>
        <Input placeholder="напр. Аналітика даних для освітян" value={data.title} onChange={e => set('title', e.target.value)} error={errors.title}/>
      </Field>
      <Field label="Код програми" helper="Згенеровано автоматично; можна редагувати">
        <Input value={data.code} className="mono" onChange={e => set('code', e.target.value)}/>
      </Field>
    </div>
    <div className="grid-3">
      <Field label="ECTS-кредити" required error={errors.credits}>
        <Input type="number" min="1" max="30" value={data.credits} onChange={e => set('credits', +e.target.value)} error={errors.credits}/>
      </Field>
      <Field label="Тривалість (тижні)">
        <Input type="number" min="1" value={data.weeks} onChange={e => set('weeks', +e.target.value)}/>
      </Field>
      <Field label="Мова викладання">
        <Select value={data.language} onChange={e => set('language', e.target.value)}>
          <option>Англійська</option><option>Українська</option><option>Інша</option>
        </Select>
      </Field>
    </div>
    <Field label="Стислий опис" helper={`${data.description.length} / 500 символів`} error={errors.description}>
      <Textarea rows={5} placeholder="Окресліть цілі, очікувані результати та ключові продукти…" value={data.description}
                onChange={e => set('description', e.target.value.slice(0, 600))} error={errors.description}/>
    </Field>
  </div>
);

const StepModules = ({ data, set, errors }) => {
  const update = (i, k, v) => { const m = [...data.modules]; m[i] = { ...m[i], [k]: v }; set('modules', m); };
  const add = () => set('modules', [...data.modules, { id: Date.now(), title: '', credits: 1, hours: 8 }]);
  const remove = (i) => set('modules', data.modules.filter((_, j) => j !== i));
  return (
    <div className="col gap-20">
      <div>
        <div className="t-subhead">Модулі</div>
        <div className="t-caption">Перетягуйте для зміни порядку. Кожен модуль додає кредити та академічні години до загального обсягу програми.</div>
      </div>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '24px 1fr 110px 110px 36px', gap: 10, padding: '0 12px 6px', color: 'var(--text-secondary)', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          <span></span><span>Назва модуля</span><span>Кредити</span><span>Години</span><span></span>
        </div>
        {data.modules.map((m, i) => (
          <div key={m.id} className="module-row">
            <span className="drag-handle"><Icon name="drag" size={14}/></span>
            <input className="input" placeholder={`Модуль ${i + 1} — назва…`} value={m.title} onChange={e => update(i, 'title', e.target.value)} style={{ height: 32 }}/>
            <input className="input tabular" type="number" min="0" step="0.5" value={m.credits} onChange={e => update(i, 'credits', +e.target.value)} style={{ height: 32 }}/>
            <input className="input tabular" type="number" min="0" value={m.hours} onChange={e => update(i, 'hours', +e.target.value)} style={{ height: 32 }}/>
            <button className="btn btn-ghost btn-sm btn-icon" onClick={() => remove(i)}><Icon name="trash" size={13}/></button>
          </div>
        ))}
      </div>
      {errors.modules && <span className="field-error"><Icon name="alert" size={11}/> {errors.modules}</span>}
      <Button variant="secondary" icon="plus" size="sm" onClick={add} style={{ alignSelf: 'flex-start' }}>Додати модуль</Button>
      <div className="row gap-24 t-caption" style={{ paddingTop: 8, borderTop: '1px dashed var(--border)' }}>
        <span>Модулів: <strong className="tabular" style={{color:'var(--text)'}}>{data.modules.length}</strong></span>
        <span>Усього кредитів: <strong className="tabular" style={{color:'var(--text)'}}>{data.modules.reduce((s,m)=>s+(+m.credits||0), 0)}</strong></span>
        <span>Усього годин: <strong className="tabular" style={{color:'var(--text)'}}>{data.modules.reduce((s,m)=>s+(+m.hours||0), 0)}</strong></span>
      </div>
    </div>
  );
};

const StepAudience = ({ data, set, errors }) => {
  const removeTag = (t) => set('prereqs', data.prereqs.filter(x => x !== t));
  const [newTag, setNewTag] = React.useState('');
  const addTag = () => { if (newTag.trim()) { set('prereqs', [...data.prereqs, newTag.trim()]); setNewTag(''); } };
  return (
    <div className="col gap-20">
      <div className="t-subhead mb-8">Цільова аудиторія</div>
      <div className="grid-2">
        <Field label="Мінімальна кількість учасників" required error={errors.minP}>
          <Input type="number" min="1" value={data.minP} onChange={e => set('minP', +e.target.value)} error={errors.minP}/>
        </Field>
        <Field label="Максимальна кількість учасників">
          <Input type="number" min="1" value={data.maxP} onChange={e => set('maxP', +e.target.value)}/>
        </Field>
      </div>
      <Field label="Передумови" helper="Натисніть Enter, щоб додати тег">
        <div className="input" style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: 6, height: 'auto', minHeight: 38 }}>
          {data.prereqs.map(t => (
            <span key={t} className="chip">{t}<button onClick={() => removeTag(t)}><Icon name="x" size={11}/></button></span>
          ))}
          <input style={{ flex: 1, minWidth: 120, border: 'none', outline: 'none', fontSize: 13, fontFamily: 'inherit' }}
                 placeholder={data.prereqs.length ? '' : 'Додати передумову…'}
                 value={newTag} onChange={e => setNewTag(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTag())}/>
        </div>
      </Field>
      <Field label="Цільова персона">
        <div className="col gap-8" style={{ marginTop: 4 }}>
          {['Працюючі фахівці', 'Випускники', 'Іноземні студенти'].map(opt => (
            <Check key={opt} type="radio" label={opt} checked={data.persona === opt} onChange={() => set('persona', opt)}/>
          ))}
        </div>
      </Field>
    </div>
  );
};

const StepCompliance = ({ data, set, errors }) => (
  <div className="col gap-20">
    <div className="t-subhead mb-8">Відповідність</div>
    <div className="card" style={{ background: 'var(--bg)', boxShadow: 'none' }}>
      <div className="card-body col gap-16">
        <Check checked={data.eu} onChange={v => set('eu', v)}
               label={<span><strong>Рекомендація Ради ЄС 2022</strong><div className="t-caption">Підхід до мікрокваліфікацій для навчання впродовж життя</div></span>}/>
        <div className="divider"/>
        <Check checked={data.internal} onChange={v => set('internal', v)}
               label={<span><strong>Внутрішні положення університету</strong><div className="t-caption">Рамка для негардеміальних кваліфікацій</div></span>}/>
        <div className="divider"/>
        <Check checked={data.gdpr} onChange={v => set('gdpr', v)}
               label={<span><strong>Згода на обробку даних</strong><div className="t-caption">Псевдонімізація, правові підстави, термін зберігання</div></span>}/>
      </div>
    </div>
    <div className="rec-card info">
      <div className="rec-icon"><Icon name="info" size={16}/></div>
      <div>
        <div className="rec-title">Внутрішній стандарт якості</div>
        <div className="rec-body">Програму буде оцінено за критеріями: функціональна придатність, ефективність, зручність користування та супровід.</div>
      </div>
    </div>
    {errors.compliance && <span className="field-error"><Icon name="alert" size={11}/> {errors.compliance}</span>}
  </div>
);

Object.assign(window, { CreateProgramScreen });
