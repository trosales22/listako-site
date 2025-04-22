import { ListTodo, Settings } from "lucide-react";
import Navbar from "components/layout/Navbar";
import Sidebar from "components/layout/Sidebar";
import Wrapper from "../Wrapper";
import { Button, Modal } from "components/ui/components";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "hooks/auth";
import { useState } from "react";
import Cookies from "js-cookie";
import { Role, ROLES } from "constants/roles";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const [openLogout, setOpenLogout] = useState(false);
    const navigate = useNavigate();
    const userRole = (Cookies.get('role') as Role);
    const firstName = Cookies.get('firstname')
    const lastName = Cookies.get('lastname')
    const userName = firstName && lastName ? `${firstName} ${lastName}` : "Unknown";

    const { mutate: logout, isPending: isLogoutLoading } = useLogoutMutation({
        onSuccess: () => {
            toast.success("Successfully logged out.");

            Cookies.remove('auth_status');
            Cookies.remove('firstname');
            Cookies.remove('lastname');
            Cookies.remove('token');
            Cookies.remove('role');

            navigate("/login");
        },
        onError: () => {}
    })

    const onShowLogoutModal = () => {
        setOpenLogout(true)
    }

    const onLogoutHander = () => {
        logout({})
    }

    const headerNavItems = [
        { label: "Settings", onClick: () => navigate('/settings') },
        { label: "Logout", onClick: onShowLogoutModal }
    ];

    const allMenuItems = [
        { label: "Tasks", icon: <ListTodo className="h-5 w-5" />, path: "/", roles: [ROLES.USER] }, 
        { label: "Settings", icon: <Settings className="h-5 w-5" />, path: "/settings", roles: [ROLES.USER] }
    ];

    const sidebarMenuItems = allMenuItems.filter(item => item.roles.includes(userRole));
    
    const roleMap: Record<string, string> = {
        [ROLES.USER]: 'User'
    };
    
    const formattedRole = roleMap[userRole] || 'Unknown';

    return (
        <Wrapper>
            <Navbar 
                appName="ListaKo" 
                bgColor="bg-[#0B1F3A] backdrop-blur-md"
                avatarSrc='/images/app-logo.png'
                dropdownItems={headerNavItems}
                userName={userName}
                userNameColor="text-white"
                role={formattedRole}
                roleTextColor="text-gray-100"
                sidebarItems={sidebarMenuItems}
            />

            <div className="flex flex-col md:flex-row md:overflow-hidden max-w-full overflow-x-hidden">
                <Sidebar 
                    bgColor="bg-[#0B1F3A]" 
                    items={sidebarMenuItems} 
                    sidebarProps="text-white hover:bg-white/10 hover:text-white"
                />
                <div className="flex-1 p-6 mt-2 pt-18 ml-0 md:ml-72 transition-all duration-300 max-w-full">
                    {children}
                </div>
            </div>

            <Modal
                id="logout-modal"
                title="Confirm Logout"
                isOpen={openLogout}
                onClose={() => setOpenLogout(false)}
                headerColor="red"
            >
                <p>Are you sure you want to logout?</p>
                <div className="flex justify-end space-x-2 mt-4">
                    <Button variant="ghost" onClick={() => setOpenLogout(false)}>No</Button>
                    <Button variant="danger" className="text-white" onClick={onLogoutHander} disabled={isLogoutLoading}>{isLogoutLoading ? 'Logging out..' : 'Yes'}</Button>
                </div>
            </Modal>
        </Wrapper>
    );
};

export default Layout;
