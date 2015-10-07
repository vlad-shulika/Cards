/*
        connection = new Connection();
        connection.setHost("http://localhost:8001");
        connection.connect();
 */

function Connection() {
    this._host = null;
    this._is_connected = false;
};

Connection.prototype._types = [
    "languages"
];

Connection.prototype.setHost = function(host) {
    this._host = host;
};

Connection.prototype.connect = function() {
    if (this._host === null) {
        throw ({'Not initialised': 'data'});
    }
    this._is_connected = true;
};

Connection.prototype.download = function(type, params, callback) {
    if (!this._is_type_supported(type)) {
        callback(1, null);
        return;
    }
    
    // add real http call here
    callback(0, {data: 'data'});

};

Connection.prototype._is_type_supported = function(type_name) {
    return (this._types.indexOf(type_name) != -1);    
};

