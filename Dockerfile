# # Stage 1: Build stage
# FROM node:20-alpine as build-stage

# # Set the maintainer
# LABEL maintainer="Uranus 'uranus.ura'"

# # Set the working directory
# WORKDIR /app

# # Set npm config and install pnpm globally
# RUN npm config set strict-ssl false && \
#     npm install -g pnpm@9.0.5

# # Copy package.json, pnpm-lock.yaml, and pnpm-workspace.yaml first to leverage Docker cache
# COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./

# # Copy the workspace packages' package.json files
# COPY internal/eslint-config/package.json internal/eslint-config ./
# COPY internal/stylelint-config/package.json internal/stylelint-config ./
# COPY internal/ts-config/package.json internal/ts-config ./
# COPY internal/vite-config/package.json internal/vite-config ./

# # Copy the ts-config configuration files
# COPY internal/ts-config/vue-app.json internal/ts-config/base.json internal/ts-config/node.json internal/ts-config/node-server.json internal/ts-config/ ./

# # Install dependencies
# RUN pnpm install --frozen-lockfile

# # Copy the rest of the project files
# COPY . .

# # Set environment variable for Node.js memory limit
# ENV NODE_OPTIONS=--max-old-space-size=16384

# # Build the project
# RUN pnpm build:docker

# # Stage 2: Production stage
# FROM nginx:1.23.3-alpine as production-stage

# # Copy build output from the build stage
# COPY --from=build-stage /app/dist /usr/share/nginx/html/dist

# # Expose port 80
# EXPOSE 80

# # Start Nginx with environment variable replacement
# CMD sed -i "s|__vg_base_url|$VG_BASE_URL|g" /usr/share/nginx/html/dist/assets/entry/index-*.js && \
#     sed -i "s|__vg_base_url|$VG_BASE_URL|g" /usr/share/nginx/html/dist/_app.config.js && \
#     nginx -g 'daemon off;'
# node
FROM node:20-alpine as build-stage

# signature
MAINTAINER Uranus 'uranus.ura'

WORKDIR /app

COPY . ./

#Set up node  image
RUN npm config set strict-ssl false

#set up--max-old-space-size
ENV NODE_OPTIONS=--max-old-space-size=16384

# Install pnpm globally
RUN rm -rf node_modules
RUN npm cache clean --force # Clean npm cache
RUN npm install -g pnpm@9.0.5

# Set environment variable for Node.js memory limit
ENV NODE_OPTIONS=--max-old-space-size=16384

# Install dependencies and build the project
RUN pnpm install --no-frozen-lockfile \
    && pnpm build:docker \
    && pnpm store prune # Clean pnpm cache

# nginx deploy
FROM nginx:1.23.3-alpine as production-stage

# Copy build output and Nginx configuration from build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/dist
COPY --from=build-stage /app/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx with environment variable replacement
CMD sed -i "s|__vg_base_url|$VG_BASE_URL|g" /usr/share/nginx/html/dist/assets/entry/index-*.js && \
    sed -i "s|__vg_base_url|$VG_BASE_URL|g" /usr/share/nginx/html/dist/_app.config.js && \
    nginx -g 'daemon off;'
