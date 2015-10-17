function Language () {
}

Language.prototype.configure = function(raw_data) {
    this.id = raw_data.url;
    this.name = raw_data.name;
};
