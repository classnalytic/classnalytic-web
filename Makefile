build:
	docker build -t registry.itforge.io/classnalytic/frontend .
push:
	docker push registry.itforge.io/classnalytic/frontend
gbuild:
	docker build -t asia.gcr.io/classnalytic/frontend .
gpush:
	docker push asia.gcr.io/classnalytic/frontend
gcloud: gbuild gpush
prod: build push