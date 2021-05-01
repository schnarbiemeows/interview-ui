export interface InterviewUserDTO {
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
}
