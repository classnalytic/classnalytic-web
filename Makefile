build: 
	docker build -t registry.itforge.io/classnalytic/frontend .
push:
	docker push registry.itforge.io/classnalytic/frontend
