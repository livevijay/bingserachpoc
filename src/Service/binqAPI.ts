import httpRequest from "./httpRequest";
/**
 * BING API Access Secret Key
 */
const bingKey:string | undefined = process.env.REACT_APP_SECRET_KEY;
/**
 * Bing related API Request like Suggestion, Search etc...
 */
const binqAPI = {
    /**
     * Request quick suggestion based on key
     * @param key Search keyword / query
     * @returns Promise Response
     */
    suggestion:(key?:string)=>{
        return httpRequest.getData<any>("https://api.bing.microsoft.com/v7.0/Suggestions?q=" + key,{"Ocp-Apim-Subscription-Key": bingKey});
    },
    /**
     * Request bing web serach based on key / query
     * @param key Search Keyword / Query
     * @returns Promise Response
     */
    search:(key?:string)=>{
        return httpRequest.getData<any>("https://api.bing.microsoft.com/v7.0/search?q=" + key,{"Ocp-Apim-Subscription-Key": bingKey});
    },
    //TODO Image, NEWS etc...
}
export default binqAPI;