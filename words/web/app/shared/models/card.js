function Card() {
    this.phrases = [];

}

Card.prototype.configure = function(raw_data, phrases) {
    this.id = raw_data.url;
    this.phrases = [];

    this.phrases = this.prepare_phrases(raw_data.translations, phrases);
    
};

Card.prototype.prepare_phrases = function(raw_phrases, parsed_phrases) {
    _output_phrases = [];

    raw_phrases.forEach(function(url){
        for (mPhrase of parsed_phrases){
            if (mPhrase.id == url) {
                _output_phrases.push(mPhrase);
                break;
            }
        }
    });

    return _output_phrases;
};

Card.prototype.removePhraseFromCardById = function(phrases, phrase_id) {
    for (id in phrases) {
        if (phrases[id].id === phrase_id){
            phrases.splice(id, 1);
            return;
        }
    }
}

Card.prototype.addPhraseToCard = function(phrase_item){
    this.phrases.push(phrase_item);
}

Card.prototype.removePhraseFromCard = function(phrase_item){
    this.removePhraseFromCardById(this.phrases, phrase_item.id);
}
