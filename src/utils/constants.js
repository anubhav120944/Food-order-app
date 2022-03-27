const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2/';
export const email_regx = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: `${API_ROOT}/users/login`,
  signup: `${API_ROOT}/users/signup`,

};

export const LOCALSTORAGE_TOKEN_KEY = '__auth_token__';
