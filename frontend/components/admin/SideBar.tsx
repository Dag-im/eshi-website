'use client';
import { useAuthStore } from '@/stores/auth.store';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useAuthStore();
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/', label: 'Dashboard' },
    { href: '/admin/services', label: 'Services' },
    { href: '/admin/team', label: 'Team' },
    { href: '/admin/presentations', label: 'Presentations' },
    { href: '/admin/impacts', label: 'Impacts' },
    { href: '/admin/blogs', label: 'Blogs' },
    { href: '/admin/contact', label: 'Contact Messages' },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-rangitoto text-white transition-all duration-300 ${
        isSidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="p-4">
        <button onClick={toggleSidebar} className="mb-4">
          <Menu className="h-6 w-6" />
        </button>
        {isSidebarOpen && (
          <nav className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block p-2 rounded ${
                  pathname === item.href
                    ? 'bg-albescent-white'
                    : 'hover:bg-lemon-grass'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </aside>
  );
}
