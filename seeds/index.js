import { faker } from '@faker-js/faker/locale/pt_BR';
import neo4j from 'neo4j-driver'

const driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "neo4j"))
const session = driver.session()

try {
  const c = `
    CREATE
      (Aluno:Aluno {nome: $nome, nascimento: datetime($nascimento)}),
      (Endereco:Endereco {rua: $rua, numero: $numero, bairro: $bairro, cidade: $cidade, estado: $estado}),
      (Turma:Turma {serie: $serie}),
      (Aluno)-[:MORA]->(Endereco),
      (Aluno)-[:FREQUENTA]->(Turma)
    RETURN Aluno, Endereco, Turma
  `
  const result = await session.run(
    c, {
      nome: faker.name.fullName(),
      nascimento: faker.date.birthdate().toISOString(),
      rua: faker.address.street(),
      numero: faker.address.buildingNumber(),
      bairro: faker.address.country(),
      cidade: faker.address.cityName(),
      estado: faker.address.state(),
      serie: faker.random.numeric(1)
    }
  )

  const singleRecord = result.records[0]
  const node = singleRecord.get(0)

  console.log(node.properties.nome)
} catch(e) {
  console.error(`Error: ${e}`)
} finally {
  await session.close()
}

// on application exit:
await driver.close()
