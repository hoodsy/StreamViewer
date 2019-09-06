const { prisma } = require('./generated/prisma-client');
const { GraphQLServer } = require('graphql-yoga');

// const { messages } = require('./services/youtube');

const resolvers = {
  Query: {
    user(root, args, context) {
      return context.prisma.user({ email: args.email });
    },
    message(root, args, context) {
      return context.prisma.message({ id: args.messageId });
    },
    messagesByUser(root, args, context) {
      return context.prisma
        .user({
          id: args.userId
        })
        .messages();
    }
  },
  Mutation: {
    createUser(root, args, context) {
      return context.prisma.createUser({ channelId: args.channelId });
    },
    async createMessage(root, args, context) {
      const userExists = await context.prisma.$exists.user({
        channelId: args.channelId
      });

      if (!userExists) {
        await context.prisma.createUser({
          channelId: args.channelId
        });
      }

      return context.prisma.createMessage({
        sender: {
          connect: { channelId: args.channelId }
        },
        liveChatId: args.liveChatId,
        text: args.text
      });
    }
  },
  User: {
    messages(root, args, context) {
      return context.prisma
        .user({
          id: root.id
        })
        .messages();
    }
  },
  Message: {
    sender(root, args, context) {
      return context.prisma
        .message({
          id: root.id
        })
        .sender();
    }
  }
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: {
    prisma
  }
});
server.start(() => console.log('Server is running on http://localhost:4000'));
