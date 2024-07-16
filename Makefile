
install:
	npm install

start:
	npm start

build:
	rd /s /q frontend\dist
	npm run build --prefix frontend
