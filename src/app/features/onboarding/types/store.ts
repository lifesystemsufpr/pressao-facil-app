import { LocalUserProfile, PersonalData, ClinicalData } from './profile';

export type CompleteProfileData = PersonalData & ClinicalData & {
  weightKg: number;
  heightCm: number;
};

export type OnboardingEntity = LocalUserProfile;

export interface OnboardingState {
  profile: OnboardingEntity | null;
  _hasHydrated: boolean;
}

export interface OnboardingActions {
  salvar: (data: CompleteProfileData) => void;
  limpar: () => void;
  setHasHydrated: (state: boolean) => void;
}

export type OnboardingStore = OnboardingState & OnboardingActions;
