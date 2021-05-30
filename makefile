run:
	docker-compose -f docker-compose.yml up --build -d
prod:
	docker-compose -f docker-compose.prod.yml up --build -d
stop:
	docker-compose down -v --remove-orphans
log:
	docker-compose logs --tail 1 --follow
