/* eslint-env node */

function getProviders(callback) {
  setTimeout(function () {
    callback(null, ['Alemán', 'Santana']);
  }, 100);
}

function getServices(provider, callback) {
  var services = {
    Alemán: ['Odontología'],
    Santana: ['Guradia']
  };
  setTimeout(function () {
    callback(null, services[provider]);
  }, 100);
}

function renderProviders() {
  getProviders(function (err, providers) {
    if (err) {
      console.log('Error: ', err.message);
      return;
    }
    providers.forEach(function (provider) {
      getServices(provider, function (err, services) {
        if (err) {
          console.log('Error: ', err.message);
          return;
        }
        if (!services) {
          throw new Error('No hay servicios');
        }
        console.log(provider, services);
      });
    });
  });
}

renderProviders();
