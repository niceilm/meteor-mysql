var mysql = Npm.require('mysql');

MySQL = {
  mysql: mysql,
  getClusterName: getClusterName,
  loadSettings: loadSettings
};

function loadSettings(mysqlOption, index) {
  if(_.isArray(mysqlOption)) {
    _.forEach(mysqlOption, loadSettings);
  } else {
    if(!_.isUndefined(index)) {
      if(index === 0) {
        MySQL.poolCluster = mysql.createPoolCluster();
      }
      MySQL.poolCluster.add(getClusterName(index), mysqlOption);
    } else if(mysqlOption.host) {
      MySQL.pool = mysql.createPool(mysqlOption);
    } else if(mysqlOption.hosts) {
      var hosts = mysqlOption.hosts;
      var options = _.omit(mysqlOption, "hosts");
      var inIndex = 0;
      _.forEach(hosts, function(host) {
        var config = _.defaults({host: host}, options);
        loadSettings(config, inIndex);
        inIndex++;
      });
    }
  }
}

function getClusterName(index) {
  return 'CLUSTER_' + _.padLeft(index, 2, "0");
}