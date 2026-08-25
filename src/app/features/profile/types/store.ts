export interface UserProfile {
  id: string;
  fullName: string;
  birthDate: string; // DD/MM/YYYY
  gender: 'male' | 'female' | 'other' | string;
  weightKg: number;
  heightCm: number;
  bloodType?: string;
  hypertensionType?: string;
  usesBloodPressureMeds: boolean;
  bloodPressureMedsName?: string;
  familyHistoryHypertension: boolean;
  hasChronicDisease: boolean;
  chronicDiseaseName?: string;
  smokerOrLivesWithSmoker: boolean;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

export interface ProfileState {
  profile: UserProfile | null;
  _hasHydrated: boolean;
}

export interface ProfileActions {
  carregarPerfil: () => Promise<void>;
  salvar: (data: Omit<UserProfile, 'id' | 'createdAt' | 'updatedAt' | 'version'>) => Promise<void>;
  limpar: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type ProfileStore = ProfileState & ProfileActions;
