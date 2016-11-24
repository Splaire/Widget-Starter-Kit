require 'sinatra'
require 'json'
require 'open-uri'
require 'erb'

configure do
  set :views, '.'
end

get '/' do
  _file      = File.read('./src/params.json') rescue nil
  _options   = _file.nil? ? [] : JSON.parse(_file)

  @options = {}
  _options.each do |k,v|
    @options[k.to_sym] = v
  end

  ERB.new( File.read('dist/index.html') ).result(binding)
end

get '/preview' do
  erb :preview
end
