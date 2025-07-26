import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { LogOut, Settings, Users, HelpCircle, ImageIcon } from "lucide-react";
import TestimonialManager from "./admin/TestimonialManager";
import FAQManager from "./admin/FAQManager";
import GalleryManager from "./admin/GalleryManager";

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel = ({ onLogout }: AdminPanelProps) => {
  const [userEmail, setUserEmail] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserEmail(user.email || "");
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      onLogout();
    } catch (error) {
      toast({
        title: "Error",
        description: "Error logging out",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="border-b border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Exotic Hauls Admin</h1>
              <p className="text-slate-300 text-sm">Logged in as: {userEmail}</p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="testimonials" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border border-slate-700">
            <TabsTrigger 
              value="testimonials" 
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-slate-300"
            >
              <Users className="w-4 h-4 mr-2" />
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="faqs"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-slate-300"
            >
              <HelpCircle className="w-4 h-4 mr-2" />
              FAQs
            </TabsTrigger>
            <TabsTrigger 
              value="gallery"
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-slate-300"
            >
              <ImageIcon className="w-4 h-4 mr-2" />
              Gallery
            </TabsTrigger>
          </TabsList>

          <div className="mt-6 space-y-6">
            <TabsContent value="testimonials">
              <TestimonialManager />
            </TabsContent>

            <TabsContent value="faqs">
              <FAQManager />
            </TabsContent>

            <TabsContent value="gallery">
              <GalleryManager />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;