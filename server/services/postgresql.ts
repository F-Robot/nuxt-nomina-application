import pg from 'pg'
const { Client } = pg

class PgService {
  client: pg.Client

  constructor() {
    this.client = new Client({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DATABASE,
      port: parseInt(process.env.DB_PORT),
    })
    this.connect()
  }
  async connect() {
    await this.client.connect()
  }
  async disconnect() {
    await this.client.end()
  }
  async query<T>(query: string, values?: any[]) {
    const res = await this.client.query<T>(query, values)
    console.log('Success query: ', query)
    return res
  }
}

export default new PgService()
