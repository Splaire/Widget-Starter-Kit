require 'sinatra'
require 'json'
require 'open-uri'
require 'erb'

configure do
  set :views, '.'
end

get '/' do
  _file      = File.read('./src/params.json') rescue nil
  @options   = _file.nil? ? [] : JSON.parse(_file)

  def getParam(*keys)
    startParams = @options
    keys.each do |key|
      val = startParams[key]
      if val
        unless val.is_a?(Hash) || val.is_a?(Array)
          return val
        end

        startParams = val
      else
        return nil
      end
    end
  end

  ERB.new( File.read('dist/index.html') ).result(binding)
end

get '/preview' do
  erb :preview
end
