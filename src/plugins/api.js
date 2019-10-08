var api = class {
    static get baseUrl() {
        return "http://127.0.0.1:8080/api/";
    }

    static get timeout() {
        return 60 * 1000;
    }

    static fetch(url, init) {
        return new Promise(function(resolve, reject) {
            var timeout = setTimeout(function() {
                reject(new Error('Time out'));
            }, api.timeout);

            fetch(url, init)
                .then(function(response) {
                    clearTimeout(timeout);
                    if (!response.ok)
                        reject(new Error(response.statusText));

                    return response.json();
                })
                .then(function(data) {
                    resolve(data);
                })
                .catch(function(error) {
                    reject(error);
                });
        });
    }

    static get(url) {
        return api.fetch(url)
    }

    static post(url, data) {
        return api.fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    static put(url, data) {
        return api.fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });
    }

    static delete(url) {
        return api.fetch(url, {
            method: 'DELETE',
        });
    }
}

api.room = class {
    static get url() {
        return api.baseUrl + "rooms/";
    }

    static add(room) {
        return api.post(api.room.url, room);
    }

    static modify(room) {
        return api.put(api.room.url + room.id, room);
    }

    static delete(id) {
        return api.delete(api.room.url + id);
    }

    static get(id) {
        return api.get(api.room.url + id);
    }

    static getAll() {
        return api.get(api.room.url);
    }
}

api.device = class{
    static get url(){
        return api.baseUrl + "devices/"
    }

    static add(device) {
        return api.post(api.device.url, device);
    }

    static modify(device) {
        return api.put(api.device.url + device.id, device);

    }

    static delete(id){
        return api.delete(api.device.url + id);
    }
    static get(id) {
        return api.get(api.device.url + id);
    }

    static getAll(){
        return api.get(api.device.url);
    }

    static getState(id){
        return api.get(api.device.url + id + "/" + "state/");
    }

}

api.roomDevices = class{
    static get url(){
        return api.baseUrl + "rooms/";
    }
    static getDevices(roomId){
        return api.get(api.roomDevices.url + roomId + "/" + "devices/");
    }

    static addToRoom(roomId, deviceId){
        return api.post(api.roomDevices.url + roomId + "/" + "devices/" + deviceId + "/");
    }

    static deleteFromRoom(deviceId){
        return api.delete(api.roomDevices.url + deviceId);
    }
}