function randomNumber(max, min = 0) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}
export const messages = {
		headerMessage: `ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM` +
				`\nCOPYRIGHT 2075-2077 ROBCO INDUSTRIES\n-Server ${randomNumber(64, 1)}-`,
			
		trespasserMessage: `-RobCo Tresspasser Management System-` +
			`\n=====================================`,
		
		hack: `\nRobcOS v.85` +
			`\n(C)2076 RobCo` +
			`\n========================` +
			`\n| User Log:` +
			`\n| >> Administrator (RobCoID 2398-H)` +
			'\n| >> New_Admin: null' +
			'\n| Welcome new user, null' +
			'\n| >> New_Targeting_Param:' +
			'\n| >>> null_userGroup' +
			`\n========================`,
			
		scaleBar: `|12345679|12345679|12345679|12345679|12345679|12345679|12345679|12345679`
	}
