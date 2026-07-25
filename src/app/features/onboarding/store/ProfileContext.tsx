import React, { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { LocalUserProfile, PersonalData } from '../types/profile';
import { profileStorage } from '../services/profileStorage';

type CompleteProfileData = PersonalData & { weightKg: number; heightCm: number };
type ProfileContextValue = {
  profile: LocalUserProfile | null;
  isLoading: boolean;
  saveProfile: (data: CompleteProfileData) => Promise<void>;
};

const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

export const ProfileProvider = ({ children }: PropsWithChildren) => {
  const [profile, setProfile] = useState<LocalUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const startedAt = Date.now();

    profileStorage.get().then((storedProfile) => {
      const remaining = Math.max(0, 1200 - (Date.now() - startedAt));
      setTimeout(() => {
        if (active) {
          setProfile(storedProfile);
          setIsLoading(false);
        }
      }, remaining);
    }).catch(() => {
      if (active) setIsLoading(false);
    });

    return () => { active = false; };
  }, []);

  const saveProfile = async (data: CompleteProfileData) => {
    const now = new Date().toISOString();
    const newProfile: LocalUserProfile = {
      ...data,
      version: 1,
      id: `${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    await profileStorage.save(newProfile);
    setProfile(newProfile);
  };

  const value = useMemo(() => ({ profile, isLoading, saveProfile }), [profile, isLoading]);
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile deve ser usado dentro de ProfileProvider');
  return context;
};
