import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalUserProfile } from '../types/profile';

const PROFILE_KEY = '@pressao-facil/user-profile';

export const profileStorage = {
  async get(): Promise<LocalUserProfile | null> {
    const rawProfile = await AsyncStorage.getItem(PROFILE_KEY);
    if (!rawProfile) return null;

    try {
      const profile = JSON.parse(rawProfile) as LocalUserProfile;
      return profile.version === 1 && profile.fullName ? profile : null;
    } catch {
      return null;
    }
  },

  save: (profile: LocalUserProfile) => AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile)),
  remove: () => AsyncStorage.removeItem(PROFILE_KEY),
};
