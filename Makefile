up:
	docker-compose up -d db

clear:
	docker-compose exec db cypher-shell "MATCH (n) DETACH DELETE n"
