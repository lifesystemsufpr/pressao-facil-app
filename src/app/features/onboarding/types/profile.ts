export type Gender = 'male' | 'female' | 'other';
export type PersonalData = {
  fullName: string;
  birthDate: string;
  gender: Gender;
};

export type ClinicalData = {
  usesBloodPressureMeds: boolean;
  bloodPressureMedsName?: string;
  familyHistoryHypertension: boolean;
  hasChronicDisease: boolean;
  chronicDiseaseName?: string;
  smokerOrLivesWithSmoker: boolean;
};

export type LocalUserProfile = PersonalData & ClinicalData & {
  version: 1;
  id: string;
  weightKg: number;
  heightCm: number;
  createdAt: string;
  updatedAt: string;
};
