import { FC, ReactNode, useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "components/ui/components";

interface DropdownItem {
  label: string;
  onClick?: () => void;
  badge?: string;
}

interface SidebarItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface NavbarProps {
  appName: string;
  bgColor?: string;
  avatarSrc: string;
  dropdownItems: DropdownItem[];
  indicatorContent?: ReactNode;
  indicatorBadge?: string;
  userName?: string;
  userNameColor?: string;
  role?: string;
  roleTextColor?: string;
  sidebarItems?: SidebarItem[];
}

const Navbar: FC<NavbarProps> = ({
  appName,
  bgColor = 'bg-base-100',
  avatarSrc,
  dropdownItems,
  indicatorContent,
  indicatorBadge,
  userName,
  userNameColor = 'text-white',
  role,
  roleTextColor = 'text-gray-300',
  sidebarItems = [],
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className={`navbar ${bgColor} shadow-sm fixed top-0 left-0 right-0 z-50`}>
        <div className="flex-1 flex items-center gap-2">
          <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(prev => !prev)}>
            <Menu size={24} />
          </button>
          <span className="text-xl font-bold text-white">{appName}</span>
        </div>

        <div className="flex-none hidden md:flex items-center gap-4">
          {indicatorContent && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  {indicatorContent}
                  {indicatorBadge && (
                    <span className="badge badge-sm indicator-item">{indicatorBadge}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center space-x-3 p-2 cursor-pointer">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img alt={userName} src={avatarSrc} />
              </div>
              <div className="flex flex-col text-left">
                {userName && <span className={`text-md font-semibold ${userNameColor}`}>{userName}</span>}
                {role && <span className={`text-xs ${roleTextColor}`}>{role}</span>}
              </div>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
              {dropdownItems.map((item, index) => (
                <li key={index}>
                  <a onClick={item.onClick} className="text-lg">
                    {item.label}
                    {item.badge && <span className="badge">{item.badge}</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-transparent bg-opacity-40" onClick={() => setMobileMenuOpen(false)} />

          <div className="absolute top-0 left-0 w-72 h-full bg-[#0B1F3A] text-white p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h2 className="text-xl font-bold">{appName}</h2>
              </div>

              <div className="border-b border-white/20 pb-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={avatarSrc} alt="User" />
                </div>
                <div>
                  {userName && <div className={`text-sm font-semibold ${userNameColor}`}>{userName}</div>}
                  {role && <div className={`text-xs ${roleTextColor}`}>{role}</div>}
                </div>
              </div>

              <Button
                onClick={dropdownItems.find(i => i.label.toLowerCase() === 'logout')?.onClick}
                variant="red"
                className="w-full text-left text-sm rounded mb-3"
              >
                Logout
              </Button>

              <ul className="rounded-box mb-2">
                {sidebarItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center gap-4 hover:bg-white/10 p-3 rounded"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <div className="flex items-center justify-center">
                        {item.icon}
                      </div>
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
