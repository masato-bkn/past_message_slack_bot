import { WebClient } from '@slack/web-api';
import { Message } from '@slack/web-api/dist/response/GroupsRepliesResponse';

const client = new WebClient(process.env.SLACK_TOKEN);

const getMessageTimestamps = async(): Promise<string[] | undefined> => {
  try {
    const result = await client.conversations.history({channel: process.env.CHANNEL || ''});

    if (result.messages == undefined) {
      return undefined
    }

    return result.messages.map((message: Message): string => message.ts || '');
  } catch (error) {
    console.log(error)
  }
}

console.log(getMessageTimestamps().then(
  (messages) => {
    console.log(messages)
  }
));
