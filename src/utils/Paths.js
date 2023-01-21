// export const API_CONTEXT = "http://localhost:8080/api/" 
export const API_CONTEXT = "https://artclash-service.onrender.com/api/"

export const LOGIN_CONTEXT = API_CONTEXT+"auth/signin";
export const SIGNUP_CONTEXT = API_CONTEXT+"auth/register";
export const HOME_CONTEXT = "home";
export const PROFIL_CONTEXT = "profil";
export const MINIGAME_CONTEXT = "minigame";
export const GALLERY_CONTEXT = "gallery";
export const LANDING_CONTEXT = "/";

export const SOCIAL_URL_FOLLOW = API_CONTEXT+"social/follow"
export const SOCIAL_URL_UNFOLLOW = API_CONTEXT+"social/unfollow"
export const SOCIAL_URL_FOLLOWERS = API_CONTEXT+"social/followers"

export const POST_URL_CREATE = API_CONTEXT+"post/add"
export const POST_URL_CREATE_COMMENT = API_CONTEXT+"post/comment/add"
export const POST_URL_GET = API_CONTEXT+"post/get/"
export const POST_URL_GET_BY_USER = API_CONTEXT+"post/listAllByUser/"
export const POST_URL_GET_COMMENTS = API_CONTEXT+"post/listComment/"
export const POST_URL_DELETE = API_CONTEXT+"post/delete/" 