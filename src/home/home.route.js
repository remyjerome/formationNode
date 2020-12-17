module.exports = function setHomeRoute(app){
  app.get('/', (req, res) => {
    res.render('home.twig', {
      message: 'Hello world'
    });
  });
    
  app.get('/coucou', (req, res) => {
    res.send('Orange!');
  });
};