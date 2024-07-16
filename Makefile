
install:
	npm install

start:
	npm start

build:
	rm -rf frontend/dist
	npm run build --prefix frontend
