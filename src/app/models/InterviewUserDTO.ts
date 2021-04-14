export interface InterviewUserDTO{
	userId?: number;
	authorizations?: string[];
	emailaddr?: string;
	firstname?: string;
	isuseractive?: boolean;
	isusernotlocked?: boolean;
	joindate?: Date;
	lastlogindate?: Date;
	lastlogindatedisplay?: Date;
	lastname?: string;
	password?: string;
	profileimage?: string;
	roles?: string;
	useridentifier?: string;
	username?: string;
}