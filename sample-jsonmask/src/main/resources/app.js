var Router = require("Router");
var appRouter = new Router();

var weatherObj = require('/data/weather.json');
var jsonmask = require('json-mask');

appRouter.get('/weather',function(req,res) {
  var result = weatherObj;
  if (req.parameters.fields) {
    result = jsonmask(result,req.parameters.fields);
  }
  res.setBody(result);
});

appRouter.get('/weather/now',function(req,res) {
  res.setBody(jsonmask(weatherObj,'currentConditions'));
});

appRouter.get('/weather/yesterday',function(req,res) {
  res.setBody(jsonmask(weatherObj,'yesterdayConditions'));
});
  
appRouter.all('/*catchall', function(req,res) {
  res.setBody({
    note:'Running JSON Mask on prerecorded weather data. JSON Mask provided by https://github.com/nemtsov/json-mask',
    links :[
    {rel: 'Original weather object', href: baseUrl+'/weather'},
    {rel: 'Toronto weather now', href: baseUrl+'/weather/now'},
    {rel: 'Toronto weather yesterday', href: baseUrl+'/weather/yesterday'},
    {rel: 'Toronto weather now, only temperature and condition', href: baseUrl+'/weather?fields=currentConditions(condition,temperature)'},
    {rel: 'Toronto forecast, only temperature and condition', href: baseUrl+'/weather?fields=forecastGroup/forecast(period/@textForecastName,abbreviatedForecast/textSummary,temperatures/temperature)'}
  ]});
});

module.exports = appRouter;
