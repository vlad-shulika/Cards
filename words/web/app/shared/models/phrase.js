function Phrase(){

}

//{"id" : 1, "phrase" : "Some phrase 1", "language" : 1}
Phrase.prototype.configure = function(raw_data, languages) {
    this.id = raw_data.url;
    this.phrase = raw_data.phrase;
    this.language = this.prepare_language(raw_data.language, languages);
};

Phrase.prototype.prepare_language = function(language_id, languages) {
    _output_language_model = null;

    for (language of languages){
        if (language.id === language_id){
            _output_language_model = language;
            break;
        }
    }
    return _output_language_model;
};
