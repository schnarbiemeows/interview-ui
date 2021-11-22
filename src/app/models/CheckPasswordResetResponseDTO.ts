export class CheckPasswordResetResponseDTO {
  foundRecord: boolean = false;
  emailAddress?: string;
  uniqueId?: string;
  constructor(found?: boolean, email?: string, id?: string) {
    if(found) {
      this.foundRecord = found;
    }
    if(email) {
      this.emailAddress = email;
    }
    if(id) {
      this.uniqueId = id;
    }
  }
}
