describe("DataConfiguration", function() {
    var DataConfiguration;

    beforeEach(function() {
        DataConfiguration = new DataConfiguration();
        languages = {
            "count": 4,
            "next": null,
            "previous": null,
            "results": [
                {
                    "name": "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
                    "url": "http://127.0.0.1:8000/languages/2.json"
                },
                {
                    "name": "English",
                    "url": "http://127.0.0.1:8000/languages/3.json"
                },
                {
                    "name": "Czech",
                    "url": "http://127.0.0.1:8000/languages/4.json"
                },
                {
                    "name": "Detch",
                    "url": "http://127.0.0.1:8000/languages/5.json"
                }
            ]
        };

        phrases = {
            "count": 3,
            "next": null,
            "previous": null,
            "results": [
                {
                    "language": "http://127.0.0.1:8000/languages/3.json",
                    "phrase": "Dog",
                    "url": "http://127.0.0.1:8000/phrases/1.json"
                },
                {
                    "language": "http://127.0.0.1:8000/languages/2.json",
                    "phrase": "\u0421\u043e\u0431\u0430\u043a\u0430",
                    "url": "http://127.0.0.1:8000/phrases/2.json"
                },
                {
                    "language": "http://127.0.0.1:8000/languages/4.json",
                    "phrase": "Pes",
                    "url": "http://127.0.0.1:8000/phrases/3.json"
                }
            ]
        };

        cards = {
            "count": 1,
            "next": null,
            "previous": null,
            "results": [
                {
                    "translations": [
                        "http://127.0.0.1:8000/phrases/1.json",
                        "http://127.0.0.1:8000/phrases/2.json",
                        "http://127.0.0.1:8000/phrases/3.json"
                    ],
                    "url": "http://127.0.0.1:8000/translations/1.json"
                }
            ]
        };
    });

    it("should be able to parse languages", function(){
        results = DataConfiguration._parseLanguages(languages.results);
        expect(results.length).toEqual(languages.count);
    });

    it("should be able to parse phrases", function(){
        
        languageResults = DataConfiguration._parseLanguages(languages.results);
        expect(languageResults.length).toEqual(languages.count);

        results = DataConfiguration._parsePhrases(phrases.results, languageResults);
        expect(results.length).toEqual(phrases.count);
    });

    it("should be able to parse cards", function(){
        languageResults = DataConfiguration._parseLanguages(languages.results);
        expect(languageResults.length).toEqual(languages.count);

        phraseResults = DataConfiguration._parsePhrases(phrases.results, languageResults);
        expect(phraseResults.length).toEqual(phrases.count);

        cardsResults = DataConfiguration._parseCards(cards.results, phraseResults);
        expect(cardsResults.length).toEqual(cards.count);
    });

    it("should be able do whole flow by calling callback function", function(){
        DataConfiguration.downloadCallback(0, languages);
        DataConfiguration.downloadCallback(1, phrases);
        DataConfiguration.downloadCallback(2, cards);

        expect(DataConfiguration.parsedData.completeData).toEqual(true);
        expect(DataConfiguration.parsedData.languages.length).toEqual(languages.count);
        expect(DataConfiguration.parsedData.phrases.length).toEqual(phrases.count);
        expect(DataConfiguration.parsedData.cards.length).toEqual(cards.count);
    });
});
