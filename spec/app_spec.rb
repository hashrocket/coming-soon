require File.join(File.dirname(__FILE__), "spec_helper.rb")

describe 'Application' do
  include Rack::Test::Methods

  describe "registering a member" do
    it "logs signup attempts" do
      SignupLog.should_receive(:info).with("Attempting to sign up me@example.com")
      post '/members/', :member => {'email' => 'me@example.com'}
    end
  end
end

