const { WebClient } = require('@slack/web-api');
const client = new WebClient(process.env.SLACK_TOKEN);

const getMessageTimestamps = async(): Promise<string[]> => {
  try {
    const result = await client.conversations.history({
      channel: process.env.CHANNEL
    });
    return result.messages.map(message => message.ts);
  } catch (error) {
    console.log(error)
  }
}

console.log(getMessageTimestamps().then(
  (messages) => {
    console.log(messages)
  }
));
