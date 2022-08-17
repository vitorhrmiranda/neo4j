import { faker } from '@faker-js/faker/locale/pt_BR';
import neo4j from 'neo4j-driver'

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
const session = driver.session()
const count = 100

try {

  for (let serie = 1; serie <= count; serie++) {
    await session.run(`CREATE (Turma:Turma {serie: $serie})`, {serie: serie})

    for (let i = 0; i<faker.random.numeric(2); i++) {
      const c = `
        MATCH (Turma:Turma {serie: $serie})
        CREATE
          (Aluno:Aluno {nome: $nome, nascimento: date($nascimento)}),
          (Endereco:Endereco {rua: $rua, numero: $numero, bairro: $bairro, cidade: $cidade, estado: $estado}),
          (Aluno)-[:MORA]->(Endereco),
          (Aluno)-[:FREQUENTA]->(Turma)
      `
      const adrr = faker.address

      await session.run(
        c, {
          nome: faker.name.fullName(),
          nascimento: faker.date.birthdate({ min: 1990, max: 2020, mode: 'year' }).toISOString().split('T')[0],
          rua: adrr.street(),
          numero: adrr.buildingNumber(),
          bairro: adrr.country(),
          cidade: adrr.cityName(),
          estado: adrr.stateAbbr(),
          serie: serie
        }
      )
    }
  }
} catch(e) {
  console.error(`Error: ${e}`)
} finally {
  await session.close()
}

// on application exit:
await driver.close()
