require 'sinatra'
require 'json'
require_relative 'functions.rb'

get "/" do
	erb :index
end

get "/post" do 
	fileText = readFile("data/facebookJSON.txt")
	fileText
end
