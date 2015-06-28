describe("DataConfigurator", function() {
    var dataConfigurator;

    beforeEach(function() {
        dataConfigurator = new DataConfigurator();
        languages = [
            {"id" : 1, "name" : "Russian" },
            {"id" : 2, "name" : "English" },
            {"id" : 3, "name" : "Czech" }
        ];

        phrases = [
            {"id" : 1, "phrase" : "Some phrase 1", "language" : 1},
            {"id" : 2, "phrase" : "Some phrase 1", "language" : 2},
            {"id" : 3, "phrase" : "Some phrase 1", "language" : 3},
            {"id" : 4, "phrase" : "Some phrase 2", "language" : 1},
            {"id" : 5, "phrase" : "Some phrase 3", "language" : 1}
        ];

        cards = [
            {"id" : 1, "phrases" : [{"phrase_id": 1}, {"phrase_id" : 3}]},
            {"id" : 2, "phrases" : [{"phrase_id": 2}, {"phrase_id" : 4}]},
            {"id" : 3, "phrases" : [{"phrase_id": 3}, {"phrase_id" : 5}]},
            {"id" : 4, "phrases" : [{"phrase_id": 4}, {"phrase_id" : 2}]}
        ];
    });

    it("should be able to parse languages", function(){
        results = dataConfigurator._parseLanguages(languages);
        expect(results.length).toEqual(3);
    });

    it("should be able to parse phrases", function(){
        
        languageResults = dataConfigurator._parseLanguages(languages);
        expect(languageResults.length).toEqual(3);

        results = dataConfigurator._parsePhrases(phrases, languageResults);
        expect(results.length).toEqual(5);
    });

    it("should be able to parse cards", function(){
        languageResults = dataConfigurator._parseLanguages(languages);
        expect(languageResults.length).toEqual(3);

        phraseResults = dataConfigurator._parsePhrases(phrases, languageResults);
        expect(phraseResults.length).toEqual(5);

        cardsResults = dataConfigurator._parseCards(cards, phraseResults);
        expect(cardsResults.length).toEqual(4);
    });

    it("should be able do whole flow by calling callback function", function(){
        dataConfigurator.downloadCallback(0, languages);
        dataConfigurator.downloadCallback(1, phrases);
        dataConfigurator.downloadCallback(2, cards);

        expect(dataConfigurator.parsedData.completeData).toEqual(true);
        expect(dataConfigurator.parsedData.languages.length).toEqual(3);
        expect(dataConfigurator.parsedData.phrases.length).toEqual(5);
        expect(dataConfigurator.parsedData.cards.length).toEqual(4);
    });
});
