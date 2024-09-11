include .env
export

init:
	npm install
	npm run db:migrate

dev:
	npm run dev

studio:
	npm run db:studio

deploy:
	vercel deploy --yes --prod --public --build-env DATABASE_URL=$(DATABASE_URL) --build-env OPENAI_API_KEY=$(OPENAI_API_KEY)