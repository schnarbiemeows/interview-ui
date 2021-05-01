import {InterviewUserDTO} from "./InterviewUserDTO";

export class InterviewUserDTOWrapper {
	newEmailAddr?: string;
	newFirstName?: string;
  newLastName?: string;
	newPassword?: string;
  newPasswordConfirm?: string;
  newUserName?: string;

  userId?: number;
  authorizations?: string[];
  emailAddr?: string;
  firstName?: string;
  userActive?: boolean;
  userNotLocked?: boolean;
  joinDate?: Date;
  lastLoginDate?: Date;
  lastLoginDateDisplay?: Date;
  lastName?: string;
  password?: string;
  profileImage?: string;
  roles?: string;
  userIdentifier?: string;
  userName?: string;

  constructor() {
    this.newEmailAddr = '';
    this.newFirstName = '';
    this.newLastName = '';
    this.newPassword = null;
    this.newPasswordConfirm = '';
    this.newUserName = '';
    this.userId = null;
    this.authorizations = null;
    this.emailAddr = '';
    this.firstName = '';
    this.userActive = null;
    this.userNotLocked = null;
    this.joinDate = null;
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.lastName = '';
    this.password = null;
    this.profileImage = '';
    this.roles = '';
    this.userIdentifier = '';
    this.userName = '';
  }

  fromDto(user: InterviewUserDTO) {
  this.newEmailAddr = user.emailAddr;
  this.newFirstName = user.firstName;
  this.newLastName = user.lastName;
  this.newUserName = user.userName;
  this.userId = user.userId;
  this.authorizations = user.authorizations;
  this.emailAddr = user.emailAddr;
  this.firstName = user.firstName;
  this.userActive = user.userActive;
  this.userNotLocked = user.userNotLocked;
  this.joinDate = user.joinDate;
  this.lastLoginDate = user.lastLoginDate;
  this.lastLoginDateDisplay = user.lastLoginDateDisplay;
  this.lastName = user.lastName;
  this.profileImage = user.profileImage;
  this.roles = user.roles;
  this.userIdentifier = user.userIdentifier;
  this.userName = user.userName;
  }
}
