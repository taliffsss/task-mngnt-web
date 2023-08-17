# Set up base node image
FROM node:lts-alpine3.18 as build

# Set up the Docker Working Directory
ENV HOME=/usr/src/app
RUN mkdir -p $HOME
WORKDIR $HOME

ENV PATH /usr/src/app/node_modules/.bin:$PATH

# Install required dependencies
RUN apk update && \
    apk upgrade && \
    apk add --no-cache python3

# Pulls in the package.json file and installs all the node dependencies
# Utilize Docker cache to save re-installing dependencies if unchanged
COPY package.json $HOME
RUN npm install -g npm
RUN npm install

# Copies the host machine folder(s) into the docker container so you can develop on your host machine
COPY . $HOME

# Create production build
RUN npm run build

# Production environment
FROM nginx:stable
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
