class Card {
    constructor() {
        this.phrases = [];
    }
    configure(raw_data, phrases) {
        this.id = raw_data.url;
        this.phrases = [];
        this.phrases = this.prepare_phrases(raw_data.translations, phrases);
    }
    prepare_phrases(raw_phrases, parsed_phrases) {
        _output_phrases = [];
        raw_phrases.forEach(function(url) {
            for (mPhrase of parsed_phrases) {
                if (mPhrase.id == url) {
                    _output_phrases.push(mPhrase);
                    break;
                }
            }
        });
        return _output_phrases;
    }
    removePhraseFromCardById(phrases, phrase_id) {
        for (_id in phrases) {
            if (phrases[_id].id === phrase_id) {
                phrases.splice(_id, 1);
                return;
            }
        }
    }
    addPhraseToCard(phrase_item) {
        this.phrases.push(phrase_item);
    }
    removePhraseFromCard(phrase_item) {
        this.removePhraseFromCardById(this.phrases, phrase_item.id);
    }
}






