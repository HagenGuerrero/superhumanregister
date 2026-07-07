import type { CSSProperties, ReactNode } from "react";

export interface SidebarProps {
  collapsed: boolean;
  onToggleCollapsed: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  activeView: "index" | "detail" | "messages" | "profile";
  onGoToHeroes: () => void;
  onGoToMessages: () => void;
  onGoToProfile: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

interface IconProps {
  style?: CSSProperties;
}

function HomeIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
    </svg>
  );
}

function UsersIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="8.5" cy="8" r="3" />
      <path d="M2.5 20c.6-3.4 3-5.2 6-5.2s5.4 1.8 6 5.2" />
      <circle cx="17" cy="8.5" r="2.3" />
      <path d="M15.7 14.9c2.3.5 3.9 2.2 4.4 5.1" />
    </svg>
  );
}

function MessageIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M3.5 5.5h17a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9.5L4.5 21v-3.5H3.5a1 1 0 0 1-1-1v-10a1 1 0 0 1 1-1Z" />
    </svg>
  );
}

function BellIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M6 9.5a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5h-15S6 13.5 6 9.5Z" />
      <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

function UserIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="8.2" r="3.4" />
      <path d="M4.8 20c.9-4 3.7-6.1 7.2-6.1s6.3 2.1 7.2 6.1" />
    </svg>
  );
}

function SunIcon({ style }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  );
}

function MoonIcon({ style }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </svg>
  );
}

function ChevronIcon({ style }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={style}>
      <path d="M14.5 5 8 12l6.5 7" />
    </svg>
  );
}

function XIcon({ style }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" style={style}>
      <path d="M5 5l14 14M19 5 5 19" />
    </svg>
  );
}

export function MenuIcon({ style }: IconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" style={style}>
      <path d="M3.5 6.5h17M3.5 12h17M3.5 17.5h17" />
    </svg>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  collapsed: boolean;
  active?: boolean;
  primary?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, collapsed, active, primary, onClick }: NavItemProps) {
  return (
    <button
      type="button"
      className={`sidebar-nav-item${active ? " is-active" : ""}${primary ? " is-primary" : ""}`}
      onClick={onClick}
      title={collapsed ? label : undefined}
      aria-current={active ? "page" : undefined}
    >
      <span className="sidebar-nav-icon">{icon}</span>
      <span className="sidebar-nav-label">{label}</span>
    </button>
  );
}

function DarkModeToggle({ collapsed, on, onToggle }: { collapsed: boolean; on: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      className={`sidebar-nav-item sidebar-darkmode${on ? " is-on" : ""}`}
      onClick={onToggle}
      title={collapsed ? "Dark mode" : undefined}
      aria-pressed={on}
    >
      <span className="sidebar-nav-icon">{on ? <MoonIcon /> : <SunIcon />}</span>
      <span className="sidebar-nav-label">Dark mode</span>
      <span className="sidebar-switch" aria-hidden="true">
        <span className="sidebar-switch-knob" />
      </span>
    </button>
  );
}

export default function Sidebar({ collapsed, onToggleCollapsed, mobileOpen, onCloseMobile, activeView, onGoToHeroes, onGoToMessages, onGoToProfile, darkMode, onToggleDarkMode }: SidebarProps) {
  return (
    <>
      <div className="sidebar-backdrop" data-open={mobileOpen} onClick={onCloseMobile} />
      <aside className="sidebar" data-collapsed={collapsed} data-mobile-open={mobileOpen} aria-label="Main navigation">
        <div className="sidebar-header">
          <span className="sidebar-mark">The Register</span>
          <button
            type="button"
            className="sidebar-icon-btn sidebar-collapse-btn"
            onClick={onToggleCollapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <ChevronIcon style={{ transform: collapsed ? "rotate(180deg)" : "none" }} />
          </button>
          <button type="button" className="sidebar-icon-btn sidebar-close-btn" onClick={onCloseMobile} aria-label="Close menu">
            <XIcon />
          </button>
        </div>

        <nav className="sidebar-nav" aria-label="Primary">
          <NavItem icon={<HomeIcon />} label="Heroes" collapsed={collapsed} active={activeView === "index"} primary onClick={onGoToHeroes} />
          <div className="sidebar-divider" />
          <NavItem icon={<UsersIcon />} label="Friends" collapsed={collapsed} />
          <NavItem icon={<MessageIcon />} label="Messages" collapsed={collapsed} active={activeView === "messages"} onClick={onGoToMessages} />
          <NavItem icon={<BellIcon />} label="Notifications" collapsed={collapsed} />
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-divider" />
          <NavItem icon={<UserIcon />} label="Profile" collapsed={collapsed} active={activeView === "profile"} primary onClick={onGoToProfile} />
          <DarkModeToggle collapsed={collapsed} on={darkMode} onToggle={onToggleDarkMode} />
        </div>
      </aside>
    </>
  );
}
