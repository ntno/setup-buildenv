SHELL:=/bin/bash

# ##########################################################################################
# # run docker/serve/build commands from local machine
# ##########################################################################################
docker: 
	docker compose run --rm -ti local_development_server /bin/bash

build-dist: clean
	docker compose run --entrypoint "/bin/bash" local_development_server -c "npm run all"

clean:
	rm -rf dist/

