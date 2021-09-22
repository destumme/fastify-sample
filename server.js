'use strict'

const Fastify = require('fastify')
const mercurius = require('mercurius')
const fs = require('fs')
const path = require('path')

const app = Fastify({logger: true})

const schema = fs.readFileSync(path.join(__dirname, 'schema.graphql')).toString('utf-8')

const resolvers = {
  Query: {
    books: async (_) => [
        {
            title: 'Frankenstein',
            author: 'Mary Shelley'
        }
    ]
  }
}

app.register(mercurius, {
  schema,
  resolvers
})

app.get('/', async function (req, reply) {
  const query = `{
    books{
      title
      author
    }
  }`
  return reply.graphql(query)
})

app.listen(3000)