export interface UserProfile {
  id: string;
  fullName: string;
  birthDate: string; // DD/MM/YYYY
  gender: 'male' | 'female' | 'other';
  weightKg: number;
  heightCm: number;
  usesBloodPressureMeds: boolean;
  bloodPressureMedsName?: string;
  familyHistoryHypertension: boolean;
  hasChronicDisease: boolean;
  chronicDiseaseName?: string;
  smokerOrLivesWithSmoker: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ProfileState {
  profile: UserProfile | null;
  _hasHydrated: boolean;
}

export interface ProfileActions {
  salvar: (data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => void;
  limpar: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type ProfileStore = ProfileState & ProfileActions;
