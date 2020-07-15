export const FIREBASE_BASE_URL = "<INSERT_YOUR_FIREBASE_URL_HERE>";

export const FIREBASE_INGREDIENTS_URL = `${FIREBASE_BASE_URL}/ingredients.json`;

const FIREBASE_WEB_API_KEY = "<INSERT_YOUR_WEB_API_KEY_HERE>";

export const FIREBASE_SIGN_UP_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${FIREBASE_WEB_API_KEY}`;

export const FIREBASE_SIGN_IN_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_API_KEY}`;
