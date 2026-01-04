import { GilectRoot, GlassPane, GlassButton } from "gilect";
import "./App.css";

// Mock Data
const stats = [
  { label: "Total Revenue", value: "$42,000", delta: "+12%" },
  { label: "Active Users", value: "1,234", delta: "+5%" },
  { label: "New Leads", value: "42", delta: "-2%" },
  { label: "Conversion", value: "3.2%", delta: "+0.1%" },
];

function App() {
  return (
    <GilectRoot renderBackground={true}>
      <div className="crm-dashboard">
        {/* Sidebar */}
        <GlassPane className="sidebar">
          <div className="logo">💎 GILECT CRM</div>
          <nav>
            <button className="nav-item active">Dashboard</button>
            <button className="nav-item">Contacts</button>
            <button className="nav-item">Deals</button>
            <button className="nav-item">Analytics</button>
            <button className="nav-item">Settings</button>
          </nav>
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="info">
              <div className="name">John Doe</div>
              <div className="role">Admin</div>
            </div>
          </div>
        </GlassPane>

        {/* Main Content */}
        <div className="main-content">
          <header>
            <h1>Dashboard Overview (DEBUG V2)</h1>
            <GlassButton className="action-btn">
              <span>+</span> New Campaign
            </GlassButton>
          </header>

          {/* Stats Grid */}
          <div className="stats-grid">
            {stats.map((stat) => (
              <GlassPane key={stat.label} className="stat-card">
                <div className="stat-label">{stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div
                  className={`stat-delta ${
                    stat.delta.startsWith("+") ? "positive" : "negative"
                  }`}
                >
                  {stat.delta} from last month
                </div>
              </GlassPane>
            ))}
          </div>

          {/* Charts / Activity Area */}
          <div className="content-split">
            <GlassPane className="chart-panel">
              <div className="panel-header">
                <h3>Revenue Growth</h3>
                <button
                  className="glass-btn-override"
                  style={{ fontSize: "0.8rem", padding: "4px 8px" }}
                >
                  Yearly
                </button>
              </div>
              <div className="chart-placeholder">
                {/* SVG Line Chart Simulator */}
                <svg width="100%" height="200" viewBox="0 0 500 200">
                  <path
                    d="M0,150 C50,100 100,180 150,120 C200,60 250,140 300,80 C350,20 400,100 450,50 L500,150 L500,200 L0,200 Z"
                    fill="rgba(255,255,255,0.1)"
                  />
                  <path
                    d="M0,150 C50,100 100,180 150,120 C200,60 250,140 300,80 C350,20 400,100 450,50"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                  />
                </svg>
              </div>
            </GlassPane>

            <GlassPane className="activity-panel">
              <h3>Recent Activity</h3>
              <ul
                className="activity-list"
                style={{ overflowY: "auto", maxHeight: "300px" }}
              >
                <li>
                  <span className="dot"></span> New lead:{" "}
                  <strong>Tesla Inc.</strong>
                </li>
                <li>
                  <span className="dot"></span> Contract signed:{" "}
                  <strong>SpaceX</strong>
                </li>
                <li>
                  <span className="dot"></span> Invoice #1024 paid
                </li>
                <li>
                  <span className="dot"></span> Meeting scheduled:{" "}
                  <strong>Apple</strong>
                </li>
                <li>
                  <span className="dot"></span> Project Update:{" "}
                  <strong>Alpha Protocol</strong>
                </li>
                <li>
                  <span className="dot"></span> User Feedback:{" "}
                  <strong>Positive</strong>
                </li>
                <li>
                  <span className="dot"></span> Server Alert:{" "}
                  <strong>Resolved</strong>
                </li>
                <li>
                  <span className="dot"></span> New Hire:{" "}
                  <strong>Design Lead</strong>
                </li>
                <li>
                  <span className="dot"></span> Quarterly Review:{" "}
                  <strong>Prepared</strong>
                </li>
                <li>
                  <span className="dot"></span> Client Call:{" "}
                  <strong>Amazon</strong>
                </li>
                <li>
                  <span className="dot"></span> System Backup:{" "}
                  <strong>Complete</strong>
                </li>
                <li>
                  <span className="dot"></span> Deployment:{" "}
                  <strong>v2.1.0</strong>
                </li>
                <li>
                  <span className="dot"></span> New lead:{" "}
                  <strong>Google</strong>
                </li>
                <li>
                  <span className="dot"></span> Contract Renewal:{" "}
                  <strong>Microsoft</strong>
                </li>
              </ul>
            </GlassPane>
          </div>

          {/* Extra Content to Force Main Scroll */}
          <h3 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
            Detailed Performance Metrics
          </h3>
          <div className="stats-grid">
            {stats.map((stat) => (
              <GlassPane key={stat.label + "2"} className="stat-card">
                <div className="stat-label">Regional {stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-delta">North America</div>
              </GlassPane>
            ))}
            {stats.map((stat) => (
              <GlassPane key={stat.label + "3"} className="stat-card">
                <div className="stat-label">Global {stat.label}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-delta">Europe</div>
              </GlassPane>
            ))}
            <GlassPane className="stat-card">
              <div className="stat-label">System Uptime</div>
              <div className="stat-value">99.99%</div>
              <div className="stat-delta positive">Stable</div>
            </GlassPane>
            <GlassPane className="stat-card">
              <div className="stat-label">Active Sessions</div>
              <div className="stat-value">842</div>
              <div className="stat-delta">+12%</div>
            </GlassPane>
            <GlassPane className="stat-card">
              <div className="stat-label">Server Load</div>
              <div className="stat-value">42%</div>
              <div className="stat-delta positive">Optimal</div>
            </GlassPane>
            <GlassPane className="stat-card">
              <div className="stat-label">Memory Usage</div>
              <div className="stat-value">1.2GB</div>
              <div className="stat-delta">Normal</div>
            </GlassPane>
          </div>
        </div>
      </div>
    </GilectRoot>
  );
}

export default App;
