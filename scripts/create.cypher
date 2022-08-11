CREATE
  (Aluno:Aluno {nome: "Luiz Pedro Silva", nascimento: date("2003-01-10")}),
  (Endereco:Endereco {rua: "Rua Basilica", numero: 200, bairro: "Vila Osório", cidade: "São Pedro", estado: "RJ"}),
  (Turma:Turma {serie: "5B"}),
  (Aluno)-[:MORA]->(Endereco),
  (Aluno)-[:FREQUENTA]->(Turma)
RETURN Aluno, Endereco, Turma
