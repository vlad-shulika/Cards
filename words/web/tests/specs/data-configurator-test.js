describe("DataConfigurator", function() {
    var dataConfigurator;

    beforeEach(function() {
        dataConfigurator = new DataConfigurator();
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
        results = dataConfigurator._parseLanguages(languages.results);
        expect(results.length).toEqual(languages.count);
    });

    it("should be able to parse phrases", function(){
        
        languageResults = dataConfigurator._parseLanguages(languages.results);
        expect(languageResults.length).toEqual(languages.count);

        results = dataConfigurator._parsePhrases(phrases.results, languageResults);
        expect(results.length).toEqual(phrases.count);
    });

    it("should be able to parse cards", function(){
        languageResults = dataConfigurator._parseLanguages(languages.results);
        expect(languageResults.length).toEqual(languages.count);

        phraseResults = dataConfigurator._parsePhrases(phrases.results, languageResults);
        expect(phraseResults.length).toEqual(phrases.count);

        cardsResults = dataConfigurator._parseCards(cards.results, phraseResults);
        expect(cardsResults.length).toEqual(cards.count);
    });

    it("should be able do whole flow by calling callback function", function(){
        dataConfigurator.downloadCallback(0, languages);
        dataConfigurator.downloadCallback(1, phrases);
        dataConfigurator.downloadCallback(2, cards);

        expect(dataConfigurator.parsedData.completeData).toEqual(true);
        expect(dataConfigurator.parsedData.languages.length).toEqual(languages.count);
        expect(dataConfigurator.parsedData.phrases.length).toEqual(phrases.count);
        expect(dataConfigurator.parsedData.cards.length).toEqual(cards.count);
    });
});
