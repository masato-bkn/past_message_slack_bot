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

const getRandomNumber = (max: number) : number=> {
  return Math.floor(Math.random() * max)
}

getMessageTimestamps().then(
  (messages) => {
    if (messages == undefined) {
      return undefined
    }
    const i = getRandomNumber(messages.length)
    console.log(messages[i])
  }
);
