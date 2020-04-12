//
//https://github.com/PacktPublishing/Hands-on-Machine-Learning-with-TensorFlow.js/tree/master/Section5_4
//
exports.render = function (req, res) {
    // var fs = require('fs');
    // var articled = fs.readFileSync("/ar.txt", 'utf8');
    // console.log(articled);
    const articledmain = require('../../article1.json')
    const articled = articledmain.text;
    const articledmain2 = require('../../article2.json')
    const articled2 = articledmain2.text;
    // console.log(textss.text);
    const summarize = (article, maxSentences = 3) => {
        const compromise = require('compromise');
        const natural = require('natural');

        const sentences = compromise(article).sentences().out('array');
        const db = new natural.TfIdf();
        const tokenizer = new natural.WordTokenizer();
        const stemmer = natural.PorterStemmer.stem;
        const stemAndTokenize = text => tokenizer.tokenize(text).map(token => stemmer(token));
        const scoresMap = {};


        // Add each sentence to the document
        sentences.forEach(sentence => db.addDocument(stemAndTokenize(sentence)));

        stemAndTokenize(article).forEach(token => {
            db.tfidfs(token, (sentenceId, score) => {
                if (!scoresMap[sentenceId]) scoresMap[sentenceId] = 0;
                scoresMap[sentenceId] += score;
            });
        });

        // Convert our scoresMap into an array so that we can easily sort it
        let scoresArray = Object.entries(scoresMap).map(item => ({ score: item[1], sentenceId: item[0] }));
        // Sort the array by descending score
        scoresArray.sort((a, b) => a.score < b.score ? 1 : -1);
        // Pick the top maxSentences sentences
        scoresArray = scoresArray.slice(0, maxSentences);
        // Re-sort by ascending sentenceId
        scoresArray.sort((a, b) => parseInt(a.sentenceId) < parseInt(b.sentenceId) ? -1 : 1);
        // Return sentences
        return scoresArray
            .map(item => sentences[item.sentenceId])
            .join('. ');

    }
    // console.log(summarize(articled, 3));
    // console.log(summarize(articled2, 3));
    res.status(200).json(summarize(articled, 3), summarize(articled2, 3));

    // var array={}
    const arr1 = summarize(articled, 3);
    const arr2 = summarize(articled2, 3);
    // res.status(200).json(arr1);
    // res.json(arr1);

    // res.render('results',
    //     {

    //         resultForTest1: summarize(articled, 3),
    //         resultForTest2: summarize(articled2, 3)

    //     }
    // )
    // console.log(summarize(articled, 3));
    // console.log(summarize(articled2, 3));
};