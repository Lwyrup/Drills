require "sinatra"
require "json"
require_relative "functions.rb"

get "/" do
    erb :home
end

get "/people" do
 	fileText = readFile("views/info.erb")
    json = JSON.parse(fileText)
	buildHTML(json)
end
