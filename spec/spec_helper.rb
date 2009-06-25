require File.join(File.dirname(__FILE__), '/../app')
require 'spec'
require 'spec/autorun'
require 'spec/interop/test'
require 'rack/test'

set :environment, :test

def app
  Sinatra::Application
end
