var arr = ["absconder", "absconders", "absconding", "absconds", "abseil", 
    "abseiled", "abseiling", "abseils", "absence", "absences", "absent", 
    "absented", "absentee", "absenteeism", "absenteeisms", "absentees", 
    "absenter", "absenters", "absenting", "absently", "absentminded", 
    "absentmindedly", "absentmindedness", "absentmindednesses", "absents", 
    "absinth", "absinthe", "absinthes", "absinths", "absolute", "absolutely", 
    "absoluteness", "absolutenesses", "absoluter", "absolutes", "absolutest", 
    "absolution", "absolutions", "absolutism", "absolutisms", "absolutist", 
    "absolutistic", "absolutists", "absolutive", "absolutize", "absolutized", 
    "absolutizes", "absolutizing", "absolve", "absolved", "absolver", "absolvers", 
    "absolves", "absolving", "absonant", "absorb", "absorbabilities", "absorbability",
    "absorbable", "absorbance", "absorbances", "absorbancies", "absorbancy", 
    "absorbant", "absorbants", "absorbed", "absorbencies", "absorbency", 
    "absorbent", "absorbents", "absorber", "absorbers", "absorbing", "absorbingly", 
    "absorbs", "absorptance", "absorptances", "absorption", "absorptions", 
    "absorptive", "absorptivities", "absorptivity", "absquatulate", "absquatulated", 
    "absquatulates", "absquatulating", "abstain", "abstained", "abstainer", 
    "abstainers", "abstaining", "abstains", "abstemious", "abstemiously", 
    "abstemiousness", "abstemiousnesses", "abstention", "abstentions", "abstentious", "absterge"];
var rarr = [];

for(var i = 0; i < arr.length; i++){
    if(   arr[i].includes("a", "e", "i", "o", "u")
        &&arr[i].indexOf("a") < arr[i].indexOf("e")
        &&arr[i].indexOf("e") < arr[i].indexOf("i")
        &&arr[i].indexOf("i") < arr[i].indexOf("o")
        &&arr[i].indexOf("o") < arr[i].indexOf("u")
        &&(arr[i].split("a").length - 1) == 1
        &&(arr[i].split("e").length - 1) == 1
        &&(arr[i].split("i").length - 1) == 1
        &&(arr[i].split("o").length - 1) == 1
        &&(arr[i].split("u").length - 1) == 1){
            rarr.push(arr[i]);
    }

}
console.log(rarr);