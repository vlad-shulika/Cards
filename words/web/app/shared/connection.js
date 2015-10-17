/*
        connection = new Connection();
        connection.setHost("http://localhost:8001");
        connection.connect();
 */

function Connection() {
    this._host = null;
};

Connection.OBJECT_TYPES = {
    LANGUAGE : 0,
    PHRASE : 1,
    CARD : 2,
    _urls : {
        LANGUAGE : "languages.json",
        PHRASE : "phrases.json",
        CARD : "translations.json",
    }
};

Connection.ERRORS = {
    NO_ERROR : 0,
    TYPE_IS_NOT_SUPPORTED : 1,
    CANNOT_RECEIVE_DATA : 2
};

Connection.prototype.setHost = function(host) {
    this._host = host;
};

Connection.prototype.connect = function() {
    if (this._host === null) {
        throw ({'Not initialised': 'data'});
    }
};

Connection.prototype.download = function(type, params, callback) {
    var _object_name = this._is_type_supported(type);
    if (_object_name === null) {
        callback(Connection.ERRORS.TYPE_IS_NOT_SUPPORTED, null);
        return;
    }
    
    var _url = Connection.OBJECT_TYPES._urls[_object_name];
    _url = this._host + _url;
    
    this._download_data_by_url(_url, callback);
};

Connection.prototype._download_data_by_url = function(url, callback) {
    $.get(url, {})
        .done(function(loadedData) {
            callback(Connection.ERRORS.NO_ERROR, loadedData);
        })
        .fail(function(){
            callback(Connection.ERRORS.CANNOT_RECEIVE_DATA, {});
        });

};

Connection.prototype._is_type_supported = function(type_name) {
    for (var object_type in Connection.OBJECT_TYPES) {
        if (Connection.OBJECT_TYPES[object_type] == type_name) {
            return object_type;
        }
    }
    return null;
};

