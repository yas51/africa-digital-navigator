
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  profile: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
  session: null, 
  user: null, 
  profile: null, 
  loading: true 
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Configure auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        console.log("Auth state changed:", event, currentSession?.user?.id);
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        
        // Fetch user profile if logged in
        if (currentSession?.user) {
          try {
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();
            
            if (error) {
              console.error("Error fetching profile:", error);
            } else {
              console.log("Profile fetched:", data);
              setProfile(data);
            }
          } catch (err) {
            console.error("Error in profile fetch:", err);
          }
        } else {
          setProfile(null);
        }
      }
    );

    // Check initial session
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("Initial session check:", initialSession?.user?.id);
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      // Fetch initial profile if logged in
      if (initialSession?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', initialSession.user.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error("Error fetching initial profile:", error);
            } else {
              console.log("Initial profile:", data);
              setProfile(data);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
        // Redirect to auth page if not on auth page
        if (location.pathname !== '/auth') {
          navigate('/auth');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  useEffect(() => {
    // Redirect logic based on authentication state
    if (!loading) {
      if (!session && location.pathname !== '/auth') {
        navigate('/auth');
      }
    }
  }, [session, loading, navigate, location.pathname]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <AuthContext.Provider value={{ session, user, profile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
