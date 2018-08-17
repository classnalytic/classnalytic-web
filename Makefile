prod: 
	docker build -t registry.gitlab.com/itforge-eros/via .

push:
	docker push registry.gitlab.com/itforge-eros/via