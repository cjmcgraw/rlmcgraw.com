# syntax=docker/dockerfile:1.3-labs
FROM node:17-alpine as release
RUN apk update && apk add httpie
WORKDIR /build
COPY . .
RUN npm install
RUN npm run build

EXPOSE 3000

HEALTHCHECK \
    --interval=60s \
    --timeout=5s \
    --start-period=5s \
    --retries=3 \
    CMD http --verbose --check-status GET localhost:3000/api/health 

ENTRYPOINT [ "npm", "run", "start" ]

FROM release as local_development
WORKDIR /app
RUN echo -e '\
if [[ -e "/app/node_modules" ]]; then\n\
    echo "noticed you are using a local install for developement!"\n\
    echo "" \n\
    echo "running npm with automatic change pickup. You should see"\n\
    echo "your changes reflected immediately through npm!"\n\
    npm run dev $@\n\
else\
    echo "noticed no local build setup!"\n\
    echo ""\n\
    echo "defaulting to the build from the dockerfile itself!"\n\
    echo ""\n\
    echo "If you want to enable local development changes to be picked"\n\
    echo "up automatically you  need to run npm install on this repo"\n\
    echo ""\n\
    npm --prefix /build run dev $@\n\
fi\' > /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh && cat /docker-entrypoint.sh
ENTRYPOINT ["sh", "/docker-entrypoint.sh"]
