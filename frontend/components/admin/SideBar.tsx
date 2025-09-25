'use client';
import { useLogoutMutation } from '@/lib/api/useAuth';
import { useAuthStore } from '@/stores/auth.store';
import {
  Book,
  Briefcase,
  Heart,
  Home,
  LogOut,
  Mail,
  Menu,
  Presentation,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

// Define custom colors for Tailwind
const customColors = {
  rangitoto: '#1A3C34', // Dark teal
  albescentWhite: '#F8E8D6', // Light cream
  lemonGrass: '#A8B5A2', // Muted green
};

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAuthStore();
  const pathname = usePathname();
  const logoutMutation = useLogoutMutation();
  const [isTooltipVisible, setIsTooltipVisible] = useState<string | null>(null);

  const navItems = [
    { href: '/admin/', label: 'Dashboard', icon: Home },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/team', label: 'Team', icon: Users },
    {
      href: '/admin/presentations',
      label: 'Presentations',
      icon: Presentation,
    },
    { href: '/admin/impacts', label: 'Impacts', icon: Heart },
    { href: '/admin/blogs', label: 'Blogs', icon: Book },
    { href: '/admin/contact', label: 'Contact Messages', icon: Mail },
    { href: '/admin/users', label: 'Users', icon: Users },
  ];

  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success('Logged out successfully!');
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.error?.message || 'Logout failed.');
      },
    });
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-rangitoto text-white transition-all duration-300 ease-in-out shadow-lg ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}
      aria-expanded={isSidebarOpen}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="p-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-lemon-grass transition-colors"
            aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <div key={item.href} className="relative">
              <Link
                href={item.href}
                className={`flex items-center p-2 rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'bg-albescent-white text-rangitoto font-semibold'
                    : 'hover:bg-lemon-grass'
                }`}
                onMouseEnter={() =>
                  !isSidebarOpen && setIsTooltipVisible(item.label)
                }
                onMouseLeave={() => setIsTooltipVisible(null)}
                aria-label={item.label}
              >
                <item.icon
                  className={`h-5 w-5 ${isSidebarOpen ? 'mr-3' : ''}`}
                />
                {isSidebarOpen && <span>{item.label}</span>}
              </Link>
              {!isSidebarOpen && isTooltipVisible === item.label && (
                <span className="absolute left-16 bg-rangitoto text-white text-sm px-2 py-1 rounded shadow-md z-10">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Logout Button */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-lemon-grass/20">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 rounded-lg hover:bg-lemon-grass transition-colors"
              disabled={logoutMutation.isPending}
              aria-label="Log out"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>
                {logoutMutation.isPending ? 'Logging out...' : 'Log Out'}
              </span>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
