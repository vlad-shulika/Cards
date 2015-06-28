function Language () {
}

Language.prototype.configure = function(raw_data) {
    this.id = raw_data.id;
    this.name = raw_data.name;
};