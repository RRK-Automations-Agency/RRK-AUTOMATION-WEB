import { useState, useEffect, createContext, useContext, useRef } from "react";
import { getSupabase } from "../lib/supabase";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const authEventRef = useRef(null); // "INITIAL_SESSION" | "SIGNED_IN" | null

  useEffect(() => {
    let subscription;

    getSupabase().then((supabase) => {
      // Listen for auth state changes
      const {
        data: { subscription: sub },
      } = supabase.auth.onAuthStateChange((event, session) => {
        authEventRef.current = event;
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          setTimeout(() => {
            checkAdminRole(supabase, session.user.id, session.user.email);
          }, 0);
        } else {
          setIsAdmin(false);
        }

        setIsLoading(false);
      });

      subscription = sub;

      // Check existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        authEventRef.current = "INITIAL_SESSION";
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          checkAdminRole(supabase, session.user.id, session.user.email);
        }

        setIsLoading(false);
      });
    });

    return () => subscription?.unsubscribe();
  }, []);

  async function checkAdminRole(supabase, userId, userEmail) {
    try {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();

      const isAdminCheck = !!data && !error;
      setIsAdmin(isAdminCheck);

      // Log real admin login events (not session restore on page refresh)
      if (isAdminCheck && authEventRef.current === "SIGNED_IN") {
        supabase
          .rpc("log_security_event", {
            p_action: "login",
            p_entity: "auth",
            p_details: JSON.stringify({ email: userEmail || userId }),
          })
          .catch(() => {});
        authEventRef.current = null;
      }
    } catch {
      setIsAdmin(false);
    }
  }

  const signUp = async (email, password, fullName) => {
    const supabase = await getSupabase();
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName,
        },
      },
    });

    return { error };
  };

  const signIn = async (email, password) => {
    const supabase = await getSupabase();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Log failed login attempts
    if (error) {
      supabase
        .rpc("log_security_event", {
          p_action: "login_failed",
          p_entity: "auth",
          p_details: JSON.stringify({ email }),
        })
        .catch(() => {});
    }

    return { error };
  };

  const signOut = async () => {
    const supabase = await getSupabase();
    await supabase.auth.signOut();
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};