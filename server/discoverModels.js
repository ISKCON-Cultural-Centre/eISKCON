var _ = require('lodash');
var path = require('path');
var fs = require('fs');
var loopback = require('loopback');

var outputPath = path.resolve(__dirname, '../common/models');
var ds = loopback.createDataSource('mysql', require('../server/datasources').local);

ds.discoverModelDefinitions({ schema: 'icc' }, function (err, models) {

    var count = models.length;

  _.each(models, function(model){
    ds.discoverSchema(model.name, {  associations: true }, function(err, schema){
      var outputName = outputPath + '/' +schema.name + '.json';
      fs.writeFile(outputName, JSON.stringify(schema, null, 2), function(err) {
        if(err) {
          console.log(err);
        } else {
          console.log("JSON saved to " + outputName);
        }
      });
      fs.writeFile(outputPath + '/' + schema.name + '.js', jsFileString(schema.name), function(err) {
        if (err) throw err;
        console.log('Created ' + schema.name + '.json file');
      });
      count = count - 1;
      if (count === 0) {
        console.log("DONE!", count);
        ds.disconnect();
        return;
      }
    });
  })
});
