const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'db.ovpcpzngrjakaabavnnf.supabase.com',
  database: 'postgres',
  password: 's9z6gjEu5BdLaMS3',
  port: 5432,
 }
)

const getCurriculo= (request, response) => {
  pool.query('SELECT * FROM curriculo ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getNomeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT nome FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getSobrenomeById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT sobrenome FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getEmailById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT email FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getFormacaoAcademicaById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT formacao_academica FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getCursoById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT curso FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const getTelefoneById = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('SELECT telefone FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createCurriculo = (request, response) => {
  const { nome, sobrenome, email, telefone, formacao_academica, inicio_curso, fim_curso } = request.body

  pool.query('INSERT INTO curriculo (nome, sobrenome, email, telefone, formacao_academica, inicio_curso, fim_curso) VALUES ($1, $2) RETURNING *', [nome, email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results.rows[0].id}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { nome, email } = request.body

  pool.query(
    'UPDATE curriculo SET nome = $1, email = $2 WHERE id = $3',
    [nome, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM curriculo WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getCurriculo,
  getNomeById,
  getSobrenomeById,
  getEmailById,
  getFormacaoAcademicaById,
  getCursoById,
  getTelefoneById,
  createCurriculo,
  updateUser,
  deleteCurriculo,
};