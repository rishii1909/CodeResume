'use client';

import { faker } from '@faker-js/faker';
import { useSettings } from '@/components/editor/settings';
import { useChat as useBaseChat } from 'ai/react';

export const useChat = (username = 'defunkt') => {
  const { keys, model } = useSettings();

  return useBaseChat({
    id: 'editor',
    api: 'http://localhost:8000/chat',
    body: {
      // !!! DEMO ONLY: don't use API keys client-side
      // apiKey: keys.openai,
      // model: model.value,
      username,
    },
    fetch: async (input, init) => {
      console.log(input, init);
      const res = await fetch(input, init);

      if (!res.ok) {
        // Mock the API response. Remove it when you implement the route /api/ai/command
        await new Promise((resolve) => setTimeout(resolve, 400));

        const stream = fakeStreamText();

        return new Response(stream, {
          headers: {
            Connection: 'keep-alive',
            'Content-Type': 'text/plain',
          },
        });
      }

      console.log(res.body);

      // Process res.body (ReadableStream) to return a similar structure as fakeStreamText
      const reader = res.body?.getReader();
      const encoder = new TextEncoder();

      if (reader) {
        return new Response(
          new ReadableStream({
            async start(controller) {
              while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                // Ensure value matches the `fakeStreamText` format
                const textChunk = new TextDecoder().decode(value);

                // Simulate the chunk structure of fakeStreamText
                controller.enqueue(encoder.encode(`0:${JSON.stringify(textChunk)}\n`));
              }

              // Append finishReason and usage similar to fakeStreamText
              controller.enqueue(
                encoder.encode(
                  `d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":0}}\n`
                )
              );
              controller.close();
            },
          }),
          {
            headers: {
              Connection: 'keep-alive',
              'Content-Type': 'text/plain',
            },
          }
        );
      }

      return res;
    },
  });
};

// Used for testing. Remove it after implementing useChat api.
const fakeStreamText = ({
  chunkCount = 10,
  streamProtocol = 'data',
}: {
  chunkCount?: number;
  streamProtocol?: 'data' | 'text';
} = {}) => {
  // Create 3 blocks with different lengths
  const blocks = [
    Array.from({ length: chunkCount }, () => ({
      delay: faker.number.int({ max: 100, min: 30 }),
      texts: faker.lorem.words({ max: 3, min: 1 }) + ' ',
    })),
    Array.from({ length: chunkCount + 2 }, () => ({
      delay: faker.number.int({ max: 100, min: 30 }),
      texts: faker.lorem.words({ max: 3, min: 1 }) + ' ',
    })),
    Array.from({ length: chunkCount + 4 }, () => ({
      delay: faker.number.int({ max: 100, min: 30 }),
      texts: faker.lorem.words({ max: 3, min: 1 }) + ' ',
    })),
  ];

  const encoder = new TextEncoder();

  return new ReadableStream({
    async start(controller) {
      for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        // Stream the block content
        for (const chunk of block) {
          await new Promise((resolve) => setTimeout(resolve, chunk.delay));

          if (streamProtocol === 'text') {
            controller.enqueue(encoder.encode(chunk.texts));
          } else {
            controller.enqueue(encoder.encode(`0:${JSON.stringify(chunk.texts)}\n`));
          }
        }

        // Add double newline after each block except the last one
        if (i < blocks.length - 1) {
          if (streamProtocol === 'text') {
            controller.enqueue(encoder.encode('\n\n'));
          } else {
            controller.enqueue(encoder.encode(`0:${JSON.stringify('\n\n')}\n`));
          }
        }
      }

      if (streamProtocol === 'data') {
        controller.enqueue(
          `d:{"finishReason":"stop","usage":{"promptTokens":0,"completionTokens":${blocks.reduce(
            (sum, block) => sum + block.length,
            0
          )}}}\n`
        );
      }

      controller.close();
    },
  });
};
