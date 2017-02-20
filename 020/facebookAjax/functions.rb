
# Reads a file
#
# fileLocation --Where the file is located <string
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
