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
    this.userName = 'Andrii';
    this.connectionManager = null;
    this._observers = {};
};

DataConfigurator.prototype._cleanTemporaryData = function() {
    this.loadedData.languages = null;
    this.loadedData.cards = null;
    this.loadedData.phrases = null;
};

DataConfigurator.prototype.createNewCard = function() {
    var _newCard = new Card();
    this.parsedData.cards.push(_newCard);
};

DataConfigurator.prototype.updateCard = function(card) {
    // FIXME: send data to server using ConnectionManager
};

DataConfigurator.prototype.setConnectionManager = function(connectionManager) {
    this.connectionManager = connectionManager;
};

DataConfigurator.prototype.registerObserver = function(name, callback) {
    this._observers[name] = callback;
};

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
        this.loadedData.languages = rawData.results;
    } else if (dataType === 1) { // 1 - phrases
        this.loadedData.phrases = rawData.results;
    } else if (dataType === 2) { // 2 - cards
        this.loadedData.cards = rawData.results;
    }

    if (this.loadedData.languages !== null &&
        this.loadedData.phrases !== null &&
        this.loadedData.cards !== null){
        this.parsedData.languages = this._parseLanguages(this.loadedData.languages);
        this.parsedData.phrases = this._parsePhrases(this.loadedData.phrases, this.parsedData.languages);
        this.parsedData.cards = this._parseCards(this.loadedData.cards, this.parsedData.phrases);
        this.parsedData.completeData = true;
        this._cleanTemporaryData();
        this.notifyObservers();
    }
};

DataConfigurator.prototype.notifyObservers = function() {
   for (var observer_key in this._observers) {
       this._observers[observer_key]();
   }
};

DataConfigurator.prototype.init = function() {
    if (this.connectionManager == null) {
        return;
    }
    
    var boundDownloadCallbackLanguage = (function(error, data) {
        if (error === 0) {
            this.downloadCallback(0, data);
        }
    }).bind(this);

    var boundDownloadCallbackPhrase = (function(error, data) {
        if (error === 0) {
            this.downloadCallback(1, data);
        }
    }).bind(this);

    var boundDownloadCallbackCard = (function(error, data) {
        if (error === 0) {
            this.downloadCallback(2, data);
        }
    }).bind(this);

    this.connectionManager.download(Connection.OBJECT_TYPES.LANGUAGE, {}, boundDownloadCallbackLanguage);

    this.connectionManager.download(Connection.OBJECT_TYPES.PHRASE, {}, boundDownloadCallbackPhrase);

    this.connectionManager.download(Connection.OBJECT_TYPES.CARD, {}, boundDownloadCallbackCard);
}

angular.module("cardsApp").service('DataConfiguratorService', DataConfigurator);
