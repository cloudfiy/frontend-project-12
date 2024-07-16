
install:
	npm install

start:
	npm start

build:
	rmdir /s /q frontend\dist
	npm run build --prefix frontend
