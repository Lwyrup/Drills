arr = ["absconder", "absconders", "absconding", "absconds", "abseil", 
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
    "abstemiousness", "abstemiousnesses", "abstention", "abstentions", "abstentious", "absterge"]
rarr = []

i = 0
while i < arr.length do
    if arr[i].include?"a" and
    arr[i].include?"e" and
    arr[i].include?"i" and
    arr[i].include?"o" and
    arr[i].include?"u" and
    arr[i].index("a") < arr[i].index("e") and
    arr[i].index("e") < arr[i].index("i") and
    arr[i].index("i") < arr[i].index("o") and
    arr[i].index("o") < arr[i].index("u") and
    (arr[i].split("a") < arr.length-1 == 1) and
    (arr[i].split("e") < arr.length-1 == 1) and
    (arr[i].split("i") < arr.length-1 == 1) and
    (arr[i].split("o") < arr.length-1 == 1) and
    (arr[i].split("u") < arr.length-1 == 1) 
        puts "Zzzz..."
    end
    i += 1
end