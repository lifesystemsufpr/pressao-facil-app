export type Gender = 'male' | 'female' | 'other';
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

export type PersonalData = {
  fullName: string;
  birthDate: string;
  gender: Gender;
  bloodType: BloodType;
};

export type LocalUserProfile = PersonalData & {
  version: 1;
  id: string;
  weightKg: number;
  heightCm: number;
  createdAt: string;
  updatedAt: string;
};
