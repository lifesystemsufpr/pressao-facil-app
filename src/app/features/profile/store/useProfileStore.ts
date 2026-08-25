import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileStore, UserProfile } from '../types';

export const useProfileStore = create<ProfileStore>()(
  persist(
    (set, get) => ({
      profile: null,
      _hasHydrated: false,

      carregarPerfil: async () => {
        try {
          const { api } = await import('../../../shared/services/api');
          const response = await api.get('/users/me');
          if (response.data.profile) {
            set((state) => ({
              ...state,
              profile: {
                ...response.data.profile,
                version: 1,
              },
            }));
          }
        } catch (error) {
          console.log('Failed to fetch profile', error);
        }
      },

      salvar: async (data) => {
        const now = new Date().toISOString();
        const newProfile: UserProfile = {
          ...data,
          version: 1,
          id: `${Date.now()}`,
          createdAt: now,
          updatedAt: now,
        };

        try {
          const { api } = await import('../../../shared/services/api');
          
          const payload = {
            ...data,
            birthDate: data.birthDate ? data.birthDate.split('/').reverse().join('-') : undefined
          };

          const method = get().profile ? 'patch' : 'post';
          
          try {
            await api[method]('/profile', payload);
          } catch (err: any) {
            // Se tentou criar e já existe (409 Conflict), tenta fazer um patch (atualizar)
            if (method === 'post' && err.response?.status === 409) {
              await api.patch('/profile', payload);
            } else {
              throw err;
            }
          }
          
          set((state) => ({
            ...state,
            profile: newProfile,
          }));
        } catch (error) {
          console.log('Failed to save profile', error);
          throw error;
        }
      },

      limpar: () => {
        set((state) => ({
          ...state,
          profile: null,
        }));
      },

      setHasHydrated: (hasHydrated) => {
        set((state) => ({ ...state, _hasHydrated: hasHydrated }));
      },
    }),
    {
      name: 'pressao-facil-storage-profile',
      storage: createJSONStorage(() => AsyncStorage),
      version: 1,
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      migrate: (persistedState: any, version: number) => {
        if (version === 0) {
          // Lógica de migração
        }
        return persistedState as ProfileStore;
      },
    }
  )
);
