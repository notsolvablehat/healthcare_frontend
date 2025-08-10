import { useState, useEffect } from "react";
import {
  Bell,
  Search,
  ChevronDown,
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  BarChart,
  Heart,
  User,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import ProfileScreen from "../profile-screens/ProfileScreen";
import { logout } from "../../services/authService";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DiabetesDashboard from "../DiabetesDashboard";

const menuIcons = {
  Dashboard: LayoutDashboard,
  Doctors: Users,
  Appointments: Calendar,
  Messages: MessageSquare,
  Statistics: BarChart,
  Cardiology: Heart,
  Profile: User,
  Settings: Settings,
};

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const url = location.pathname;

  useEffect(() => {
    const path = location.pathname.split("/").filter(Boolean).pop() || "dashboard";
    setActiveItem(path.charAt(0).toUpperCase() + path.slice(1));
  }, [location.pathname]);

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    navigate("/"+itemName.toLowerCase())
    console.log(`${itemName} clicked`);
  };

  const handleLogout = async () => {
    try {
      const response = await logout();
      console.log(response.message || "Logged out");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const menuItems = {
    Main: ["Dashboard", "Doctors", "Appointments", "Messages"],
    Analytics: ["Statistics"],
    Departments: ["Diabetes"],
    Account: ["Profile", "Settings"],
  };
  const user = useSelector(state => state.user.personalInfo.data);
  const imageUrl = `https://placehold.co/40x40/c2c2c2/000000?text=${user.firstName?.charAt(0) + user.lastName?.charAt(0)}`;
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-background text-foreground transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static lg:w-64 z-50 shadow-md p-4 flex flex-col justify-between`}
    >
      <div>
        {/* Mobile logo */}
        <div className="flex items-center justify-between lg:hidden mb-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
              M
            </div>
            <span className="text-xl font-bold">MediTrack</span>
          </div>
          <button onClick={toggleSidebar} className="p-2 text-muted-foreground">
            <X size={24} />
          </button>
        </div>

        {/* Desktop logo */}
        <div className="hidden lg:flex items-center space-x-2 mb-8">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
            M
          </div>
          <span className="text-xl font-bold">MediTrack</span>
        </div>

        {/* Menu Sections */}
        {Object.keys(menuItems).map((section) => (
          <div key={section} className="mb-6">
            <h3 className="text-xs text-muted-foreground uppercase font-semibold mb-2">
              {section}
            </h3>
            <ul>
              {menuItems[section].map((item) => {
                const Icon = menuIcons[item];
                return (
                  <li key={item} className="mb-2">
                    <button
                      onClick={() => handleItemClick(item)}
                      className={`flex items-center w-full px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                        activeItem === item
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {Icon && <Icon size={20} className="mr-3" />}
                      <span className="font-medium text-sm">{item}</span>
                      {/* {item === "Messages" && (
                        <span className="ml-auto bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                          0
                        </span>
                      )} */}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* User Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={imageUrl}
            alt="User"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold text-sm">{user.firstName + " " +user.lastName}</p>
            <p className="text-xs text-muted-foreground">{user.role || ""}</p>
          </div>
          <button
            onClick={handleLogout}
            className="ml-auto text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const Header = ({ toggleSidebar }) => {
  const user = useSelector(state => state.user.personalInfo.data);
  const imageUrl = `https://placehold.co/40x40/c2c2c2/000000?text=${user.firstName?.charAt(0) + user.lastName?.charAt(0)}`;
  return (
    <header className="bg-background p-4 border-b border-border flex items-center justify-between lg:justify-end">
      {/* Mobile menu button */}
      <button onClick={toggleSidebar} className="lg:hidden p-2 text-muted-foreground">
        <Menu size={24} />
      </button>

      {/* Mobile Title */}
      <h1 className="text-xl font-bold lg:hidden">Profile</h1>

      {/* Desktop */}
      <div className="flex items-center space-x-4 w-full justify-end">
        {/* Search */}
        <div className="relative w-full max-w-sm hidden md:block">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={18}
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 rounded-full border border-input focus:outline-none focus:ring-2 focus:ring-primary transition-colors bg-background"
          />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-muted-foreground hover:bg-muted rounded-full">
            <Bell size={20} />
          </button>
          <button className="relative p-2 text-muted-foreground hover:bg-muted rounded-full">
            <MessageSquare size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive border-2 border-background"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              src={imageUrl}
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-semibold hidden lg:inline">
              {user.firstName + " " + user.lastName}
            </span>
            <ChevronDown
              className="text-muted-foreground hidden lg:inline"
              size={16}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-muted/20 overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 px-6 pt-4 lg:px-10 overflow-y-auto pb-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function LayoutScreen({ screen }) {
  
  const screens = { 
    Profile: <ProfileScreen />, 
    Diabetes: <DiabetesDashboard />,
    Doctors: <div>Doctor Profiles Under Contruction</div>,
    Statistics: <div>Statistics Under Contruction</div>,
    Messages: <div>Messages Under Contruction</div>,
    Appointments: <div>Appointments Under Contruction</div>,
  };

  return <Layout>{screens[screen] || <div>Select a page</div>}</Layout>;
}

