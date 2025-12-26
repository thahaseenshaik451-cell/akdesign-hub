import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, Image, MessageSquare, Briefcase, Home, Shield, LayoutDashboard, Settings, Bell, Database } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { seedMockData } from '@/utils/seedMockData';
import { useToast } from '@/hooks/use-toast';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import PortfolioManager from '@/components/admin/PortfolioManager';
import TestimonialsManager from '@/components/admin/TestimonialsManager';
import ServicesManager from '@/components/admin/ServicesManager';

const menuItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
    component: 'dashboard',
  },
  {
    title: 'Portfolio',
    icon: Image,
    path: '/admin/portfolio',
    component: 'portfolio',
  },
  {
    title: 'Testimonials',
    icon: MessageSquare,
    path: '/admin/testimonials',
    component: 'testimonials',
  },
  {
    title: 'Services',
    icon: Briefcase,
    path: '/admin/services',
    component: 'services',
  },
];

const settingsItems = [
  {
    title: 'Settings',
    icon: Settings,
    path: '/admin/settings',
    component: 'settings',
  },
];

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeComponent, setActiveComponent] = useState('dashboard');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    // Set active component based on current path
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') {
      setActiveComponent('dashboard');
    } else if (path.includes('/portfolio')) {
      setActiveComponent('portfolio');
    } else if (path.includes('/testimonials')) {
      setActiveComponent('testimonials');
    } else if (path.includes('/services')) {
      setActiveComponent('services');
    } else if (path.includes('/settings')) {
      setActiveComponent('settings');
    }
  }, [location.pathname]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleNavigation = (path: string, component: string) => {
    setActiveComponent(component);
    navigate(path);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <Shield className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-display font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            You don't have admin privileges. Contact the site administrator to request access.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => navigate('/')}>
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button variant="ghost" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'services':
        return <ServicesManager />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-gradient-to-br from-background via-secondary/20 to-background">
        <Sidebar className="bg-sidebar/95 text-sidebar-foreground border-r border-border/60">
          <SidebarHeader className="border-b border-border/40 bg-sidebar/95">
            <div className="flex items-center gap-2 px-4 py-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-gold flex items-center justify-center">
                <span className="font-display font-bold text-sm text-primary-foreground">AK</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm">Admin Panel</span>
                <span className="text-xs text-muted-foreground">Dashboard</span>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="bg-sidebar/95">
            <SidebarGroup>
              <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.path, item.component)}
                        isActive={activeComponent === item.component}
                        tooltip={item.title}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <Separator className="my-4" />

            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        onClick={() => handleNavigation(item.path, item.component)}
                        isActive={activeComponent === item.component}
                        tooltip={item.title}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/40 bg-sidebar/95">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {user.email?.charAt(0).toUpperCase() || user.displayName?.charAt(0).toUpperCase() || 'A'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.displayName || user.email}</p>
                  <p className="text-xs text-muted-foreground">{isAdmin ? 'Administrator' : 'User'}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1 bg-gradient-to-br from-background/80 via-background to-background/90">
          {/* Top Header */}
          <header className="sticky top-0 z-40 border-b border-border/40 bg-gradient-to-r from-background/95 via-background/90 to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/70">
            <div className="flex h-16 items-center gap-4 px-6">
              <SidebarTrigger />
              <Separator orientation="vertical" className="h-6" />
              <div className="flex-1" />
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary" />
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-7xl">
              {renderContent()}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

// Dashboard Overview Component
const DashboardOverview = () => {
  const [stats, setStats] = useState({
    portfolio: 0,
    testimonials: 0,
    services: 0,
    loading: true
  });
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const fetchStats = async () => {
    try {
      const [portfolioRes, testimonialsRes, servicesRes] = await Promise.all([
        supabase.from('portfolio').select('id', { count: 'exact', head: true }),
        supabase.from('testimonials').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true })
      ]);

      setStats({
        portfolio: portfolioRes.count || 0,
        testimonials: testimonialsRes.count || 0,
        services: servicesRes.count || 0,
        loading: false
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats(prev => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSeedData = async () => {
    if (!confirm('This will add mock data to your database. Continue?')) return;
    
    setSeeding(true);
    try {
      const results = await seedMockData();
      toast({
        title: 'Mock Data Seeded',
        description: `Portfolio: ${results.portfolio.inserted} inserted, ${results.portfolio.skipped} skipped. Testimonials: ${results.testimonials.inserted} inserted, ${results.testimonials.skipped} skipped. Services: ${results.services.inserted} inserted, ${results.services.skipped} skipped.`,
      });
      await fetchStats();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to seed mock data',
        variant: 'destructive',
      });
    } finally {
      setSeeding(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your content.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Portfolio Items</p>
              <p className="text-2xl font-bold mt-1">
                {stats.loading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : stats.portfolio}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Image className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Testimonials</p>
              <p className="text-2xl font-bold mt-1">
                {stats.loading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : stats.testimonials}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Services</p>
              <p className="text-2xl font-bold mt-1">
                {stats.loading ? <Loader2 className="w-6 h-6 animate-spin inline" /> : stats.services}
              </p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Views</p>
              <p className="text-2xl font-bold mt-1">-</p>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <LayoutDashboard className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
        <h2 className="text-xl font-display font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4"
            onClick={() => window.location.href = '/admin/portfolio'}
          >
            <Image className="w-5 h-5 mb-2" />
            <span className="font-medium">Add Portfolio Item</span>
            <span className="text-xs text-muted-foreground mt-1">Create a new project</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4"
            onClick={() => window.location.href = '/admin/testimonials'}
          >
            <MessageSquare className="w-5 h-5 mb-2" />
            <span className="font-medium">Add Testimonial</span>
            <span className="text-xs text-muted-foreground mt-1">Add client feedback</span>
          </Button>
          <Button
            variant="outline"
            className="h-auto flex-col items-start p-4"
            onClick={() => window.location.href = '/admin/services'}
          >
            <Briefcase className="w-5 h-5 mb-2" />
            <span className="font-medium">Add Service</span>
            <span className="text-xs text-muted-foreground mt-1">Create new service</span>
          </Button>
        </div>
      </div>

      {/* Seed Mock Data */}
      {(stats.portfolio === 0 || stats.testimonials === 0 || stats.services === 0) && (
        <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
          <h2 className="text-xl font-display font-semibold mb-4">Setup</h2>
          <p className="text-muted-foreground mb-4">
            Your database appears to be empty. Would you like to seed it with mock data to get started?
          </p>
          <Button
            variant="outline"
            onClick={handleSeedData}
            disabled={seeding}
            className="bg-gradient-gold"
          >
            {seeding ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Seeding...
              </>
            ) : (
              <>
                <Database className="w-4 h-4 mr-2" />
                Seed Mock Data
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

// Settings View Component
const SettingsView = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <div className="rounded-xl border border-border/50 bg-card/95 backdrop-blur-sm shadow-md shadow-black/5">
        <h2 className="text-xl font-display font-semibold mb-4">Account Settings</h2>
        <p className="text-muted-foreground">Settings panel coming soon...</p>
      </div>
    </div>
  );
};

export default Admin;
