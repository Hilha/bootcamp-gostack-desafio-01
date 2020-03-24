const express = require('express');
const server = express();
server.use(express.json());

//Query params = ?teste = 1 
//Route params = /users/1
//Request body = {"name": "Diego", "email": "diego@rocketseat.com.br"}
//CRUD = Create, Read, Update, Delete

const projects = [];

//Middleware - Checa se o projeto existe
function checkProjectExists(req, res, next){

  var indice = projects.indexOf(projects.filter(obj => {
    return obj.id == req.params.id;
  })[0]);

  if(!projects[indice]){
    return res.status(400).json(
      { error: 'Project does not exist!'}
    )
  }

  return next();
}

//Visualiza todos os projetos
server.get('/projects',(req, res) => {

  return res.json(projects)
})

//Cria um projeto
server.post('/project/new',(req, res) => {

  var project = { id: req.body.id, title: req.body.title, tasks : []};

  projects.push(project);

  return res.json(projects);
})

//Edita um projeto
server.put('/project/edit/:id',checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  var indice = projects.indexOf(projects.filter(obj => {
    return obj.id == id;
  })[0]);

  projects[indice].title = title;

  return res.json(projects);
})

//Deleta um projeto
server.delete('/project/delete/:id',checkProjectExists, (req, res) => {
  const { id } = req.params;

  var indice = projects.indexOf(projects.filter(obj => {
    return obj.id == id;
  })[0]);

  projects.splice(indice, 1);

  return res.send();
})

//Cria uma nova tarefa para um projeto
server.post('/project/:id/task/new',checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  
  var indice = projects.indexOf(projects.filter(obj => {
    return obj.id == id;
  })[0]);

  projects[indice].tasks.push(title);

  return res.json(projects[indice]);
})

server.listen(3000);