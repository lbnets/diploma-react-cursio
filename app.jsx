// ============ APP SHELL ============
const NAV = [
  { key: 'dashboard',    label: 'Панель'       },
  { key: 'programs',     label: 'Програми'     },
  { key: 'participants', label: 'Учасники'     },
  { key: 'reports',      label: 'Звіти'        },
  { key: 'certificates', label: 'Сертифікати'  },
];

const TopBar = ({ route, navigate, onLogout }) => (
  <div className="topbar">
    <div className="brand">
      <div className="brand-mark">C</div>
      <span className="brand-name">Cursio</span>
    </div>
    <div className="nav">
      {NAV.map(n => (
        <button key={n.key} className={`nav-item ${route.screen === n.key || (n.key === 'dashboard' && route.screen === 'dashboard') ? 'active' : ''}`}
                onClick={() => navigate({ screen: n.key })}>
          {n.label}
        </button>
      ))}
    </div>
    <DropdownMenu
      trigger={
        <button className="user-trigger">
          <div className="avatar">EK</div>
          <div className="col" style={{ alignItems: 'flex-start', gap: 0 }}>
            <span className="user-name">Олена Ковач</span>
            <span className="user-role">Менеджер програм</span>
          </div>
          <Icon name="chevDown" size={14}/>
        </button>
      }
      items={[
        { icon: 'eye', label: 'Переглянути профіль' },
        { icon: 'settings', label: 'Налаштування облікового запису' },
        { icon: 'download', label: 'Експорт даних' },
        'divider',
        { icon: 'logout', label: 'Вийти', onClick: onLogout },
      ]}
    />
  </div>
);

// ============ MAIN APP ============
const App = () => {
  const [authed, setAuthed] = React.useState(false);
  const [role, setRole] = React.useState('manager');
  const [route, setRoute] = React.useState({ screen: 'dashboard' });
  const navigate = (r) => {
    setRoute(r);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (!authed) {
    return (
      <ToastHost>
        <LoginScreen onLogin={({ role: r } = {}) => { setRole(r || 'manager'); setAuthed(true); setRoute({ screen: 'dashboard' }); }}/>
      </ToastHost>
    );
  }

  if (role === 'learner') {
    return (
      <ToastHost>
        <LearnerApp onLogout={() => setAuthed(false)}/>
      </ToastHost>
    );
  }

  return (
    <ToastHost>
      <div className="app">
        <TopBar route={route} navigate={navigate} onLogout={() => setAuthed(false)}/>
        <div className="main">
          {route.screen === 'dashboard'    && <DashboardScreen navigate={navigate}/>}
          {route.screen === 'programs'     && <ProgramsListScreen navigate={navigate} programId={route.programId}/>}
          {route.screen === 'create'       && <CreateProgramScreen navigate={navigate}/>}
          {route.screen === 'builder'      && <BuilderScreen navigate={navigate} programId={route.programId}/>}
          {route.screen === 'participants' && <ParticipantsScreen navigate={navigate} programId={route.programId}/>}
          {route.screen === 'metrics'      && <MetricsScreen navigate={navigate} programId={route.programId}/>}
          {route.screen === 'reports'      && <ReportScreen navigate={navigate} programId={route.programId}/>}
          {route.screen === 'certificates' && <CertificatesScreen navigate={navigate} programId={route.programId}/>}
        </div>
      </div>
    </ToastHost>
  );
};

Object.assign(window, { App });
export default App;
