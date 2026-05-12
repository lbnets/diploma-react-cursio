// ============ LOGIN SCREEN ============
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = React.useState('o.kovach@lpnu.ua');
  const [password, setPassword] = React.useState('••••••••');
  const [remember, setRemember] = React.useState(true);
  const [role, setRole] = React.useState('manager');
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({});

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!email.includes('@')) errs.email = 'Введіть коректну електронну пошту';
    if (!password || password.length < 4) errs.password = 'Пароль занадто короткий';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => onLogin({ email, role }), 700);
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <div className="login-brand">
          <div className="brand-mark" style={{ width: 36, height: 36, fontSize: 16, borderRadius: 10 }}>C</div>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Cursio</span>
        </div>

        <div className="login-card">
          <div style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 6 }}>Вхід до системи</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
              Увійдіть, щоб керувати мікрокредитними програмами вашого підрозділу.
            </p>
          </div>

          <form onSubmit={submit} className="col gap-16">
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 500, marginBottom: 6, color: 'var(--text-secondary)' }}>Я входжу як</label>
              <div className="seg" style={{ width: '100%' }}>
                <button type="button" className={role === 'manager' ? 'active' : ''} onClick={() => setRole('manager')} style={{ flex: 1 }}>Менеджер програм</button>
                <button type="button" className={role === 'learner' ? 'active' : ''} onClick={() => setRole('learner')} style={{ flex: 1 }}>Учасник</button>
              </div>
            </div>

            <Field label="Електронна пошта" error={errors.email}>
              <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="i.prizvysche@lpnu.ua" autoComplete="email"/>
            </Field>

            <Field label="Пароль" error={errors.password}>
              <input className="input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" autoComplete="current-password"/>
            </Field>

            <div className="row" style={{ justifyContent: 'space-between' }}>
              <Check checked={remember} onChange={setRemember} label="Запам'ятати мене на цьому пристрої"/>
              <a className="link-muted" onClick={(e) => e.preventDefault()} href="#" style={{ fontSize: 13 }}>Забули пароль?</a>
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Вхід…' : 'Увійти'}
            </button>

            <div className="login-divider"><span>або</span></div>

            <button type="button" className="btn btn-secondary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={() => onLogin({ email: 'sso@lpnu.ua', role })}>
              <Icon name="checkCircle" size={16}/> Увійти через університетську пошту
            </button>
          </form>

          <p style={{ marginTop: 22, fontSize: 12.5, color: 'var(--text-muted)', textAlign: 'center' }}>
            Немає облікового запису? Зверніться до адміністратора підрозділу.
          </p>
        </div>

        <div className="login-foot">
          <span>© 2026 Cursio · Львівська політехніка</span>
          <div className="row gap-12">
            <a className="link-muted" href="#" onClick={e => e.preventDefault()}>Підтримка</a>
            <a className="link-muted" href="#" onClick={e => e.preventDefault()}>Конфіденційність</a>
          </div>
        </div>
      </div>

      <div className="login-right">
        <div className="login-art">
          <div className="login-quote">
            <div className="login-eyebrow">Cursio · Decision Support</div>
            <h2>Прозоре управління портфелем мікрокредитних програм</h2>
            <p>Аналітика ефективності, рекомендації щодо рішень, реєстр учасників та автоматична видача сертифікатів — у одному місці.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { LoginScreen });
