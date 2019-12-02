function randomNumber(max, min = 0) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min + 1)) + min
}

export const headerMessage = `ROBCO INDUSTRIES UNIFIED OPERATING SYSTEM` +
		`\nCOPYRIGHT 2075-2077 ROBCO INDUSTRIES\n-Server ${randomNumber(64, 1)}-`
	
export const trespasserMessage = `-RobCo Tresspasser Management System-` +
		`\n=====================================` +
		`\n-------------------------------------` +
		`\nRobcOS v.85` +
		`\n(C)2076 RobCo` +
		`\n========================` +
		`\n| User Log:` +
		`\n| >> Administrator (RobCoID 2398-H)` +
		`\n========================`
	
export const scaleBar = `|12345679|12345679|12345679|12345679|12345679|12345679|12345679|12345679`
