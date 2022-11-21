export interface RegisterUserInfo {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phoneNumber: string;
  birth: string;
  jobCategory: string;
  authCheck?: string;
  postalCode: string;
  mainAddress: string;
  detailAddress: string;
}
