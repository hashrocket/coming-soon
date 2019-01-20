require 'sinatra'
require 'logger'

configure do
  SignupLog = Logger.new("log/signups.log")
  SignupLog.level = Logger::INFO
end

get '/' do
  erb :index
end

post '/members/?' do
  email = params[:member][:email]
  SignupLog.info "Attempting to sign up #{email}"
  status 200
end
