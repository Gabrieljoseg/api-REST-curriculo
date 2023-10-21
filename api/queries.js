const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE,
});

const getCurriculos = (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getCurriculoByNome = (request, response) => {
  const nome = request.params.nome;

  pool.query('SELECT * FROM curriculo WHERE nome = $1', [nome], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const createCurriculo = (request, response) => {
  const {
    nome,
    sobrenome,
    email,
    telefone,
    formacao_academica,
    curso,
    inicio_curso,
    fim_curso
  } = request.body;

  pool.query(
    'INSERT INTO curriculo (nome, sobrenome, email, telefone, formacao_academica, curso, inicio_curso, fim_curso) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
    [nome, sobrenome, email, telefone, formacao_academica, curso, inicio_curso, fim_curso],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`User added with ID: ${results.rows[0].id}`);
    }
  );
}

const updateCurriculo = (request, response) => {
  const id = parseInt(request.params.id);
  const {
    nome,
    sobrenome,
    email,
    telefone,
    formacao_academica,
    curso,
    inicio_curso,
    fim_curso
  } = request.body;

  pool.query(
    'UPDATE curriculo SET nome = $1, sobrenome = $2, email = $3, telefone = $4, formacao_academica = $5, curso = $6, inicio_curso = $7, fim_curso = $8 WHERE id = $9',
    [nome, sobrenome, email, telefone, formacao_academica, curso, inicio_curso, fim_curso, id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
}

const deleteCurriculo = (request, response) => {
  const id = parseInt(request.params.id);

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
}

module.exports = {
  getCurriculos,
  getCurriculoByNome,
  createCurriculo,
  updateCurriculo,
  deleteCurriculo,
};
