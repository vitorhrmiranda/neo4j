CREATE
  (Aluno:Aluno {nome: "Luiz Pedro Silva", nascimento: date("2003-01-10")}),
  (Endereco:Endereco {rua: "Rua Basilica", numero: 200, bairro: "Vila Osório", cidade: "São Pedro", estado: "RJ"}),
  (Turma:Turma {serie: "5B"}),
  (Aluno)-[:MORA]->(Endereco),
  (Aluno)-[:FREQUENTA]->(Turma)
RETURN Aluno, Endereco, Turma

MATCH (n:Aluno)-[r]->(m) WHERE duration.between(n.nascimento, date()).years > 15 RETURN n.nome, n.nascimento, duration.between(n.nascimento, date()).years AS age

MATCH (n:Endereco)
WITH DISTINCT n.cidade as cidade, n.bairro as bairro
MATCH (m:Endereco{cidade: cidade, bairro: bairro})
RETURN cidade, bairro, count(*) AS qtd
ORDER BY qtd

MATCH (n:Endereco)
WITH DISTINCT n.cidade as cidade
MATCH (:Endereco{cidade: cidade})
RETURN cidade, count(*) AS qtd
ORDER BY qtd DESC
