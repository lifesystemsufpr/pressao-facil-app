export type Gender = 'male' | 'female' | 'other';
export type PersonalData = {
  fullName: string;
  birthDate: string;
  gender: Gender | string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
};

export type ClinicalData = {
  bloodType?: string;
  hypertensionType?: string;
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
