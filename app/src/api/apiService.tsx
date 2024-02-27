let apiBaseUrl = '';

// @ts-ignore
export const GRAFANA_URL = window._env_.REACT_APP_GRAFANA_URL;

export const setApiBaseUrl = (url: string) => {
    apiBaseUrl = url;
}

export const buildUrl = (endpoint: string) => {
    return `${apiBaseUrl}${endpoint}`;
}

function defaultOptions(options: any): RequestInit {
    const update = {...options};
    update.mode = 'cors';
    update.headers = {...update.headers, 'Content-Type': 'application/json'};
    update.headers = {...update.headers, "Origin": 'http://localhost:3001'};
    return update;
}

export const sendGetRequest = async (url: string): Promise<any> => {
    let input = buildUrl(url);
    // const init = defaultOptions({method: 'GET'});
    const res = await fetch(input, defaultOptions({method: 'GET'}));
    return await res.json();
};

export const sendPostRequest = async (url: string, body: any): Promise<boolean> => {
    let bodyAsJson = JSON.stringify(body);
    const res = await fetch(buildUrl(url), defaultOptions({method: 'POST', body: bodyAsJson}));
    if (!res.ok) {
        return false;
    }
    return true;
};

export const sendPostRequestExpectResponse = async (url: string, body: any): Promise<boolean> => {
    let bodyAsJson = JSON.stringify(body);
    const res = await fetch(buildUrl(url), defaultOptions({method: 'POST', body: bodyAsJson}));
    if (!res.ok) {
        throw await res.json();
    }
    return await res.json();
};

export const sendPostRequestWithAttachment = async (url: string, file: File): Promise<boolean> => {
    const formData = new FormData();
    formData.append('file', file);
    let requestInit = {method: 'POST', body: formData} as RequestInit;
    const res = await fetch(buildUrl(url), requestInit);
    if (!res.ok) {
        throw await res.json();
    }
    return true;
};

export const sendPostRequestExpectBody = async (url: string, body: any): Promise<any> => {
    let bodyAsJson = JSON.stringify(body);
    const res = await fetch(buildUrl(url), defaultOptions({method: 'POST', body: bodyAsJson}));
    if (!res.ok) {
        throw await res.json();
    }
    return await res.json();
};

export const sendPutRequest = async (url: string, body: any): Promise<any> => {
    let bodyAsJson = JSON.stringify(body);
    const res = await fetch(buildUrl(url), defaultOptions({method: 'PUT', body: bodyAsJson}));
    if (!res.ok) {
        return false;
    }
    return true;
};

export const sendDeleteRequest = async (url: string): Promise<boolean> => {
    const res = await fetch(buildUrl(url), defaultOptions({method: 'DELETE'}));
    if (!res.ok) {
        let response = await res.json();
        if (response.status === "UNPROCESSABLE_ENTITY") {
            return false;
        } else {
            throw response;
        }
    }
    return true;
};

export const externalGet = async (url: string): Promise<any> => {
    // const init = defaultOptions({method: 'GET'});
    const res = await fetch(url, {method: 'GET'});
    return await res.json();
};
