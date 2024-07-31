FROM node:18

WORKDIR /app

COPY ./package.json /app/
COPY ./yarn.lock /app/

RUN yarn install

COPY . /app

RUN yarn run build

RUN yarn global add serve

EXPOSE 80

# Serve
ENTRYPOINT [ "serve" ]
CMD [ "-s", "dist", "-p", "80"]