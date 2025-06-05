import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppState {
  // 사용자 관련 상태
  user: User | null;
  isAuthenticated: boolean;
  
  // UI 상태
  theme: 'light' | 'dark' | 'system';
  sidebarCollapsed: boolean;
  
  // 로딩 상태
  isLoading: boolean;
  
  // Actions
  setUser: (user: User | null) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleSidebar: () => void;
  setLoading: (isLoading: boolean) => void;
  
  // 로그아웃
  logout: () => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        user: null,
        isAuthenticated: false,
        theme: 'system',
        sidebarCollapsed: false,
        isLoading: false,

        // Actions
        setUser: (user) => set({ user }, false, 'setUser'),
        
        setAuthenticated: (isAuthenticated) => 
          set({ isAuthenticated }, false, 'setAuthenticated'),
        
        setTheme: (theme) => set({ theme }, false, 'setTheme'),
        
        toggleSidebar: () => 
          set({ sidebarCollapsed: !get().sidebarCollapsed }, false, 'toggleSidebar'),
        
        setLoading: (isLoading) => set({ isLoading }, false, 'setLoading'),
        
        logout: () => 
          set(
            { 
              user: null, 
              isAuthenticated: false 
            }, 
            false, 
            'logout'
          ),
      }),
      {
        name: 'app-storage',
        // 민감한 정보는 persist에서 제외
        partialize: (state) => ({
          theme: state.theme,
          sidebarCollapsed: state.sidebarCollapsed,
        }),
      }
    ),
    {
      name: 'app-store',
    }
  )
); 