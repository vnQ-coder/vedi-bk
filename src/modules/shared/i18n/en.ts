class CommonI18n {
  static serverError = (): string => "There is a server error. Sorry for inconvenience";
  static valueAlreadyExist = (name: string, value: string): string => `The ${name} (${value}) already exist`;
  static fileUploadFailed = (): string => "Failed to upload file";
  static fileUploadSuccess = (): string => "File uploaded successfully";
  static requiredValidImageFile = (): string => "Required a valid image file";
  static invalidFileType = (allowedTypes: string[]): string => `Invalid file type allowed types are ${allowedTypes}`;
  static fileSizeTooLarge = (
    allowedFileSize: number, format: string,
  ): string => `File Size is too large. Allowed file size is ${allowedFileSize} ${format}`;

  static login = (): string => "You Have been Logged In Successfully!";
  static logout = (): string => "You Have been Logged Out Successfully!";
  static incorrect = (): string => "Invalid Credentials!";
  static userNotExists = (): string => "User with these credentials does not exists!"
  static accountNotVerified = (): string => "account not verified";
  static profileNotFilled = (): string => "profile not filled";
  static userExists = (): string => "User already Exists!";
  static userCreated = (): string => "User Created Successfully!";
  static userUpdated = (): string => "User Updated Successfully!";

  static authenticationDenied = (): string => "Authentication Denied!";
  static roleAuthenticationDenied = (): string => "Role Authentication Denied!";
  static Validation = {
    invalidEmail: (): string => "The email address is not valid!",
    maxLength: (name: string, maxLength: number): string => `The ${name} has more than ${maxLength} characters`,
    minLength: (name: string, minLength: number): string => `The ${name} requires length should be ${minLength} or more`,
    required: (name: string): string => `The ${name} is required!`,
    number: (name: string): string => `Invalid value provided for ${name}, numeric value required`,
    numberPositive: (name: string): string => `${name} must be positive non zero value`,
    limitRestriction: (name: string): string => `${name} must be within 2 digits`,
    uuid: (name: string): string => `Invalid UUID provided for ${name}`,
  };

  static verifyYourAccount = (): string => "Your account is not verified, Please verify first";
  static oldAndCurrentPasswordNotMatch = (): string => "The old password you entered does not match to your current password";
  static newAndConfirmPasswordNotMatch = (): string => "The new password you entered does not match to your confirm password";
  static passwordChangeSuccess = (): string => "Your password has been changed successfully"
}

export default CommonI18n;
