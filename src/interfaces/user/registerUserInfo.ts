export interface RegisterUserInfo {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phoneNumber: string;
  birth: string;
  jobCategory: string;
  hospitalAddressNumber?: string;
  hospitalAddress?: string;
  hospitalAddressDetail?: string;
}
