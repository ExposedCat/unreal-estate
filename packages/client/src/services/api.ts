import {
	Estate_Get_Params_Schema,
	Estate_Get_Response_Schema,
	Estates_Get_Params_Schema,
	Estates_Get_Response_Schema,
	Login_Post_Body_Schema,
	Login_Post_Response_Schema,
	Register_Post_Body_Schema,
	Register_Post_Response_Schema,
	Session_Get_Response_Schema,
} from "pronajemik-common";

export const ApiSchemas = {
	"/login": {
		POST: {
			body: Login_Post_Body_Schema,
			response: Login_Post_Response_Schema,
		},
	},
	"/register": {
		POST: {
			body: Register_Post_Body_Schema,
			response: Register_Post_Response_Schema,
		},
	},
	"/session": {
		GET: {
			response: Session_Get_Response_Schema,
		},
	},
	"/estates": {
		GET: {
			params: Estates_Get_Params_Schema,
			response: Estates_Get_Response_Schema,
		},
	},
	"/estate": {
		GET: {
			params: Estate_Get_Params_Schema,
			response: Estate_Get_Response_Schema,
		},
	},
} as const;
