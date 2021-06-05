import pwdGenerator from "generate-password";

export const generatePwd = ():string => pwdGenerator.generate({
  numbers: true,
  lowercase: false,
  uppercase: false,
  length: 8,
});

export const other = "";
