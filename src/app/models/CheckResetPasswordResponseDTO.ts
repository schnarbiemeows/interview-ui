export class CheckResetPasswordResponseDTO {
  foundRecord: boolean;
  emailAddress?: string;
  uniqueId?: string;
  constructor(i2: string) {
    this.foundRecord = false;
    this.emailAddress = null;
    this.uniqueId = null;
  }
}
