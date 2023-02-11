export const API_CONTEXT = "http://localhost:8080/api" 
// export const API_CONTEXT = "https://artclash-service.onrender.com/api/"

// ROUTES

export const HOME_CONTEXT = "home";
export const PROFIL_CONTEXT = "profil";
export const MINIGAME_CONTEXT = "minigame";
export const GALLERY_CONTEXT = "gallery";
export const LANDING_CONTEXT = "/";


// URL

// AUTH
export const LOGIN_CONTEXT = API_CONTEXT+"/auth/signin";
export const SIGNUP_CONTEXT = API_CONTEXT+"/auth/register";

// SOCIAL
export const SOCIAL_URL_FOLLOW = API_CONTEXT+"/social/follow"
export const SOCIAL_URL_UNFOLLOW = API_CONTEXT+"/social/unfollow"
export const SOCIAL_URL_FOLLOWERS = API_CONTEXT+"/social/followers"

// POST
export const POST_URL_CREATE = API_CONTEXT+"/post/add"
export const POST_URL_CREATE_COMMENT = API_CONTEXT+"/post/comment/add"

export const POST_URL_GET = API_CONTEXT+"/post/get"
export const POST_URL_GET_BY_USER = API_CONTEXT+"/post/getPosts"
export const POST_URL_GET_MEDIA_BY_USER = API_CONTEXT+"/post/getMediaPosts"
export const POST_URL_GET_COMMENTS = API_CONTEXT+"/post/listComment"

export const POST_URL_DELETE = API_CONTEXT+"/post/delete" 

// CLASH
export const CLASH_URL_CREATE = API_CONTEXT+"/clash/create"
export const CLASH_URL_UPDATE = API_CONTEXT+"/clash/update"
export const CLASH_URL_CREATE_COMMENT = API_CONTEXT+"/clash/comment/add"

export const CLASH_URL_GET = API_CONTEXT+"/clash/get"
export const CLASH_URL_GET_LIST = API_CONTEXT+"/clash/list"
export const CLASH_URL_GET_BY_USER = API_CONTEXT+"/clash/getclashs"
export const CLASH_URL_UPLOAD_MEDIA = API_CONTEXT+"/clash/uploadMedia"
export const CLASH_URL_GET_MEDIA_BY_CLASH = API_CONTEXT+"/clash/media"
export const CLASH_URL_GET_BACKGROUND_BY_CLASH = API_CONTEXT+"/clash/background"
export const CLASH_URL_GET_COMMENTS = API_CONTEXT+"/clash/comment/list"
export const CLASH_URL_CLOSE= API_CONTEXT+"/clash/close"
export const CLASH_URL_JOIN = API_CONTEXT+"/clash/join"
export const CLASH_URL_DUMMY_FILL_CLASH = API_CONTEXT+"/clash/dummy/join"
export const CLASH_URL_EXIT = API_CONTEXT+"/clash/exit"
export const CLASH_URL_NEXTROUND = API_CONTEXT+"/clash/next"

export const CLASH_URL_DELETE = API_CONTEXT+"/clash/delete" 