import fetch from 'node-fetch';

let promiseRejectionHandler = (error) => {
    console.warn(error.message);
}

class ApiHelper {
    constructor(server, config) {
        this.server = server;
        if(config) {
            this.defaultParams = config.defaultParams;
            this.contentType = config.contentType;
        }
    };

    getResourceUrl(resource) {
        return this.server + resource;
    }

    createGetUrl(resource, params) {
        let url = this.getResourceUrl(resource);
        params = ApiHelper.removeNullParams(params);
        if (this.defaultParams || params) {
            let esc = encodeURIComponent;
            let allParams = Object.assign({}, params, this.defaultParams);
            let data = Object.keys(allParams)
                .map(k => esc(k) + '=' + esc(allParams[k]))
                .join('&');
            return url + "?" + data;
        }
        return url;
    }

    static removeNullParams(params) {
        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] == null) {
                    delete params[key];
                }
            });
            return params;
        }
        return null;
    }

    async makeGetRequest(args, resolve, reject = (error) => {
        throw new Error(`The resolve handler failed to run when making a request to ${url}.\nError: ${error.message}\n`);
    }) {
        let url = this.createGetUrl(args.resource, args.params);
        //Fetch returns a JS promise object.
        try {
            let response = await fetch(url);
            console.log(url);
            if (response.ok) {
                if (this.contentType == 'json') {
                    let jsonBody = await response.json();
                    if (args.responseObject && jsonBody[args.responseObject]) {
                        return jsonBody[args.responseObject];
                    }
                    return jsonBody;
                }
                return response;
            }
            throw new Error(`Network Response was not OK for query to: ${url}\nError: ${response.statusText}\n`);
        }
        catch (error) {
            promiseRejectionHandler(error);
        }
    }
}

export default ApiHelper;
