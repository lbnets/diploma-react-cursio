// ============ ICONS ============
const Icon = ({ name, size = 16, stroke = 2 }) => {
  const paths = {
    home: <><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V9.5z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    users: <><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></>,
    chart: <><path d="M3 3v18h18"/><rect x="7" y="12" width="3" height="6"/><rect x="12" y="8" width="3" height="10"/><rect x="17" y="5" width="3" height="13"/></>,
    cert: <><circle cx="12" cy="9" r="6"/><path d="M8.21 13.89L7 22l5-3 5 3-1.21-8.11"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
    filter: <><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></>,
    chevDown: <><polyline points="6 9 12 15 18 9"/></>,
    chevRight: <><polyline points="9 18 15 12 9 6"/></>,
    chevLeft: <><polyline points="15 18 9 12 15 6"/></>,
    arrowUp: <><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></>,
    arrowDown: <><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></>,
    arrowRight: <><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>,
    check: <><polyline points="20 6 9 17 4 12"/></>,
    checkCircle: <><circle cx="12" cy="12" r="10"/><polyline points="9 12 12 15 16 10"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>,
    xCircle: <><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    alert: <><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>,
    info: <><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>,
    bulb: <><path d="M9 18h6M10 22h4M12 2a7 7 0 00-4 12.74V17h8v-2.26A7 7 0 0012 2z"/></>,
    download: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>,
    upload: <><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></>,
    share: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
    edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
    trash: <><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/></>,
    more: <><circle cx="12" cy="12" r="1.5" fill="currentColor"/><circle cx="5" cy="12" r="1.5" fill="currentColor"/><circle cx="19" cy="12" r="1.5" fill="currentColor"/></>,
    drag: <><circle cx="9" cy="6" r="1" fill="currentColor"/><circle cx="9" cy="12" r="1" fill="currentColor"/><circle cx="9" cy="18" r="1" fill="currentColor"/><circle cx="15" cy="6" r="1" fill="currentColor"/><circle cx="15" cy="12" r="1" fill="currentColor"/><circle cx="15" cy="18" r="1" fill="currentColor"/></>,
    logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></>,
    qr: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><line x1="14" y1="14" x2="14" y2="17"/><line x1="17" y1="14" x2="20" y2="14"/><line x1="14" y1="20" x2="17" y2="20"/><line x1="20" y1="17" x2="20" y2="20"/></>,
    book: <><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/></>,
    refresh: <><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>,
    calendar: <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>,
    clock: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    file: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></>,
    sparkles: <><path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2zM19 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM5 14l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={{flex: 'none'}}>
      {paths[name]}
    </svg>
  );
};

// ============ BUTTON ============
const Button = ({ variant = 'secondary', size = 'md', icon, iconRight, children, ...rest }) => (
  <button className={`btn btn-${variant} ${size === 'sm' ? 'btn-sm' : size === 'lg' ? 'btn-lg' : ''} ${!children ? 'btn-icon' : ''}`} {...rest}>
    {icon && <Icon name={icon} size={size === 'sm' ? 13 : 15}/>}
    {children}
    {iconRight && <Icon name={iconRight} size={size === 'sm' ? 13 : 15}/>}
  </button>
);

// ============ FIELD ============
const Field = ({ label, required, helper, error, children }) => (
  <label className="field">
    {label && <span className="field-label">{label}{required && <span className="req">*</span>}</span>}
    {children}
    {error ? <span className="field-error"><Icon name="alert" size={11}/> {error}</span> :
     helper ? <span className="field-helper">{helper}</span> : null}
  </label>
);
const Input = ({ error, ...rest }) => <input className={`input ${error ? 'has-error' : ''}`} {...rest}/>;
const Select = ({ children, error, ...rest }) => <select className={`select ${error ? 'has-error' : ''}`} {...rest}>{children}</select>;
const Textarea = ({ error, ...rest }) => <textarea className={`textarea ${error ? 'has-error' : ''}`} {...rest}/>;

// ============ CHECKBOX/RADIO ============
const Check = ({ checked, onChange, label, type = 'checkbox' }) => (
  <label className="check">
    <input type={type} checked={checked} onChange={e => onChange && onChange(e.target.checked)}/>
    <span className={`check-box ${type === 'radio' ? 'radio-circle' : ''}`}>
      {type !== 'radio' && <Icon name="check" size={12} stroke={3}/>}
    </span>
    {label && <span>{label}</span>}
  </label>
);

// ============ BADGE ============
const Badge = ({ tone = 'neutral', dot, icon, children }) => (
  <span className={`badge badge-${tone}`}>
    {dot && <span className="badge-dot"/>}
    {icon && <Icon name={icon} size={11}/>}
    {children}
  </span>
);
const StatusBadge = ({ status }) => {
  const map = {
    'Active':    { tone: 'info',    icon: 'clock', label: 'Активна' },
    'Completed': { tone: 'success', icon: 'check', label: 'Завершена' },
    'At Risk':   { tone: 'warning', icon: 'alert', label: 'Під загрозою' },
    'Withdrawn': { tone: 'danger',  icon: 'x',     label: 'Скасований' },
    'Planning':  { tone: 'neutral', icon: 'edit',  label: 'Планування' },
  };
  const m = map[status] || { tone: 'neutral', label: status };
  return <Badge tone={m.tone} icon={m.icon}>{m.label}</Badge>;
};

// ============ PROGRESS ============
const Progress = ({ value, tone, width }) => {
  const pct = Math.max(0, Math.min(100, value));
  const t = tone || (pct >= 75 ? 'success' : pct >= 50 ? 'warning' : 'danger');
  return (
    <div className={`progress ${t}`} style={width ? { width } : undefined}>
      <div className="progress-fill" style={{ width: `${pct}%` }}/>
    </div>
  );
};
const ProgressMini = ({ value, total }) => (
  <div className="progress-mini">
    <Progress value={(value/total)*100}/>
    <span className="progress-text tabular">{value}/{total}</span>
  </div>
);

// ============ BREADCRUMBS ============
const Breadcrumbs = ({ items, onNavigate }) => (
  <div className="breadcrumbs">
    {items.map((it, i) => (
      <React.Fragment key={i}>
        {i > 0 && <span className="crumb-sep">/</span>}
        {i === items.length - 1
          ? <span className="crumb-current">{it.label}</span>
          : <a onClick={() => onNavigate && it.to && onNavigate(it.to)}>{it.label}</a>}
      </React.Fragment>
    ))}
  </div>
);

// ============ MODAL ============
const Modal = ({ open, onClose, title, children, footer, width }) => {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={width ? { maxWidth: width } : undefined} onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">{title}</div>
          <Button variant="ghost" size="sm" icon="x" onClick={onClose}/>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

// ============ TOAST ============
const ToastContext = React.createContext(null);
const ToastHost = ({ children }) => {
  const [toasts, setToasts] = React.useState([]);
  const push = React.useCallback((msg, tone = 'default') => {
    const id = Math.random().toString(36).slice(2);
    setToasts(t => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="toast-host">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.tone}`}>
            {t.tone === 'success' && <Icon name="checkCircle" size={16}/>}
            {t.tone === 'warning' && <Icon name="alert" size={16}/>}
            {t.tone === 'danger' && <Icon name="xCircle" size={16}/>}
            {t.tone === 'default' && <Icon name="info" size={16}/>}
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
const useToast = () => React.useContext(ToastContext);

// ============ TABS ============
const Tabs = ({ tabs, value, onChange }) => (
  <div className="tabs">
    {tabs.map(t => (
      <button key={t.value} className={`tab ${value === t.value ? 'active' : ''}`} onClick={() => onChange(t.value)}>
        {t.label}{t.count != null && <span className="text-muted"> ({t.count})</span>}
      </button>
    ))}
  </div>
);

// ============ STARS ============
const StarRating = ({ value, onChange, size = 22 }) => (
  <div className="stars">
    {[1,2,3,4,5].map(i => (
      <svg key={i} className={`star ${i <= value ? 'filled' : ''}`} width={size} height={size}
           viewBox="0 0 24 24" fill={i <= value ? 'currentColor' : 'none'}
           stroke="currentColor" strokeWidth={1.6} strokeLinejoin="round"
           onClick={() => onChange && onChange(i)}>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ))}
  </div>
);

// ============ DROPDOWN MENU ============
const DropdownMenu = ({ trigger, items }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    const f = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', f);
    return () => document.removeEventListener('mousedown', f);
  }, []);
  return (
    <div className="user-menu" ref={ref}>
      <div onClick={() => setOpen(!open)}>{trigger}</div>
      {open && (
        <div className="dropdown">
          {items.map((it, i) => it === 'divider'
            ? <div key={i} className="dropdown-divider"/>
            : <div key={i} className="dropdown-item" onClick={() => { setOpen(false); it.onClick && it.onClick(); }}>
                {it.icon && <Icon name={it.icon} size={14}/>}{it.label}
                {it.disabled && <span className="text-muted" style={{marginLeft:'auto',fontSize:11}}>N/A</span>}
              </div>)}
        </div>
      )}
    </div>
  );
};

// ============ EMPTY STATE ============
const EmptyState = ({ icon = 'file', title, body, action }) => (
  <div className="empty-state">
    <div className="empty-icon"><Icon name={icon} size={24}/></div>
    <div className="t-subhead" style={{color:'var(--text)',marginBottom:6}}>{title}</div>
    <div style={{maxWidth:320,margin:'0 auto'}}>{body}</div>
    {action && <div style={{marginTop:16}}>{action}</div>}
  </div>
);

// ============ CIRCULAR PROGRESS ============
const Circular = ({ value, max = 100, label, sublabel }) => {
  const r = 76, c = 2 * Math.PI * r;
  const pct = value / max;
  const off = c * (1 - pct);
  const tone = pct >= 0.75 ? '#10B981' : pct >= 0.5 ? '#F59E0B' : '#EF4444';
  return (
    <div className="circ-wrap">
      <svg width="180" height="180" viewBox="0 0 180 180">
        <circle className="circ-bg" cx="90" cy="90" r={r}/>
        <circle className="circ-fg" cx="90" cy="90" r={r} stroke={tone} strokeDasharray={c} strokeDashoffset={off}/>
      </svg>
      <div className="circ-text">
        <div className="num">{label || value}</div>
        <div className="denom">{sublabel || `of ${max}`}</div>
      </div>
    </div>
  );
};

// ============ EXPORTS ============
Object.assign(window, {
  Icon, Button, Field, Input, Select, Textarea, Check, Badge, StatusBadge,
  Progress, ProgressMini, Breadcrumbs, Modal, ToastHost, useToast, Tabs,
  StarRating, DropdownMenu, EmptyState, Circular,
});
