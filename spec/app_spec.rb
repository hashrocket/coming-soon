require_relative '../app'
require 'rack/test'

describe 'The application' do
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  it 'logs an email' do
    expect(SignupLog).to receive(:info).with("Attempting to sign up me@example.com")
    post '/members/', member: { email: 'me@example.com' }
  end
end
