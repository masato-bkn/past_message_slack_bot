import { WebClient } from '@slack/web-api';
import { Message } from '@slack/web-api/dist/response/GroupsRepliesResponse';

const client = new WebClient(process.env.SLACK_TOKEN);

const getMessageTimestamps = async(): Promise<string[]> => {
  try {
    const result = await client.conversations.history({channel: process.env.CHANNEL || ''});

    if (result.messages == undefined) {
      return []
    }

    return result.messages.map((message: Message): string => message.ts || '');
  } catch (error) {
    return error
  }
}

const getRandomNumber = (max: number) : number=> {
  return Math.floor(Math.random() * max)
}

(async() => {
  const timeStamps = await getMessageTimestamps();
  const i = getRandomNumber(timeStamps.length)
  console.log(timeStamps[i])
}) 
