export class Login {
    username: string;
    password: string;
  }

  export class ChangePassword {
    oldPass:string;
    newPassword: string;
  }
  export class Otp {
    correlationId: string;
    otpCode: string;
  }
  
  export class Biometrics {
    username: string;
    fingerPrint: string;
  }
  
  export class Manufacturers {
    type:string;
    
  }
  