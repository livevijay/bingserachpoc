/**
 * Async Requst helper like get, post, put, delete and common api request
 * This is common api request functionality for entire application
 */
const httpRequest = {  
    /**
     * Load data from the server using a HTTP GET request
     * @param endPoint A string containing the URL to which the request is sent.
     * @param header Use this to set custom headers
     * @returns 
     */  
    getData: <T>(endPoint: string, header?:any): Promise<T> => {
        return httpRequest.apiData("GET", endPoint,null,header);
    },
    
    //TODO POST / PUT / DELETE

    /**
     * Perform an asynchronous HTTP (Ajax) request.
     * @param metod The HTTP method to use for the request (e.g. "POST", "GET", "PUT")
     * @param endPoint A string containing the URL to which the request is sent.
     * @param data Data to be sent to the server.
     * @param header Use this to set custom headers
     * @returns 
     */
    apiData: <T>(metod: string, endPoint: string, data?: any, header?: any): Promise<T> => {
        const option: any = { mode: "cors" };
        if (header) { option.headers = header; }        
        return fetch(endPoint,option)
            .then(response => {
                if (!response.ok) { httpRequest.errorHandling(response); }
                return response.json() as Promise<T>
            })
    },
    /**
     * A function to be called if the request fails
     * @param response Error that occurred and an optional exception object
     */
    errorHandling: (response?: Response) => {
        console.log(response?.statusText);
    }
}
export default httpRequest;