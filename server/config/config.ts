const config = {
	//======================
	// SERVER
	//======================
	PORT: Number(process.env.PORT) || 5000,

	//======================
	// MONGO DB
	//======================
	MNG_DB_URI: process.env.MNG_DB_URI || '',

	//======================
	// SECURITY
	//======================
	SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
	JWT_KEY: process.env.JWT_KEY || 'j1Ki70Nu5Q',
};

export default config;