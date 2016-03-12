var elements = document.getElementsByTagName('*');

function toTitleCase(str){
    return str.replace(new RegExp('\\w+', 'g'), function(thing){
        return thing.charAt(0).toUpperCase() + thing.substr(1).toLowerCase();
    });
}


var wordsToReplace = [
    ['up|down|left|right', 'up up down down left right left right B A']
];

for(var i = 0; i < elements.length; i++){
    var element = elements[i];

    if(element.tagName !== "SCRIPT" && element.tagName !== "STYLE"){
        for(var j = 0; j < element.childNodes.length; j++){
            var node = element.childNodes[j];

            if(node.nodeType === 3){
                var text = node.nodeValue;
                var replacedText = text;
                for(var k = 0; k < wordsToReplace.length; k++){
                    var wordToReplace = wordsToReplace[k];
                    replacedText = replacedText
                        .replace(new RegExp('\\b(' + wordToReplace[0] + ')\\b', 'g'), wordToReplace[1])
                        .replace(new RegExp('\\b(' + toTitleCase(wordToReplace[0]) + ')\\b', 'g'), toTitleCase(wordToReplace[1]));
                }
                if(replacedText !== text){
                    element.replaceChild(document.createTextNode(replacedText), node);
                }
            }
        }
    }
}