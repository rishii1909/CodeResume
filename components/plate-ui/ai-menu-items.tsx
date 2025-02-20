'use client';

import { useEffect, useMemo } from 'react';
import { Descendant, History, NodeApi, PathApi, type SlateEditor } from '@udecode/plate';
import {
  AIChatOptions,
  AIChatPlugin,
  AIChatPluginConfig,
  AIPlugin,
  useLastAssistantMessage,
  withAIChat,
} from '@udecode/plate-ai/react';
import { useIsSelecting } from '@udecode/plate-selection/react';
import { getEditorPlugin, useEditorPlugin, type PlateEditor } from '@udecode/plate/react';
import {
  Album,
  BadgeHelp,
  Check,
  CornerUpLeft,
  FeatherIcon,
  ListEnd,
  ListMinus,
  ListPlus,
  PenLine,
  SmileIcon,
  Wand,
  X,
} from 'lucide-react';
import { getCaretPathFromSelection } from '@/utils/plate.utils';
import { CommandGroup, CommandItem } from './command';

export type EditorChatState =
  | 'cursorCommand'
  | 'cursorSuggestion'
  | 'selectionCommand'
  | 'selectionSuggestion';

export type AIBatch = History['undos'][number] & { ai?: boolean };

export const withAIBatch = (
  editor: SlateEditor,
  fn: () => void,
  {
    split,
  }: {
    split?: boolean;
  } = {}
) => {
  if (split) {
    editor.tf.withNewBatch(fn);
  } else {
    editor.tf.withMerging(fn);
  }

  const lastBatch = editor.history.undos?.at(-1) as AIBatch | undefined;

  if (lastBatch) {
    lastBatch.ai = true;
  }
};

export const aiChatItems = {
  accept: {
    icon: <Check />,
    label: 'Accept',
    value: 'accept',
    onSelect: ({
      editor,
      content,
    }: {
      aiEditor: SlateEditor;
      editor: PlateEditor;
      content?: string;
    }) => {
      // // withAIBatch(editor, () => {;
      // // });
      // tf.addMark('source', true);
      // editor.tf.focus();

      editor.getApi<AIChatPluginConfig>({ key: 'ai' }).aiChat.reset();
      editor.tf.focus();

      return;

      // const currentPoint = getCaretPathFromSelection(editor);
      // // const { tf } = getEditorPlugin(editor, AIPlugin);
      // const nodeEntry = editor.api.node({ at: currentPoint.path });

      // console.log(nodeEntry?.[0]);

      // if (nodeEntry?.[0].type === 'source') {
      //   const caretPath = getCaretPathFromSelection(editor);
      //   const insertPosition = {
      //     path: [caretPath.path[0], caretPath.path[1]],
      //     offset: caretPath.offset + 1,
      //   };

      //   const { id, timestamp, content, actor, sources } = nodeEntry[0];

      //   editor.transforms.insertNode(
      //     {
      //       children: [{ text: content }],
      //       type: 'source',
      //       id,
      //       timestamp,
      //       content,
      //       actor,
      //       sources,
      //     } as any,
      //     { at: insertPosition }
      //   );
      // }
      // console.log(editor.setOption({ key: 'aiChat' }, 'open', false));
    },
  },
  continueWrite: {
    icon: <PenLine />,
    label: 'Continue writing',
    value: 'continueWrite',
    onSelect: ({ editor }) => {
      const ancestorNode = editor.api.block({ highest: true });

      if (!ancestorNode) return;
      const currentPath = editor.selection?.anchor.path; // Get current node's path
      const nodes = [];

      for (const [node] of editor.api.nodes({ at: currentPath })) {
        nodes.push(node); // Collect each node until the current one
      }

      const isEmpty = NodeApi.string(ancestorNode[0]).trim().length === 0;

      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: 'insert',
        prompt: isEmpty
          ? `<Document>
{editor}
</Document>
Start writing a new paragraph AFTER <Document> ONLY ONE SENTENCE`
          : 'Continue writing AFTER <Block> ONLY ONE SENTENCE. DONT REPEAT THE TEXT.',
      });
    },
  },
  discard: {
    icon: <X />,
    label: 'Discard',
    shortcut: 'Escape',
    value: 'discard',
    onSelect: ({ editor }) => {
      // editor.getTransforms(AIPlugin).ai.undo();
      editor.getApi(AIChatPlugin).aiChat.hide();
    },
  },
  emojify: {
    icon: <SmileIcon />,
    label: 'Emojify',
    value: 'emojify',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Emojify',
      });
    },
  },
  explain: {
    icon: <BadgeHelp />,
    label: 'Explain',
    value: 'explain',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: {
          default: 'Explain {editor}',
          selecting: 'Explain',
        },
      });
    },
  },
  fixSpelling: {
    icon: <Check />,
    label: 'Fix spelling & grammar',
    value: 'fixSpelling',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Fix spelling and grammar',
      });
    },
  },
  improveWriting: {
    icon: <Wand />,
    label: 'Improve writing',
    value: 'improveWriting',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Improve the writing',
      });
    },
  },
  insertBelow: {
    icon: <ListEnd />,
    label: 'Insert below',
    value: 'insertBelow',
    onSelect: ({ aiEditor, editor }) => {
      void editor.getTransforms(AIChatPlugin).aiChat.insertBelow(aiEditor);
    },
  },
  makeLonger: {
    icon: <ListPlus />,
    label: 'Make longer',
    value: 'makeLonger',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Make longer',
      });
    },
  },
  makeShorter: {
    icon: <ListMinus />,
    label: 'Make shorter',
    value: 'makeShorter',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Make shorter',
      });
    },
  },
  replace: {
    icon: <Check />,
    label: 'Replace selection',
    value: 'replace',
    onSelect: ({ aiEditor, editor }) => {
      void editor.getTransforms(AIChatPlugin).aiChat.replaceSelection(aiEditor);
    },
  },
  simplifyLanguage: {
    icon: <FeatherIcon />,
    label: 'Simplify language',
    value: 'simplifyLanguage',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        prompt: 'Simplify the language',
      });
    },
  },
  summarize: {
    icon: <Album />,
    label: 'Add a summary',
    value: 'summarize',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.submit({
        mode: 'insert',
        prompt: {
          default: 'Summarize {editor}',
          selecting: 'Summarize',
        },
      });
    },
  },
  tryAgain: {
    icon: <CornerUpLeft />,
    label: 'Try again',
    value: 'tryAgain',
    onSelect: ({ editor }) => {
      void editor.getApi(AIChatPlugin).aiChat.reload();
    },
  },
} satisfies Record<
  string,
  {
    icon: React.ReactNode;
    label: string;
    value: string;
    component?: React.ComponentType<{ menuState: EditorChatState }>;
    filterItems?: boolean;
    items?: { label: string; value: string }[];
    shortcut?: string;
    onSelect?: ({ aiEditor, editor }: { aiEditor: SlateEditor; editor: PlateEditor }) => void;
  }
>;

const menuStateItems: Record<
  EditorChatState,
  {
    items: (typeof aiChatItems)[keyof typeof aiChatItems][];
    heading?: string;
  }[]
> = {
  cursorCommand: [
    {
      items: [aiChatItems.continueWrite, aiChatItems.summarize, aiChatItems.explain],
    },
  ],
  cursorSuggestion: [
    {
      items: [aiChatItems.accept, aiChatItems.discard, aiChatItems.tryAgain],
    },
  ],
  selectionCommand: [
    {
      items: [
        aiChatItems.improveWriting,
        aiChatItems.emojify,
        aiChatItems.makeLonger,
        aiChatItems.makeShorter,
        aiChatItems.fixSpelling,
        aiChatItems.simplifyLanguage,
      ],
    },
  ],
  selectionSuggestion: [
    {
      items: [
        aiChatItems.replace,
        aiChatItems.insertBelow,
        aiChatItems.discard,
        aiChatItems.tryAgain,
      ],
    },
  ],
};

export const AIMenuItems = ({ setValue }: { setValue: (value: string) => void }) => {
  const { editor, useOption } = useEditorPlugin(AIChatPlugin);
  const { messages } = useOption('chat');
  const content = useLastAssistantMessage()?.content;
  const aiEditor = useOption('aiEditor')!;
  const isSelecting = useIsSelecting();

  const menuState = useMemo(() => {
    if (messages && messages.length > 0) {
      return isSelecting ? 'selectionSuggestion' : 'cursorSuggestion';
    }

    return isSelecting ? 'selectionCommand' : 'cursorCommand';
  }, [isSelecting, messages]);

  console.log(isSelecting);

  const menuGroups = useMemo(() => {
    const items = menuStateItems[menuState];

    return items;
  }, [menuState]);

  useEffect(() => {
    if (menuGroups.length > 0 && menuGroups[0].items.length > 0) {
      setValue(menuGroups[0].items[0].value);
    }
  }, [menuGroups, setValue]);

  return (
    <>
      {menuGroups.map((group, index) => (
        <CommandGroup key={index} heading={group.heading}>
          {group.items.map((menuItem) => (
            <CommandItem
              key={menuItem.value}
              className="[&_svg]:text-muted-foreground"
              value={menuItem.value}
              onSelect={() => {
                menuItem.onSelect?.({
                  aiEditor,
                  editor: editor,
                  content,
                });
              }}
            >
              {menuItem.icon}
              <span>{menuItem.label}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      ))}
    </>
  );
};
