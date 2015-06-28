function Card() {

}

// input params 
// {"id" : 1, "phrases" : [{"phrase_id": 1}, {"phrase_id" : 3}]}
Card.prototype.configure = function(raw_data, phrases) {
    this.id = raw_data.id;
    this.phrases = [];

    this.phrases = this.prepare_phrases(raw_data.phrases, phrases);
    
};

Card.prototype.prepare_phrases = function(raw_phrases, parsed_phrases) {
    _output_phrases = [];

    raw_phrases.forEach(function(phrase){
        for (mPhrase of parsed_phrases){
            if (mPhrase.id == phrase.phrase_id) {
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