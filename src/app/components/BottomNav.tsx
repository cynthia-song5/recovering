import { Home, Activity, Radio, MessageCircle, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router';

export function BottomNav() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/vitals', label: 'Vitals', icon: Activity },
    { path: '/devices', label: 'Devices', icon: Radio },
    { path: '/circle', label: 'Circle', icon: MessageCircle },
    { path: '/tasks', label: 'Tasks', icon: Clock },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="flex justify-around items-center h-20 max-w-md mx-auto px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center gap-1 min-w-[60px]"
            >
              <Icon
                className={`w-6 h-6 ${active ? 'text-primary' : 'text-muted-foreground'}`}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-xs ${active ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              {active && <div className="w-1 h-1 rounded-full bg-primary mt-0.5" />}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
