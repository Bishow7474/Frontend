import axiosInstance from "../config/axios.config"

abstract class HttpService {
    #config:any;

    #setHeaders(config:any){
        let headers: any = {
            "Content-Type": "aplication/json"
        };
        let params: any = {};

        if(config.file || config.files) {
            headers = {
                "Content_type":"multipart/form-data"
            }
        }

        // if(config.auth) {
        //     let token = ""
        //     headers = {
        //         ...headers,
        //         "Authorization":"Bearer"+token
        //     }
        // }

        if(config.refresh) {
            let token = "";
            headers = {
                ...headers,
                "Refresh":"Bearer"+token
            }
        }

        if(config.params) {
            params = config.params
        }

        this.#config = {
            headers:headers,
            params: params,
        }
    }
   async getRequest (url:string, config:any = {}) {
        try {
            this.#setHeaders(config);
          let response = await axiosInstance.get(url, this.#config)  
          console.log(response);
          return response
        } catch (exception) {
          throw exception  
        }
    }

   async postRequest (url:string, data:any=null,config:any = {}) {
        try {
            this.#setHeaders(config);
            let response = await axiosInstance.post(url,data,this.#config)  
            return response
        } catch (exception) {
          throw exception  
        }
    }

    async putRequest (url:string, data:any=null, config:any={}) {
        try {
            this.#setHeaders(config);
            let response = await axiosInstance.put(url,data,this.#config)  
            return response
        } catch (exception) {
          throw exception  
        }
    }

    async patchRequest (url:string, data:any=null, config:any={}) {
        try {
            this.#setHeaders(config);
            let response = await axiosInstance.patch(url,data,this.#config)  
            return response
        } catch (exception) {
          throw exception  
        }
    }

    async deleteRequest (url:string, config:any={}) {
        try {
            this.#setHeaders(config);
            let response = await axiosInstance.delete(url,this.#config)  
            return response
        } catch (exception) {
          throw exception  
        }
    }
}

export default HttpService;