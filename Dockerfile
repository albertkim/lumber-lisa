FROM node:20-alpine AS base

# Set working directory
WORKDIR /usr/src/app

# Set environment variables to make pnpm non-interactive
ENV CI=true
ENV NODE_ENV=production

COPY ./ ./

RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
RUN pnpm build

ENV PORT=3000
EXPOSE $PORT

# Start the server
CMD ["pnpm", "start"]
