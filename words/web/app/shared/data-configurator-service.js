function DataConfigurator () {
    this.loadedData = {
        languages : null,
        phrases : null,
        cards : null
    };
    this.parsedData = {
        languages: [],
        phrases : [],
        cards : [],
        completeData : false
    };
    this.searchResults = [];
    this.userName = 'Andrii';
}

DataConfigurator.prototype._parseLanguages = function(rawData) {
    _configuredLanguages = [];

    rawData.forEach(function(languageObject){
        var _language = new Language();
        _language.configure(languageObject);
        _configuredLanguages.push(_language);
    });

    return _configuredLanguages;
};

DataConfigurator.prototype._parsePhrases = function(rawData, parsedLanguages) {
    _phrasesWithLanguage = [];

    rawData.forEach(function(phrase){
        var _phrase = new Phrase();
        _phrase.configure(phrase, parsedLanguages);
        _phrasesWithLanguage.push(_phrase);
    });

    return _phrasesWithLanguage;
};

DataConfigurator.prototype._parseCards = function(rawData, parsedPhrases) {
    _parsedCards = [];

    rawData.forEach(function(item){
        var _card = new Card();
        _card.configure(item, parsedPhrases);
        _parsedCards.push(_card);
    });

    return _parsedCards;
};

DataConfigurator.prototype.downloadCallback = function(dataType, rawData) {
    if (dataType === 0) { // 0 - languages
        this.loadedData.languages = rawData;
    } else if (dataType === 1) { // 1 - phrases
        this.loadedData.phrases = rawData;
    } else if (dataType === 2) { // 2 - cards
        this.loadedData.cards = rawData;
    }

    if (this.loadedData.languages !== null &&
        this.loadedData.phrases !== null &&
        this.loadedData.cards !== null){
        this.parsedData.languages = this._parseLanguages(this.loadedData.languages);
        this.parsedData.phrases = this._parsePhrases(this.loadedData.phrases, this.parsedData.languages);
        this.parsedData.cards = this._parseCards(this.loadedData.cards, this.parsedData.phrases);
        this.parsedData.completeData = true;
    }
};

var cardsApp = angular.module("cardsApp", []);
cardsApp.factory('DataConfiguratorService', function(){
    var _dataConfigurator = new DataConfigurator();

    return _dataConfigurator;
});