
# Reads a files text
#
# fileLocation --Where the file is <string
#
# returns the files contents as a string

def readFile(fileLocation)
	fileContents = ""

    dataFromFile = File.open(fileLocation,"r")

    dataFromFile.each_line do |line|
    	fileContents += line
    end

    dataFromFile.close
    return fileContents
end

# Builds HTML from jsonData
# 
# jsonData --object or array
# 
# returns the the jsonData with html tags, as a string

def buildHTML(jsonData)
	htmlString = "<div>"
	i = 0
	while i < 10 do
		keys = jsonData[i].keys
		htmlString += "<p>"
		keys.each do |key|
			htmlString += "#{key}: #{jsonData[i][key]}<br>"
		end
		htmlString += "</p>"
		i += 1
	end
	htmlString += "</div>"
	return htmlString
end
