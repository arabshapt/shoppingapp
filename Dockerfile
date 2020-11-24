FROM node:14.8.0 as web-build
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build
CMD ["yarn", "start"]