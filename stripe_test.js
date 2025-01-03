const stripe = require('stripe')('sk_test_51QMXdYKnMrOrikIS5ZZOIbiHw96YXuLPqhGpwICNVwFqzRBgvMmhb89lafUOBXKI3wYsU6YreMJmGDRlWH1jrEb000qzHFGq4v');

stripe.products.create({
  name: '50 GOLD',
  description: '50 GOLD for shop.',
}).then(product => {
  stripe.prices.create({
    unit_amount: 1000,
    currency: 'cad',
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your product id: ' + product.id);
    console.log('Success! Here is your price id: ' + price.id);
  });
});